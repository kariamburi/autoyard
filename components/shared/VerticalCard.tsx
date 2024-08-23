import { IAd } from "@/lib/database/models/ad.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { NGnaira } from "@/lib/help";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { createBookmark } from "@/lib/actions/bookmark.actions";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
type CardProps = {
  userId: string;
  ad: IAd;
  isAdCreator?: boolean;
};

const VerticalCard = ({ userId, ad, isAdCreator }: CardProps) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  const handle = async (id: string) => {
    const newBookmark = await createBookmark({
      bookmark: {
        userBId: userId,
        adId: id,
      },
      path: pathname,
    });
    if (newBookmark) {
      toast({
        title: "Alert",
        description: newBookmark,
        duration: 5000,
        className: "bg-[#30AF5B] text-white",
      });
    }
  };
  // console.log(ad.imageUrls);
  return (
    <div className="group relative flex min-h-[300px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[300px]">
      <Link
        href={`/ads/${ad._id}`}
        style={{ backgroundImage: `url(${ad.imageUrls[0]})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS Ad CREATOR ... */}
      <div className="ml-1 mt-40 gap-1 absolute bg-gray-800 bg-opacity-70 text-xs text-white right-50 top-100 flex rounded-lg p-1 shadow-sm transition-all">
        <PhotoCameraFrontIcon sx={{ fontSize: 16 }} />
        {ad.imageUrls.length}
      </div>
      {ad.youtube && (
        <div className="ml-1 mt-40 gap-1 mr-1 cursor-pointer absolute bg-[#000000] bg-opacity-70 text-xs text-white right-0 top-100 flex rounded-lg p-1 shadow-sm transition-all">
          <YouTubeIcon
            sx={{ fontSize: 16, cursor: "pointer" }}
            style={{ color: "red" }}
          />{" "}
          Video
        </div>
      )}
      {ad.plan.name !== "Free" && (
        <div
          style={{
            backgroundColor: ad.plan.color,
          }}
          className="absolute shadow-lg top-0 left-0 text-white text-xs py-1 px-3 rounded-br-lg rounded-tl-lg"
        >
          <Link href={`/plan`}>
            <div className="flex gap-1 cursor-pointer">{ad.plan.name}</div>
          </Link>
        </div>
      )}
      {ad.organizer.verified &&
        ad.organizer?.verified[0]?.accountverified === true && (
          <div className="absolute bg-emerald-100 top-0 right-0 text-xs py-1 px-3 rounded-bl-lg rounded-tr-lg">
            <div className="flex gap-1 cursor-pointer">
              {" "}
              <VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} />
              Verified
            </div>
          </div>
        )}
      {isAdCreator && (
        <div className="absolute right-2 top-10 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/ads/${ad._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation adId={ad._id} imageUrls={ad.imageUrls} />
        </div>
      )}
      {!isAdCreator && (
        <div
          className="absolute right-2 bottom-20  w-8 h-8 p-1 shadow-lg flex items-center justify-center rounded-full bg-white text-emerald-500 tooltip tooltip-bottom hover:text-[#2BBF4E] hover:cursor-pointer"
          data-tip="Bookmark"
          onClick={() => handle(ad._id)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <BookmarkIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p> Save Ad</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      <div className="flex min-h-[80px] items-center flex-col">
        {isAdCreator ? (
          <div className="flex justify-between items-center w-full p-1">
            <Link href={`/ads/${ad._id}`} className="no-underline">
              <span className="text-emerald-950 p-bold-16 w-min rounded-full px-4 p-1 text-green-60">
                {NGnaira.format(ad.price)}
              </span>
            </Link>
            {ad.adstatus && (
              <div
                className={`flex flex-col text-xs p-1 text-white justify-center items-center w-[70px] rounded-full ${
                  ad.adstatus === "Pending"
                    ? "bg-yellow-600"
                    : ad.adstatus === "Failed"
                    ? "bg-red-600 "
                    : "bg-green-600"
                }`}
              >
                {ad.adstatus}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center p-1">
            <Link href={`/ads/${ad._id}`} className="no-underline">
              <span className="text-emerald-950 p-bold-16 w-min rounded-full px-4 p-1 text-green-60">
                {NGnaira.format(ad.price)}
              </span>
            </Link>
          </div>
        )}
        <Link href={`/ads/${ad._id}`} className="no-underline text-sm">
          {truncateTitle(ad.title, 30)}
          {/* Change 20 to your desired character limit */}
        </Link>
        {ad.calcDistance && (
          <div className="text-xs text-emerald-500">
            {Math.round(ad.calcDistance / 100) / 10} KM Away
          </div>
        )}
        <div className="text-gray-500 text-xs">
          <LocationOnIcon sx={{ fontSize: 16 }} />
          {ad.address}
        </div>
        <div className="flex justify-between w-full gap-1 p-1">
          {ad.vehiclecondition && (
            <div className="flex gap-2 text-xs bg-[#ebf2f7] rounded-sm p-1 justify-center border">
              {ad.vehiclecondition}
            </div>
          )}
          {ad.vehicleTransmissions && (
            <div className="flex gap-2 text-xs bg-[#ebf2f7] rounded-sm p-1 justify-center border">
              {ad.vehicleTransmissions}
            </div>
          )}
          {ad.vehicleEngineSizesCC && (
            <div className="flex gap-2 text-xs bg-[#ebf2f7] rounded-sm p-1 justify-center border">
              {ad.vehicleEngineSizesCC}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;