"use client";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Searchmain from "./Searchmain";
import { motion } from "framer-motion";
export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState<string>();

  // Function to handle changes in the search input
  const handleSearchChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div className="flex max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 1, ease: "easeInOut" }}
        className="lg:mb-0 mx-auto md:my-auto py-2 lg:py-0 md:py-0 w-[90%] md:w-[40%] text-center"
      >
        <div className="">
          <div className="mb-5 text-white">
            Find all in{" "}
            <span className="bg-black text-white p-1 rounded-full">
              <LocationOnIcon /> Kenya
            </span>
          </div>
        </div>
        <Searchmain />
      </motion.div>
    </div>
  );
}
