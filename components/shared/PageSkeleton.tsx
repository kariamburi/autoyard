import React from "react";
import Skeleton from "@mui/material/Skeleton";

const PageSkeleton = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Skeleton */}
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <Skeleton variant="rectangular" width={120} height={40} />
          {/* Search Bar */}
          <div className="flex gap-2 w-1/2">
            <Skeleton variant="rectangular" width="80%" height={40} />
            <Skeleton variant="rectangular" width={60} height={40} />
          </div>
          {/* Sell Button */}
          <Skeleton variant="rectangular" width={80} height={40} />
        </div>
      </header>

      {/* Navigation Skeleton */}
      <nav className="py-2">
        <div className="container justify-center mx-auto flex gap-4 overflow-x-auto px-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={120}
              height={60}
            />
          ))}
        </div>
      </nav>

      {/* Trending Ads Skeleton */}
      <main className="container mx-auto mt-6 px-4">
        <h2 className="text-xl font-bold mb-4">
          <Skeleton width={200} height={30} />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white p-1 rounded-xl">
              {/* Image Skeleton */}
              <Skeleton
                variant="rectangular"
                width="100%"
                style={{
                  borderTopLeftRadius: "0.75rem", // equivalent to `rounded-t-xl`
                  borderTopRightRadius: "0.75rem",
                  height: "18rem", // equivalent to `h-72`
                }}
              />
              {/* Ad Details */}
              <div className="mt-2">
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="80%" height={15} />
                <Skeleton variant="text" width="40%" height={15} />
              </div>
              {/* Tags */}
              <div className="flex gap-2 mt-2">
                <Skeleton variant="rectangular" width={60} height={20} />
                <Skeleton variant="rectangular" width={80} height={20} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PageSkeleton;
