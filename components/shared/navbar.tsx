"use client";

import MessageIcon from "@mui/icons-material/Message";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DiamondIcon from "@mui/icons-material/Diamond";
import ViewListIcon from "@mui/icons-material/ViewList";

import { useRouter, redirect, usePathname } from "next/navigation";
//import { useSession } from "next-auth/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import MobileNav from "./MobileNav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import NavItems from "./NavItems";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import Image from "next/image";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Unreadmessages from "./Unreadmessages";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
type NavProps = {
  userstatus: string;
  userId: string;
};

export default function Navbar({ userstatus, userId }: NavProps) {
  // const [unreadCount, setUnreadCount] = useState<number>(0);
  const router = useRouter();
  // Get the params of the User
  const pathname = usePathname();
  const isActive = pathname === "/";

  return (
    <div className="flex p-1 space-x-3 mx-auto w-full">
      <div className="flex-1 my-auto">
        <div className="flex items-center">
          {!isActive && (
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
          )}
          <div className="rounded-full overflow-hidden">
            <img
              src="/assets/images/logo_white.png"
              alt="logo"
              onClick={() => router.push("/")}
              className="ml-5 hover:cursor-pointer"
              width={46}
              height={46}
            />
          </div>
          <span
            className="font-bold text-lg text-white hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            Wheels
          </span>
        </div>
      </div>

      <div
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white emerald-500 tooltip tooltip-bottom hover:cursor-pointer"
        data-tip="Messages"
        onClick={() => router.push(`/bookmark/`)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <BookmarkIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>Bookmark</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
        data-tip="Messages"
        onClick={() => router.push(`/chat/`)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex items-center justify-center">
                <MessageIcon className="absolute" />
                <div className="absolute z-10">
                  <Unreadmessages userId={userId} />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div onClick={() => router.push(`/chat/`)} className="flex gap-1">
                Chats
                <Unreadmessages userId={userId} />
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
        data-tip="Messages"
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

        <MobileNav userstatus={userstatus} userId={userId} />
      </SignedIn>
    </div>
  );
}