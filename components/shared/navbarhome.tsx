"use client";

import MessageIcon from "@mui/icons-material/Message";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DiamondIcon from "@mui/icons-material/Diamond";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useRouter, redirect, usePathname } from "next/navigation";
//import { useSession } from "next-auth/react";
//import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import Image from "next/image";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Header from "@/components/shared/Header";
//import Unreadmessages from "./Unreadmessages";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Unreadmessages from "./Unreadmessages";
import dynamic from "next/dynamic";
import StyledBrandName from "./StyledBrandName";
import AppPopup from "./AppPopup ";
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

type NavProps = {
  userstatus: string;
  userId: string;
};

export default function Navbarhome({ userstatus, userId }: NavProps) {
  // const [unreadCount, setUnreadCount] = useState<number>(0);
  const router = useRouter();
  // Get the params of the User
  const pathname = usePathname();
  const isActive = pathname === "/";

  return (
    <div className="w-full bg-gradient-to-b lg:bg-gradient-to-b from-emerald-800 to-[#ebf2f7] p-2 lg:p-3">
      <div className="flex p-1 w-full">
        <div className="flex-1">
          <div className="flex items-center">
            {!isActive && (
              <div
                className="mr-5 w-5 h-8 flex items-center justify-center rounded-sm text-white tooltip tooltip-bottom hover:cursor-pointer"
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
              <Image
                src="/assets/images/logo_white.png"
                alt="logo"
                onClick={() => router.push("/")}
                className="hover:cursor-pointer"
                width={36}
                height={36}
              />
            </div>
            <span
              className="font-bold text-base lg:text-lg text-white hover:cursor-pointer"
              onClick={() => router.push("/")}
            >
              <StyledBrandName />
            </span>
          </div>
        </div>
        <div className="hidden lg:inline">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 flex items-center justify-center hover:text-gray-700 rounded-full bg-white emerald-500 tooltip tooltip-bottom hover:cursor-pointer"
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
              className="w-8 h-8 flex items-center justify-center hover:text-gray-700 rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
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
                    <div
                      onClick={() => router.push(`/chat/`)}
                      className="flex gap-1"
                    >
                      Chats
                      <Unreadmessages userId={userId} />
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div
              className="w-8 h-8 flex items-center justify-center hover:text-gray-700 rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
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
            <div>
              <SignedIn>
                <Link href="/ads/create">
                  <button
                    className={`w-[100px] text-sm bg-gradient-to-r from-[#000000] to-[#000000] hover:bg-gray-700 text-white p-1 rounded-xl`}
                  >
                    <AddCircleOutlineOutlinedIcon /> SELL
                  </button>
                </Link>
              </SignedIn>
            </div>
            <div>
              <SignedOut>
                <Link href="/sign-in">
                  <button
                    className={`w-[100px] bg-gradient-to-b from-[#000000] to-[#000000] hover:bg-gray-700 text-white p-1 rounded-xl`}
                  >
                    <AddCircleOutlineOutlinedIcon /> SELL
                  </button>
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>

        <div className="flex gap-1">
          <SignedIn>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <MobileNav userstatus={userstatus} userId={userId} />
        </div>
      </div>
      <div>
        <Header />
        <AppPopup />
      </div>
    </div>
  );
}
