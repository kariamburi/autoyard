"use client";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import MenuList from "./menu-list";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
type MobileProps = {
  categoryList: { imageUrl: string; name: string; _id: string }[];
};
export default function Menumobile({ categoryList }: MobileProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleCategory = (category: string) => {
    let newUrl = "";
    if (category) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push("/category/" + newUrl, { scroll: false });
  };
  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 m-1 gap-1">
        {categoryList.length > 0 &&
          categoryList.map(
            (category: { imageUrl: string; name: string; _id: string }) => (
              <div
                onClick={() => handleCategory(category.name)}
                className="h-[100px] bg-white flex flex-col items-center justify-center cursor-pointer rounded-sm p-1 border-0 border-emerald-300 hover:bg-emerald-100 "
              >
                <div className="flex flex-col items-center text-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white p-2">
                    <img
                      className="w-full h-full"
                      src={category.imageUrl}
                      alt="Menu Image"
                    />
                  </div>

                  <h2 className="text-xs">{category.name}</h2>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}
