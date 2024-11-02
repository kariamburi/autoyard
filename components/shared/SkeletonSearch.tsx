import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonSearch = () => (
  <Box className="w-full p-2 items-center rounded-xl">
    {/* Image skeleton */}
    <Skeleton variant="text" className="mt-1 w-4/5 h-6" />
    <Skeleton variant="rectangular" className="mt-2 w-full rounded-xl shadow" />
  </Box>
);

export default SkeletonSearch;
