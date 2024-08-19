"use client";

import { useEffect, useState } from "react";
import MenuList from "./menu-list";
import { BusesMake, commonVehicleMakesInKenya } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
type CardProps = {
  category: string;
  subcategory: string;
};

export default function MenumakeBus({ category, subcategory }: CardProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "BusesMake",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["BusesMake"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="mt-2">
      <div className="grid grid-cols-5 lg:grid-cols-8 m-0 gap-1">
        {BusesMake.length > 0 &&
          BusesMake.slice(0, 8).map((vehicle: any) => (
            <div
              key={vehicle.make} // Always good to have a unique key prop
              className="flex h-[80px] bg-white shadow flex-col items-center justify-center cursor-pointer rounded-sm p-1 border-1 border-emerald-300 hover:bg-emerald-100"
            >
              <div
                className="flex flex-col text-center items-center"
                onClick={(e) => setQuery(vehicle.make)}
              >
                <div className="h-12 w-12 rounded-full bg-white p-2">
                  <img
                    className="w-full h-full"
                    src={vehicle.iconPath}
                    alt="Menu Image"
                  />
                </div>

                <h2 className="text-xs">{vehicle.make}</h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
