import { IAd } from "@/lib/database/models/ad.model";
import React from "react";
import Pagination from "./Pagination";
import VerticalCard from "./VerticalCard";
import HorizontalCard from "./HorizontalCard";

type CollectionProps = {
  userId: string;
  data: IAd[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  isAdCreator: boolean;
  isVertical: boolean;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const CollectionMyads = ({
  data,
  userId,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  isAdCreator,
  isVertical,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        isVertical ? (
          <div className="flex flex-col bg-grey-50 rounded-lg items-center gap-10 p-2">
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-3">
              {data.map((ad) => {
                return (
                  <li key={ad._id} className="flex justify-center">
                    <VerticalCard
                      ad={ad}
                      userId={userId}
                      isAdCreator={isAdCreator}
                    />
                  </li>
                );
              })}
            </ul>

            {totalPages > 1 && (
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            )}
          </div>
        ) : (
          <div className="flex p-1 bg-grey-50 rounded-lg">
            <ul className="w-full">
              {data.map((ad) => {
                return (
                  <li key={ad._id} className="flex justify-center">
                    <HorizontalCard
                      ad={ad}
                      userId={userId}
                      isAdCreator={isAdCreator}
                    />
                  </li>
                );
              })}
            </ul>

            {totalPages > 1 && (
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            )}
          </div>
        )
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default CollectionMyads;
