"use client";
import { motion } from "framer-motion";

// Inside your component
const TrendingAds = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial state: transparent and above its position
      animate={{ opacity: 1, y: 0 }} // Final state: fully opaque and in position
      transition={{ delay: 0.3, duration: 0.5 }} // Delay before starting motion
      className="items-center flex"
    >
      <h2 className="font-bold p-2 text-[30px]">Trending Ads</h2>
    </motion.div>
  );
};

export default TrendingAds;
