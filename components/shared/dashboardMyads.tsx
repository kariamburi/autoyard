"use client";
import { IAd } from "@/lib/database/models/ad.model";
import Link from "next/link";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import { IUser } from "@/lib/database/models/user.model";
const CollectionMyads = dynamic(() => import("./CollectionMyads"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          // height={250}
          className="rounded-sm w-[200px] md:w-[200px] lg:w-[250px]"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          //  height={250}
          className="rounded-sm w-[200px] md:w-[200px] lg:w-[250px]"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          // height={250}
          className="rounded-sm w-[200px] md:w-[200px] lg:w-[250px]"
        />
      </div>
    </div>
  ),
});

const SellerProfile = dynamic(() => import("./SellerProfile"), {
  ssr: false,
  loading: () => (
    <div className="m-1 space-y-0 lg:flex lg:space-x-5">
      <div className="flex flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="rounded-sm w-full md:w-[300px] lg:w-[300px]"
        />
      </div>
    </div>
  ),
});
type CollectionProps = {
  userId: string;
  loggedId: string;
  daysRemaining?: number;
  packname?: string;
  color: string;
  data: IAd[];
  user: IUser;
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  isAdCreator: boolean;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const DashboardMyads = ({
  userId,
  data,
  packname,
  daysRemaining,
  color,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  isAdCreator,
  user,
  loggedId,
}: // Accept the onSortChange prop
CollectionProps) => {
  const [activeButton, setActiveButton] = useState(0);
  const [isVertical, setisVertical] = useState(true);
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
    if (index === 0) {
      setisVertical(true);
    } else {
      setisVertical(false);
    }
  };

  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  const handleSortChange = (selectedOption: string) => {
    // Do something with the selected sorting option
    console.log("Selected sorting option:", selectedOption);
    setQuery(selectedOption);
    // Example: If "lowest" option is selected, perform some action
    if (selectedOption === "lowest") {
      // Perform your action here
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto flex mt-3 p-1">
        <div className="hidden lg:inline mr-5">
          <div className="bg-white w-full rounded-lg p-1">
            <div className="flex justify-center items-center w-full h-full">
              <SellerProfile user={user} loggedId={loggedId} userId={userId} />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white border rounded-lg lg:hidden">
            <SellerProfile user={user} loggedId={loggedId} userId={userId} />
          </div>
          <div className="rounded-lg border bg-white max-w-6xl mx-auto lg:flex-row mt-3 p-1 justify-center">
            <section className="bg-grey-50 bg-dotted-pattern bg-cover bg-center py-0 md:py-0 rounded-sm">
              <div className="flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left p-1">
                  Ads List
                </h3>

                {isAdCreator &&
                  packname !== "Free" &&
                  daysRemaining &&
                  daysRemaining > 0 && (
                    <>
                      <div
                        style={{
                          backgroundColor: color,
                        }}
                        className="text-center sm:text-left rounded-lg p-3 text-white relative"
                      >
                        <div className="flex flex-col">
                          <div className="font-bold text-sm mt-4">
                            Plan: {packname}
                          </div>
                          <div className="text-xs">
                            Days remaining: {daysRemaining}
                          </div>
                        </div>
                        {/* Green ribbon */}
                        <div className="absolute top-0 shadow-lg left-0 bg-green-500 text-white text-xs py-1 px-3 rounded-bl-lg rounded-tr-lg">
                          Active
                        </div>
                        <Link href="/plan">
                          <div className="p-1 items-center flex flex-block text-black underline text-xs cursor-pointer border-2 border-transparent rounded-full hover:bg-[#000000]  hover:text-white">
                            <div>Upgrade Plan</div>
                          </div>
                        </Link>
                      </div>
                    </>
                  )}
              </div>
            </section>

            <section className=" my-2">
              <div className="flex w-full justify-between">
                <div className="flex flex-wrap justify-center md:justify-start items-center mb-4 md:mb-0">
                  <div
                    className={`cursor-pointer ${
                      activeButton === 0 ? "text-[#30AF5B]" : "text-gray-400"
                    }`}
                    onClick={() => handleButtonClick(0)}
                  >
                    <ViewModuleIcon />
                  </div>
                  <div
                    className={`cursor-pointer ${
                      activeButton === 1 ? "text-[#30AF5B]" : "text-gray-400"
                    }`}
                    onClick={() => handleButtonClick(1)}
                  >
                    <ViewListIcon />
                  </div>
                </div>
                <div className="rounded-lg p-1 flex items-center">
                  <div className="text-[#30AF5B]">
                    <SwapVertIcon />
                  </div>
                  <Select onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="recommeded">
                          Recommended first
                        </SelectItem>
                        <SelectItem value="new">Newest first</SelectItem>
                        <SelectItem value="lowest">
                          Lowest price first
                        </SelectItem>
                        <SelectItem value="highest">
                          Highest price first
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CollectionMyads
                data={data}
                emptyTitle="No ads have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Ads_Organized"
                limit={3}
                page={page}
                urlParamName="adsPage"
                totalPages={totalPages}
                userId={userId}
                isAdCreator={isAdCreator}
                isVertical={isVertical}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMyads;
