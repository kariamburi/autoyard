import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonMenu = () => (
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
    <Skeleton
      variant="rectangular"
      style={{
        marginTop: "8px", // equivalent to `mt-2`
        width: "100px",
        height: "40px",
        borderRadius: "0.75rem", // equivalent to `rounded-xl`
      }}
    />

    <Skeleton
      variant="text"
      style={{
        width: "80%", // equivalent to `w-4/5`
        height: "24px", // equivalent to `h-6`
        marginTop: "8px", // add spacing between elements
      }}
    />
  </Box>
);

export default SkeletonMenu;
