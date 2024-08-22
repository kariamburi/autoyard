import { IAd } from "@/lib/database/models/ad.model";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { NGnaira } from "@/lib/help";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PartyModeOutlinedIcon from "@mui/icons-material/PartyModeOutlined";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { createBookmark } from "@/lib/actions/bookmark.actions";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
type CardProps = {
  ad: IAd;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  userId: string;
};

const Card = ({ ad, hasOrderLink, hidePrice, userId }: CardProps) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const isAdCreator = userId === ad.organizer._id.toString();
  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  const truncateaddress = (address: string, maxLength: number) => {
    if (address.length > maxLength) {
      return address.substring(0, maxLength) + "...";
    }
    return address;
  };
  const handle = async (id: string) => {
    const newBookmark = await createBookmark({
      bookmark: {
        userBId: userId,
        adId: id,
      },
      path: pathname,
    });
    if (newBookmark) {
      toast({
        title: "Alert",
        description: newBookmark,
        duration: 5000,
        className: "bg-[#30AF5B] text-white",
      });
    }
  };
  //console.log(ad.imageUrls);
  return (
    <div className="group relative flex min-h-[300px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[300px]">
      <Link
        href={`/ads/${ad._id}`}
        style={{ backgroundImage: `url(${ad.imageUrls[0]})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS Ad CREATOR ... */}

      {ad.plan.name !== "Free" && (
        <div
          style={{
            backgroundColor: ad.plan.color,
          }}
          className="absolute top-0 shadow-lg left-0 text-white text-[10px] py-1 px-1 lg:text-xs lg:py-1 lg:px-3 rounded-br-lg rounded-tl-lg"
        >
          <Link href={`/plan`}>
            <div className="flex gap-1 cursor-pointer">{ad.plan.name}</div>
          </Link>
        </div>
      )}
      {ad.organizer.verified &&
        ad.organizer?.verified[0]?.accountverified === true && (
          <div className="absolute bg-emerald-100 top-0 right-0 text-[10px] py-1 px-1 lg:text-xs lg:py-1 lg:px-3 rounded-bl-lg rounded-tr-lg">
            <div className="flex gap-1 cursor-pointer">
              <VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} />
              Verified
            </div>
          </div>
        )}
      {isAdCreator && !hidePrice && (
        <div className="absolute right-2 top-10 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/ads/${ad._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation adId={ad._id} imageUrls={ad.imageUrls} />
        </div>
      )}

      <div className="flex min-h-[80px] lg:items-center flex-col p-1">
        <div className="w-full flex justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 p-1 rounded-full">
          <div className="gap-1 cursor-pointer bg-[#000000] bg-opacity-70 text-[10px] lg:text-xs text-white flex rounded-lg p-1 shadow-sm transition-all">
            <LocalSeeOutlinedIcon sx={{ fontSize: 16, cursor: "pointer" }} />
            {ad.imageUrls.length}
          </div>
          {ad.youtube && (
            <div className="gap-1 cursor-pointer bg-[#000000] bg-opacity-70 text-[10px] lg:text-xs text-white flex rounded-lg p-1 shadow-sm transition-all">
              <YouTubeIcon
                sx={{ fontSize: 16, cursor: "pointer" }}
                style={{ color: "red" }}
              />{" "}
              Video
            </div>
          )}
        </div>
        <div className="w-full flex justify-end  absolute top-2/3 left-1/2 transform -translate-x-1/2 p-1 rounded-full">
          <div
            className="w-8 h-8 p-1 mt-[-10px] shadow-lg flex items-center justify-center rounded-full bg-white text-emerald-500 tooltip tooltip-bottom hover:text-[#2BBF4E] hover:cursor-pointer"
            data-tip="Bookmark"
            onClick={() => handle(ad._id)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BookmarkIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p> Save Ad</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {!hidePrice && (
          <div className="flex">
            <Link href={`/ads/${ad._id}`} className="no-underline">
              <span className="text-[12px] lg:text-lg font-bold w-min rounded-full mt-1 text-emerald-950">
                {NGnaira.format(ad.price)}
              </span>
            </Link>
          </div>
        )}

        <Link
          href={`/ads/${ad._id}`}
          className="no-underline text-[12px] lg:text-sm"
        >
          {truncateTitle(ad.title, 30)}
          {/* Change 20 to your desired character limit */}
        </Link>
        {ad.calcDistance && (
          <div className="text-[10px] lg:text-xs text-gray-100 w-full items-center">
            {ad.calcDistance} KM Away
          </div>
        )}

        <div className="text-gray-500 text-[10px] lg:text-[12px] hidden lg:inline">
          <LocationOnIcon sx={{ fontSize: 14 }} />
          {truncateaddress(ad.address, 40)}
        </div>
        <div className="text-gray-500 text-[8px] lg:text-[10px] lg:hidden">
          <LocationOnIcon sx={{ fontSize: 14 }} />
          {truncateaddress(ad.address, 30)}
        </div>
        <div className="flex justify-between w-full gap-1 p-1">
          {ad.vehiclecondition && (
            <div className="flex gap-2 text-[8px] lg:text-xs bg-[#ebf2f7] rounded-lg p-1 justify-center border">
              {ad.vehiclecondition}
            </div>
          )}
          {ad.vehicleTransmissions && (
            <div className="flex gap-2 text-[8px] lg:text-xs bg-[#ebf2f7] rounded-lg p-1 justify-center border">
              {ad.vehicleTransmissions}
            </div>
          )}
          {ad.vehicleEngineSizesCC && (
            <div className="flex gap-2 text-[8px] lg:text-xs bg-[#ebf2f7] rounded-lg p-1 justify-center border">
              {ad.vehicleEngineSizesCC}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
