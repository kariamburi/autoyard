import { useCallback, Dispatch, SetStateAction, useState } from "react";
//import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { RocketIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UTApi } from "uploadthing/server";
import { deleteSingleImage } from "@/lib/actions/ad.actions";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type FileUploaderProps = {
  onFieldChange: (urls: string[]) => void;
  imageUrls: string[];
  userName: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const applyWatermark = (
  file: File,
  headerText: string,
  contentText: string
): Promise<File> => {
  if (typeof window === "undefined") {
    return Promise.resolve(file);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        img.src = result;
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // Calculate font sizes based on the smaller dimension of the image
      const headerFontSize = Math.min(canvas.width, canvas.height) * 0.08; // Adjust multiplier as needed
      const contentFontSize = Math.min(canvas.width, canvas.height) * 0.05; // Adjust multiplier as needed

      // Set header font
      ctx.font = `bold ${headerFontSize}px Arial`; // Make header text bold
      ctx.textAlign = "center";

      // Calculate position for header text
      const gap = headerFontSize * 0.5; // Adjust multiplier as needed for the gap
      const headerCenterX = canvas.width / 2;
      //const headerCenterY = canvas.height / 2 - headerFontSize + 270; // Position header slightly above center
      const headerCenterY = canvas.height / 2 - gap / 2 + 280; // Position header slightly above center with gap

      // Draw header text border (stroke)
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"; // White color with 0.8 opacity
      ctx.strokeText(headerText, headerCenterX, headerCenterY);

      // Fill header text color
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Black color with full opacity
      ctx.fillText(headerText, headerCenterX, headerCenterY);

      // Set content font
      ctx.font = `bold ${contentFontSize}px Arial`; // Make content text bold

      // Calculate position for content text
      const contentCenterX = canvas.width / 2;
      // const contentCenterY = canvas.height / 2 + contentFontSize; // Position content slightly below center
      const contentCenterY = headerCenterY + gap / 4 + contentFontSize; // Position content below header with gap

      // Draw content text border (stroke)
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"; // White color with 0.8 opacity
      ctx.strokeText(contentText, contentCenterX, contentCenterY);

      // Fill content text color
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Black color with full opacity
      ctx.fillText(contentText, contentCenterX, contentCenterY);

      canvas.toBlob((blob) => {
        if (blob) {
          const watermarkedFile = new File([blob], file.name, {
            type: file.type,
          });
          resolve(watermarkedFile);
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, file.type);
    };

    img.onerror = (error) => reject(error);
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};

export function FileUploader({
  imageUrls,
  userName,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        // Check if the file already exists in the list of imageUrls
        if (imageUrls.includes(convertFileToUrl(file))) {
          setmessage(`${file.name} has already been uploaded.`);
          setShowAlert(true); // Show the custom alert
          return false; // Exclude the file from the list
        }
        if (file.size > 5 * 1024 * 1024) {
          setmessage(
            `${file.name} exceeds the 5MB limit and will not be uploaded.`
          );
          setShowAlert(true); // Show the custom alert
          return false; // Exclude the file from the list
        }
        return true; // Include the file in the list
      });
      const watermarkedFiles: File[] = await Promise.all(
        filteredFiles.map((file) =>
          applyWatermark(file, userName.toUpperCase(), "POSTED ON OFFERUP")
        )
      );

      setFiles((prevFiles: File[]) => [...prevFiles, ...watermarkedFiles]);
      const urls = watermarkedFiles.map((file: File) => convertFileToUrl(file));
      onFieldChange([...imageUrls, ...urls]);
    },
    [imageUrls, setFiles, onFieldChange]
  );

  const [showAlert, setShowAlert] = useState(false);
  const [showmessage, setmessage] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });
  const handleRemoveImage = async (index: number) => {
    const url = new URL(imageUrls[index]);
    const deleteImage = url.pathname.split("/").pop();
    if (deleteImage) {
      await deleteSingleImage({
        deleteImage,
        path: "/profile",
      });
    }
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    onFieldChange(newImageUrls);
  };

  return (
    <div className="flex-center bg-dark-3 flex cursor-pointer p-3 flex-col overflow-hidden rounded-xl bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />
      {/* Image */}
      <div className="text-left text-sm w-full mx-auto">
        <div className="font-semibold">Add Photo</div>
        <div>
          <small className="text-[#464b4f]">
            Add at least 2 photos for this category
          </small>
          <br />
          <small className="text-[#464b4f]">
            First picture - is the title picture.
          </small>
        </div>

        {imageUrls.length > 0 ? (
          <div className="flex w-full m-1">
            <div {...getRootProps()}>
              <AddBoxIcon className="my-auto hover:cursor-pointer" />
            </div>
            <ScrollArea className="w-[400px] sm:w-[400px] md:w-[500px] lg:w-full bg-white rounded-md border">
              <div className="flex w-full p-4">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative rounded-sm shadow-sm p-1 bg-white w-20 h-20 lg:w-40 lg:h-40 flex-shrink-0"
                  >
                    <img
                      src={url}
                      alt={`image-${index}`}
                      className="w-full h-full object-cover object-center rounded-sm"
                    />
                    <div
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 rounded-xl bg-white p-1 shadow-sm"
                    >
                      <img
                        src="/assets/icons/delete.svg"
                        alt="edit"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        ) : (
          <div
            className="flex-center flex-col py-5 text-grey-500"
            {...getRootProps()}
          >
            <img
              src="/assets/icons/upload.svg"
              width={77}
              height={77}
              alt="file upload"
            />
            <h3 className="mb-2 mt-2">Drag photos here</h3>
            <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
            <Button type="button" className="rounded-full">
              Select from computer
            </Button>
          </div>
        )}

        <br />
        <small className="text-[#464b4f]">
          Supported formats are .jpg, .gif .svg and .png, 5MB max
        </small>
      </div>

      {showAlert && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{showmessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
