import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonMenu = () => (
  <>
    <Box
      style={{
        width: "100%",
        padding: "24px", // equivalent to `p-6`
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0.75rem", // equivalent to `rounded-xl`
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // equivalent to `shadow-md`
        backgroundColor: "white",
      }}
    >
      {/* Image skeleton */}

      {/* Circle skeleton */}
      <div className="flex  w-full justify-between items-center">
        <div className="w-full flex flex-col items-center">
          <Skeleton
            variant="circular"
            style={{
              width: "90px", // adjust size as needed
              height: "90px",
              marginBottom: "2px", // space between circle and other skeletons
            }}
          />

          <Skeleton
            variant="rectangular"
            style={{
              marginTop: "1px", // equivalent to `mt-2`
              width: "100px",
              height: "20px",
              borderRadius: "0.75rem", // equivalent to `rounded-xl`
            }}
          />
          <Skeleton
            variant="text"
            style={{
              width: "80%", // equivalent to `w-4/5`
              height: "24px", // equivalent to `h-6`
              marginTop: "1px", // add spacing between elements
            }}
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <Skeleton
            variant="text"
            style={{
              width: "50px", // equivalent to `w-4/5`
              height: "50px", // equivalent to `h-6`
              marginTop: "2px", // add spacing between elements
            }}
          />
          <Skeleton
            variant="text"
            style={{
              width: "50px", // equivalent to `w-4/5`
              height: "50px", // equivalent to `h-6`
              marginTop: "2px", // add spacing between elements
            }}
          />
          <Skeleton
            variant="text"
            style={{
              width: "80%", // equivalent to `w-4/5`
              height: "24px", // equivalent to `h-6`
              marginTop: "2px", // add spacing between elements
            }}
          />
        </div>
      </div>
    </Box>
    <Box
      style={{
        width: "100%",
        padding: "24px", // equivalent to `p-6`
        display: "flex",
        marginTop: "8px", // equivalent to `mt-2`
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0.75rem", // equivalent to `rounded-xl`
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // equivalent to `shadow-md`
        backgroundColor: "white",
      }}
    >
      {/* Image skeleton */}

      {/* Circle skeleton */}
      <div className="flex  w-full justify-center items-center">
        <div className="w-full flex flex-col items-center">
          <Skeleton
            variant="rectangular"
            style={{
              marginTop: "1px", // equivalent to `mt-2`
              width: "100px",
              height: "20px",
              marginBottom: "2px", // space between circle and other skeletons
              borderRadius: "0.75rem", // equivalent to `rounded-xl`
            }}
          />
          <div className="w-full flex justify-center gap-1 items-center">
            <Skeleton
              variant="circular"
              style={{
                width: "30px", // adjust size as needed
                height: "30px",
                marginTop: "2px", // equivalent to `mt-2`
                marginBottom: "2px", // space between circle and other skeletons
              }}
            />
            <Skeleton
              variant="circular"
              style={{
                width: "30px", // adjust size as needed
                height: "30px",
                marginTop: "2px", // equivalent to `mt-2`
                marginBottom: "2px", // space between circle and other skeletons
              }}
            />
            <Skeleton
              variant="circular"
              style={{
                width: "30px", // adjust size as needed
                height: "30px",
                marginTop: "2px", // equivalent to `mt-2`
                marginBottom: "2px", // space between circle and other skeletons
              }}
            />
          </div>

          <Skeleton
            variant="rectangular"
            style={{
              marginTop: "2px", // equivalent to `mt-2`
              width: "120px",
              height: "20px",
              borderRadius: "0.75rem", // equivalent to `rounded-xl`
            }}
          />
        </div>
      </div>
    </Box>
  </>
);

export default SkeletonMenu;
