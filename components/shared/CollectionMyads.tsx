import { IAd } from "@/lib/database/models/ad.model";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import VerticalCard from "./VerticalCard";
import HorizontalCard from "./HorizontalCard";
import { getAdByUser } from "@/lib/actions/ad.actions";
import Image from "next/image";
import SkeletonCard from "./SkeletonCard";
import SkeletonCardMobile from "./SkeletonCardMobile";
import SkeletonCardHorizontal from "./SkeletonCardHorizontal";
type CollectionProps = {
  userId: string;
  sortby: string;
  // data: IAd[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  userImage: string;
  userName: string;
  urlParamName?: string;
  isAdCreator: boolean;
  isVertical: boolean;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const CollectionMyads = ({
  // data,
  userId,
  emptyTitle,
  emptyStateSubtext,
  sortby,
  userImage,
  userName,
  collectionType,
  urlParamName,
  isAdCreator,
  isVertical,
}: CollectionProps) => {
  const [data, setAds] = useState<IAd[]>([]); // Initialize with an empty array
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  // const observer = useRef();
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const organizedAds = await getAdByUser({
        userId,
        page,
        sortby: sortby,
        myshop: isAdCreator,
      });

      // Update ads state using the latest prevAds for filtering
      setAds((prevAds: IAd[]) => {
        const existingAdIds = new Set(prevAds.map((ad) => ad._id));

        // Filter out ads that are already in prevAds
        const newAds = organizedAds?.data.filter(
          (ad: IAd) => !existingAdIds.has(ad._id)
        );

        return [...prevAds, ...newAds]; // Return updated ads
      });
      setTotalPages(organizedAds?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching ads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [page]);

  const lastAdRef = (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage((prevPage: any) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <>
      {data.length > 0 ? (
        isVertical ? (
          <div className="flex flex-col bg-[#ebf2f7] rounded-lg items-center gap-10 p-1 lg:p-2">
            <ul className="grid w-full grid-cols-2 gap-1 mt-1 lg:gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-3">
              {data.map((ad: any, index: number) => {
                if (data.length === index + 1) {
                  return (
                    <div
                      key={ad._id}
                      ref={lastAdRef}
                      className="flex justify-center"
                    >
                      <VerticalCard
                        ad={ad}
                        index={index}
                        userId={userId}
                        isAdCreator={isAdCreator}
                        userImage={userImage}
                        userName={userName}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={ad._id} className="flex justify-center">
                      <VerticalCard
                        ad={ad}
                        index={index}
                        userId={userId}
                        isAdCreator={isAdCreator}
                        userImage={userImage}
                        userName={userName}
                      />
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        ) : (
          <div className="flex p-1 bg-[#ebf2f7] rounded-lg">
            <ul className="w-full">
              {data.map((ad: any, index: number) => {
                if (data.length === index + 1) {
                  return (
                    <div
                      key={ad._id}
                      ref={lastAdRef}
                      className="flex justify-center"
                    >
                      <HorizontalCard
                        ad={ad}
                        index={index}
                        userId={userId}
                        isAdCreator={isAdCreator}
                        userImage={userImage}
                        userName={userName}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={ad._id} className="flex justify-center">
                      <HorizontalCard
                        ad={ad}
                        index={index}
                        userId={userId}
                        isAdCreator={isAdCreator}
                        userImage={userImage}
                        userName={userName}
                      />
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        )
      ) : (
        loading === false && (
          <>
            <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
              <h3 className="font-bold text-[16px] lg:text-[25px]">
                {emptyTitle}
              </h3>
              <p className="text-sm lg:p-regular-14">{emptyStateSubtext}</p>
            </div>
          </>
        )
      )}
      {loading && (
        <>
          {isVertical ? (
            <>
              <div className="hidden lg:inline mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
                <div className="mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
              <div className="lg:hidden mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
                <SkeletonCardMobile />
                <SkeletonCardMobile />
                <SkeletonCardMobile />
                <SkeletonCardMobile />
              </div>
            </>
          ) : (
            <>
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
            </>
          )}
        </>
      )}
    </>
  );
};

export default CollectionMyads;
