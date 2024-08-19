"use client";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Searchmain from "./Searchmain";
//import { fetchAllAds } from "@/lib/fetchData";

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
      {/* Right Side */}
      {/* Middle */}
      <div className="lg:mb-10 mx-auto md:my-auto py-10 md:py-0 w-[90%] md:w-[40%] text-center">
        <div className="mb-10 text-white">
          Find anything in{" "}
          <span className="bg-black text-white p-1 rounded-full">
            <LocationOnIcon /> All Kenya
          </span>
        </div>

        <Searchmain />
      </div>
      {/* Left Side */}
    </div>
  );
}
