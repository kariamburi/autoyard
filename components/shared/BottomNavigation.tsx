"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Unreadmessages from "./Unreadmessages";
type navprop = {
  userId: string;
};
const BottomNavigation = ({ userId }: navprop) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-md border-t border-gray-200">
      <div className="flex justify-around py-2">
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
          href="/category?category=Vehicle&subcategory=Cars, Vans & Pickups"
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
        <Link href="/ads/create" passHref>
          <div
            className={`flex flex-col items-center hover:text-emerald-400 ${
              isActive("/ads/create") ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <span>
              <AddCircleOutlineOutlinedIcon />
            </span>
            <span className="text-xs">Sell</span>
          </div>
        </Link>
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
      </div>
    </nav>
  );
};

export default BottomNavigation;
