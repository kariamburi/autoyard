"use client";
import React from "react";
import { UpdateUserParams } from "@/types";
import Navbar from "./navbar";

import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DiamondIcon from "@mui/icons-material/Diamond";
import ViewListIcon from "@mui/icons-material/ViewList";

import { useRouter, redirect, usePathname } from "next/navigation";
//import { useSession } from "next-auth/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import NavItems from "./NavItems";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Ratings from "./ratings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
type sidebarProps = {
  recipient: UpdateUserParams;
  userId: string;
};
const NavbarReviews = ({ recipient, userId }: sidebarProps) => {
  const router = useRouter();
  return (
    <div className="navbar flex items-center w-full gap-5 bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 justify-between">
      <div className="flex items-center gap-1">
        <div
          className="w-5 h-8 flex items-center justify-center rounded-sm text-white tooltip tooltip-bottom hover:cursor-pointer"
          data-tip="Back"
          onClick={() => router.back()}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ArrowBackOutlinedIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>Back</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="logo font-bold text-white">Seller Reviews</span>
      </div>
      <div className="flex py-1 space-x-3 h-10 justify-end">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
          data-tip="Messages"
          onClick={() => router.push(`/`)}
        >
          <HomeIcon />
        </div>

        <div
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
          data-tip="Bookmark"
          onClick={() => router.push(`/bookmark/`)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <BookmarkIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p> Saved Ads</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
          data-tip="Plan"
          onClick={() => router.push(`/plan/`)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DiamondIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>Premium Services</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
          data-tip="My Adverts"
          onClick={() => router.push(`/shop/${userId}`)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ViewListIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>My Adverts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <SignedIn>
          <Link href="/ads/create">
            <button
              className={`w-[100px] bg-gradient-to-b from-[#4DCE7A] to-[#30AF5B] hover:bg-[#30AF5B] text-white p-1 rounded-full`}
            >
              <AddCircleOutlineOutlinedIcon /> SELL
            </button>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <button
              className={`w-[100px] bg-gradient-to-b from-[#4DCE7A] to-[#30AF5B] hover:bg-[#30AF5B] text-white p-1 rounded-full`}
            >
              <AddCircleOutlineOutlinedIcon /> SELL
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer">
            <UserButton afterSignOutUrl="/" />
          </div>

          <MobileNav userstatus={"User"} userId={userId} />
        </SignedIn>
      </div>
    </div>
  );
};

export default NavbarReviews;
