"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuerymultiple, removeKeysFromQuery } from "@/lib/utils";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";

type Subcategory = {
  title: string;
};

type Category = {
  imageUrl: string;
  name: string;
  _id: string;
  subcategory: Subcategory[];
};

type MobileProps = {
  categoryList: Category[];
};

export default function MenuSubmobile({ categoryList }: MobileProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = (subcategory: string) => {
    let newUrl = "";
    if (subcategory) {
      newUrl = formUrlQuerymultiple({
        params: "",
        updates: {
          category: "Vehicle",
          subcategory: subcategory.toString(),
        },
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["subcategory"],
      });
    }

    router.push("/category/" + newUrl, { scroll: false });
  };

  const vehicleCategory = categoryList.find(
    (category) => category.name === "Vehicle"
  );

  return (
    <div className="mx-auto mt-10">
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 m-1 gap-1">
        <SignedIn>
          <div
            style={{ animation: "fadeIn 0.5s ease-out forwards", opacity: 0 }}
            className="hidden lg:inline h-[100px] bg-emerald-500 shadow-xl text-white flex flex-col items-center justify-center cursor-pointer rounded-xl p-1 border-0 border-emerald-300 hover:bg-emerald-600 transform hover:scale-105"
            onClick={() => router.push("/ads/create")}
          >
            <div className="flex flex-col items-center text-center justify-center">
              <div className="h-12 w-12 rounded-full p-2">
                <AddCircleOutlineOutlinedIcon />
              </div>
              <h2 className="text-lg font-bold">SELL</h2>
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div
            style={{ animation: "fadeIn 0.5s ease-out forwards", opacity: 0 }}
            className="hidden lg:inline h-[100px] shadow-xl bg-emerald-500 text-white flex flex-col items-center justify-center cursor-pointer rounded-xl p-1 border-0 border-emerald-300 hover:bg-emerald-600 transform hover:scale-105"
            onClick={() => router.push("/sign-in")}
          >
            <div className="flex flex-col items-center text-center justify-center">
              <div className="h-12 w-12 rounded-full p-2">
                <AddCircleOutlineOutlinedIcon />
              </div>
              <h2 className="text-lg font-bold">SELL</h2>
            </div>
          </div>
        </SignedOut>

        {vehicleCategory?.subcategory.map((sub, index) => (
          <div
            key={sub.title}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
              opacity: 0,
            }}
            onClick={() => handleCategory(sub.title)}
            className="h-[100px] bg-white flex flex-col items-center justify-center cursor-pointer rounded-xl p-1 border-0 border-emerald-300 hover:bg-emerald-100 transform hover:scale-105"
          >
            <div className="flex flex-col items-center text-center justify-center">
              <div className="rounded-full bg-white p-2">
                <Image
                  className="w-full h-full object-cover"
                  src={"/" + sub.title + ".png"}
                  alt={sub.title}
                  width={60}
                  height={60}
                />
              </div>
              <h2 className="text-xs">{sub.title}</h2>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
