"use client";
import React from "react";
import { UpdateUserParams } from "@/types";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DiamondIcon from "@mui/icons-material/Diamond";
import ViewListIcon from "@mui/icons-material/ViewList";
import Image from "next/image";
import { useRouter, redirect, usePathname } from "next/navigation";
//import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import MobileNav from "./MobileNav";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import dynamic from "next/dynamic";
const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedIn),
  { ssr: false }
);
const SignedOut = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedOut),
  { ssr: false }
);
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false }
);

type sidebarProps = {
  recipient: UpdateUserParams;
  userId: string;
};
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
const NavbarChats = ({ recipient, userId }: sidebarProps) => {
  const router = useRouter();
  return (
    <div className="navbar bg-gradient-to-r from-emerald-800 to-emerald-950 flex items-center w-full gap-5 p-5 lg:fixed justify-between">
      <div className="flex-1 my-auto">
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
          {recipient.firstName ? (
            <div className="flex gap-1 items-center">
              <img
                src={recipient.photo}
                alt="Profile Image"
                className="rounded-full object-cover"
                width={26}
                height={26}
              />
              <div>
                <Link
                  href={`/shop/${userId}`}
                  className="no-underline font-boldm-1"
                >
                  <span className="text-xs text-gray-100 cursor-pointer font-bold">
                    {recipient.firstName} {recipient.lastName}
                  </span>
                </Link>

                <div className="text-xs text-gray-300">Active: Today</div>
              </div>
            </div>
          ) : (
            <div className="flex gap-1 items-center">
              <div>
                <span className="text-lg ">Select Chat!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex py-1 space-x-3 mx-auto max-w-6xl h-10 justify-end lg:mr-10">
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

export default NavbarChats;
