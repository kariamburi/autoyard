"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
//import Termspopup from "./termspopup";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="hidden lg:inline">
        <div className="flex">
          <div className="flex-1">
            <p className="mb-3 text-slate-950 font-bold">About us</p>
            <div className="divider"></div>
            <ul className="space-y-4">
              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                About Wheels
              </li>

              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                <div>Terms & Conditions</div>
              </li>
              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="mb-3 text-slate-950 font-bold">Support</p>
            <ul className="space-y-4">
              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                support@wheels.co.ke
              </li>
              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                Safety tips
              </li>
              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                Contact Us
              </li>
              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                FAQ
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="mb-3 text-slate-950 font-bold">Our Apps</p>
            <ul className="space-y-4">
              <li>
                <Image
                  src="https://assets.jiji.ng/static/img/single-images/app-store.svg"
                  alt="App Store"
                  className="w-20 md:w-40"
                  width={20}
                  height={40}
                />
              </li>
              <li>
                <Image
                  src="https://assets.jiji.ng/static/img/single-images/google-play.svg"
                  alt="Google Play"
                  className="w-20 md:w-40"
                  width={20}
                  height={40}
                />
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="mb-3 text-slate-950 font-bold">Our resources</p>
            <ul className="space-y-4">
              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                Wheels on FB
              </li>
              <li className="transition-colors text-sm  hover:text-emerald-600 hover:cursor-pointer">
                Our Instagram
              </li>
              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                Our Youtube
              </li>

              <li className="transition-colors text-sm hover:text-emerald-600 hover:cursor-pointer">
                Our Twitter
              </li>
            </ul>
          </div>
        </div>
      </div>
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

export default Footer;
