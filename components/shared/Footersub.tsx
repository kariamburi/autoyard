"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
//import Termspopup from "./termspopup";

const Footersub = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="border-t border-gray-300 p-2 mt-3"></div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs font-bold">
          {currentYear} Wheels. All Rights reserved.
        </p>
        <p className="text-[8px] lg:text-xs">
          Developed by{" "}
          <Link
            href="https://craftinventors.co.ke"
            className="no-underline hover:text-emerald-500 "
          >
            Craft Inventors
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footersub;
