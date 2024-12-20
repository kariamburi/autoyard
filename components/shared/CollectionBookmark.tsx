import { IAd } from "@/lib/database/models/ad.model";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import VerticalCard from "./VerticalCard";
import HorizontalCard from "./HorizontalCard";
import { getallBookmarkByuserId } from "@/lib/actions/bookmark.actions";
import Image from "next/image";
import SkeletonCard from "./SkeletonCard";
import SkeletonCardMobile from "./SkeletonCardMobile";
type CollectionProps = {
  userId: string;
  userName: string;
  userImage: string;
  //data: IAd[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  //page: number | string;
  //totalPages?: number;
  urlParamName?: string;
  isAdCreator: boolean;
  isVertical: boolean;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const CollectionBookmark = ({
  //data,
  userId,
  userName,
  userImage,
  emptyTitle,
  emptyStateSubtext,
  // page,
  // totalPages = 0,
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
      const bookmark = await getallBookmarkByuserId(userId);

      // Update ads state using the latest prevAds for filtering
      setAds((prevAds: IAd[]) => {
        const existingAdIds = new Set(prevAds.map((ad) => ad._id));

        // Filter out ads that are already in prevAds
        const newAds = bookmark?.data.filter(
          (ad: IAd) => !existingAdIds.has(ad._id)
        );

        return [...prevAds, ...newAds]; // Return updated ads
      });
      setTotalPages(bookmark?.totalPages || 1);
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
          <div className="flex flex-col bg-grey-50 rounded-lg items-center gap-10 p-1 lg:p-2">
            <ul className="grid w-full grid-cols-2 gap-1 lg:gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-3">
              {data.map((ad: any, index: number) => {
                if (data.length === index + 1) {
                  return (
                    <div
                      ref={lastAdRef}
                      key={ad.adId._id}
                      className="flex justify-center"
                    >
                      {/* Render Ad */}
                      <VerticalCard
                        ad={ad.adId}
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
                    <div key={ad.adId._id} className="flex justify-center">
                      {/* Render Ad */}
                      <VerticalCard
                        ad={ad.adId}
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
          <div className="flex p-1 bg-grey-50 rounded-lg">
            <ul className="w-full">
              {data.map((ad: any, index: number) => {
                if (data.length === index + 1) {
                  return (
                    <div
                      ref={lastAdRef}
                      key={ad._id}
                      className="flex justify-center"
                    >
                      {/* Render Ad */}
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
                      {/* Render Ad */}
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
        <div>
          <div className="hidden lg:inline mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <div className="mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
          <div className="lg:hidden mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <SkeletonCardMobile />
            <SkeletonCardMobile />
            <SkeletonCardMobile />
            <SkeletonCardMobile />
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionBookmark;
