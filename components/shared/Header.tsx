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
      <div
        style={{
          animation: `fadeInUp 1s ease-in-out 0s forwards`,
          opacity: 0, // Initial opacity before animation starts
        }}
        className="lg:mb-0 mx-auto md:my-auto py-2 lg:py-0 md:py-0 w-[90%] md:w-[40%] text-center"
      >
        <div className="">
          <div className="mb-5 text-white">
            Find all in{" "}
            <span className="bg-black text-white py-1 px-2 rounded-full">
              <LocationOnIcon sx={{ fontSize: 18 }} /> Kenya
            </span>
          </div>
        </div>
        <Searchmain />
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px); /* Mimics the initial y: 20 */
          }
          to {
            opacity: 1;
            transform: translateY(0); /* Moves to the final position */
          }
        }
      `}</style>
    </div>
  );
}
