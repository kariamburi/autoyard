"use client";
import { IAd } from "@/lib/database/models/ad.model";
import { CreateUserParams } from "@/types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import CollectionBookmark from "./CollectionBookmark";
import BookmarkIcon from "@mui/icons-material/Bookmark";

type CollectionProps = {
  userId: string;
  data: IAd[];
  user: CreateUserParams;
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const DashboardBookmark = ({
  userId,
  data,
  user,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
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
  }, [query]);

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
        <div className="flex-1">
          <div className="max-w-6xl mx-auto lg:flex-row mt-3 p-1 justify-center">
            <section className="bg-grey-50 bg-dotted-pattern bg-cover bg-center py-0 md:py-0 rounded-sm">
              <div className="wrapper flex gap-1 items-center justify-center">
                <BookmarkIcon />
                <h3 className="font-bold text-[25px] sm:text-left">Bookmark</h3>
              </div>
            </section>
            <section className=" my-2">
              <CollectionBookmark
                data={data}
                emptyTitle="No Saved Ad"
                emptyStateSubtext="Go and bookmark your favorite ads"
                collectionType="Ads_Organized"
                limit={3}
                page={page}
                urlParamName="adsPage"
                totalPages={totalPages}
                userId={userId}
                isAdCreator={false}
                isVertical={isVertical}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBookmark;
