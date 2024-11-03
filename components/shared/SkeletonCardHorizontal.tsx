import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonCardHorizontal = () => (
  <Box
    style={{
      width: "100%",
      padding: "2px",
      marginBottom: "4px",
      borderRadius: "0.75rem", // equivalent to `rounded-xl`
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // equivalent to `shadow-md`
      backgroundColor: "white",
    }}
  >
    {/* Image skeleton */}
    <div className="w-full flex justify-between">
      <div className="flex justif-center items-center">
        <Skeleton
          variant="rectangular"
          style={{
            width: "180px",
            borderTopLeftRadius: "0.75rem", // equivalent to `rounded-t-xl`
            borderBottomLeftRadius: "0.75rem",
            height: "10rem", // equivalent to `h-72`
          }}
        />
      </div>
      <div className="ml-3 mt-4 w-full flex flex-col justify-left">
        {/* Title skeleton */}
        <Skeleton
          variant="text"
          style={{
            width: "60%", // equivalent to `w-4/5`
            height: "24px", // equivalent to `h-6`
          }}
        />

        {/* Price skeleton */}
        <Skeleton
          variant="text"
          style={{
            width: "80%", // equivalent to `w-2/5`
            height: "20px", // equivalent to `h-5`
          }}
        />

        {/* Location skeleton */}
        <Skeleton
          variant="text"
          style={{
            width: "40%", // equivalent to `w-2/5`
            height: "16px", // equivalent to `h-4`
          }}
        />
        <Skeleton
          variant="text"
          style={{
            width: "20%", // equivalent to `w-4/5`
            height: "30px", // equivalent to `h-6`
          }}
        />
        <div className="flex gap-2 items-center">
          <Skeleton
            variant="text"
            style={{
              width: "50px", // equivalent to `w-4/5`
              height: "30px", // equivalent to `h-6`
            }}
          />
          <Skeleton
            variant="text"
            style={{
              width: "50px", // equivalent to `w-4/5`
              height: "30px", // equivalent to `h-6`
            }}
          />
          <Skeleton
            variant="text"
            style={{
              width: "50px", // equivalent to `w-4/5`
              height: "30px", // equivalent to `h-6`
            }}
          />
        </div>
      </div>
    </div>
  </Box>
);

export default SkeletonCardHorizontal;
