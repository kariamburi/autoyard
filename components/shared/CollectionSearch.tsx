import { IAd } from "@/lib/database/models/ad.model";
import React from "react";
import Pagination from "./Pagination";
import VerticalCard from "./VerticalCard";
import HorizontalCard from "./HorizontalCard";
import Skeleton from "@mui/material/Skeleton";
import StreetmapAll from "./StreetmapAll";
import Image from "next/image";
type CollectionProps = {
  userId: string;
  data: IAd[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  activeButton: number;
  loading: boolean;
};

const CollectionSearch = ({
  data,
  userId,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  loading,
  urlParamName,
  activeButton,
}: CollectionProps) => {
  if (loading) {
    return (
      <div>
        <div className="w-full mt-10 h-full flex flex-col items-center justify-center">
          <Image
            src="/assets/icons/loading2.gif"
            alt="loading"
            width={40}
            height={40}
            unoptimized
          />
        </div>

        {/*  <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-wrap mt-10 gap-1 justify-center">
          <Skeleton
            variant="rectangular"
            animation="wave"
            //height={250}
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
      </div>*/}
      </div>
    );
  }
  return (
    <>
      {data.length > 0 ? (
        <>
          {activeButton === 0 && (
            <>
              <div className="flex flex-col items-center gap-10 p-1 bg-[#ebf2f7] rounded-lg p-1">
                <ul className="grid w-full grid-cols-2 gap-1 lg:gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-3">
                  {data.map((ad) => {
                    const isAdCreator = userId === ad.organizer._id.toString();
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
            </>
          )}
          {activeButton === 1 && (
            <>
              <div className="flex p-1 bg-[#ebf2f7] rounded-lg">
                <ul className="w-full">
                  {data.map((ad) => {
                    const isAdCreator = userId === ad.organizer._id.toString();
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
            </>
          )}
          {activeButton === 2 && (
            <>
              <StreetmapAll data={data} />
            </>
          )}
        </>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default CollectionSearch;
