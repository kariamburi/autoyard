"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Unreadmessages from "./Unreadmessages";
import { SignedIn, SignedOut } from "@clerk/nextjs";
type navprop = {
  userId: string;
};
const BottomNavigation = ({ userId }: navprop) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 z-10 w-full bg-white shadow-md border-t border-gray-200">
      <div className="flex justify-around py-2 relative">
        <Link href="/" passHref>
          <div
            className={`flex flex-col items-center hover:text-emerald-400 ${
              isActive("/") ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <span>
              <HomeIcon />
            </span>
            <span className="text-xs">Home</span>
          </div>
        </Link>

        <Link
          href={`/category?category=Vehicle&subcategory=${encodeURIComponent(
            "Cars, Vans & Pickups"
          )}`}
          passHref
        >
          <div
            className={`flex flex-col items-center hover:text-emerald-400 ${
              isActive("/category") ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <span>
              <SearchOutlinedIcon />
            </span>
            <span className="text-xs">Search</span>
          </div>
        </Link>

        {/* Sell Button */}

        <SignedIn>
          <Link href="/ads/create" passHref>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex justify-center items-center w-16 h-16 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 active:bg-emerald-800 transition duration-200">
                <AddCircleOutlineOutlinedIcon className="text-3xl" />
              </div>
            </div>
          </Link>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex justify-center items-center w-16 h-16 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 active:bg-emerald-800 transition duration-200">
                <AddCircleOutlineOutlinedIcon className="text-3xl" />
              </div>
            </div>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link href="/chat" passHref>
            <div
              className={`flex flex-col items-center hover:text-emerald-400 ${
                isActive("/chat") ? "text-emerald-600" : "text-gray-600"
              }`}
            >
              <span className="flex">
                <CommentOutlinedIcon />
                <Unreadmessages userId={userId} />
              </span>
              <span className="text-xs">Chat</span>
            </div>
          </Link>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <div
              className={`flex flex-col items-center hover:text-emerald-400 ${
                isActive("/chat") ? "text-emerald-600" : "text-gray-600"
              }`}
            >
              <span className="flex">
                <CommentOutlinedIcon />
                <Unreadmessages userId={userId} />
              </span>
              <span className="text-xs">Chat</span>
            </div>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link href="/settings" passHref>
            <div
              className={`flex flex-col items-center hover:text-emerald-400 ${
                isActive("/settings") ? "text-emerald-600" : "text-gray-600"
              }`}
            >
              <span>
                <SettingsIcon />
              </span>
              <span className="text-xs">Settings</span>
            </div>
          </Link>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <div
              className={`flex flex-col items-center hover:text-emerald-400 ${
                isActive("/settings") ? "text-emerald-600" : "text-gray-600"
              }`}
            >
              <span>
                <SettingsIcon />
              </span>
              <span className="text-xs">Settings</span>
            </div>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default BottomNavigation;
