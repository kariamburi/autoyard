import { IAd } from "@/lib/database/models/ad.model";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { formatKsh } from "@/lib/help";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { createBookmark, deleteBookmark } from "@/lib/actions/bookmark.actions";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProfileFolder from "./ProfileFolder";
import ShareAd from "./ShareAd";
import ShareAdCard from "./ShareAdCard";
import SellerProfileCard from "./SellerProfileCard";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { updatebookmarked } from "@/lib/actions/ad.actions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
type CardProps = {
  userId: string;
  ad: IAd;
  isAdCreator?: boolean;
  userImage: string;
  userName: string;
};
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next`}
      style={{
        ...style,
        display: "block",
        right: "10px",
        fontSize: "1.5em",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev`}
      style={{
        ...style,
        display: "block",
        left: "10px",
        fontSize: "1.5em",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      Prev
    </div>
  );
};

const VerticalCard = ({
  userId,
  ad,
  isAdCreator,
  userImage,
  userName,
}: CardProps) => {
  const pathname = usePathname();
  const isbookmark = pathname === "/bookmark";
  //alert(pathname);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ismobile, setismobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    // Check if accessing from Android custom tab with your app user-agent
    //const isAutoyardApp = userAgent.includes("AutoyardApp");

    // Check if accessing from mobile (iOS/Android)
    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

    // Check if the referrer is available in the document
    if (isMobile) {
      setIsHovered(true);
      setismobile(true);
    }
  }, []);

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
    if (userId) {
      const newBookmark = await createBookmark({
        bookmark: {
          userBId: userId,
          adId: id,
        },
        path: pathname,
      });
      if (newBookmark === "Ad Saved to Bookmark") {
        const bookmarked = (Number(ad.bookmarked ?? "0") + 1).toString();
        const _id = ad._id;
        await updatebookmarked({
          _id,
          bookmarked,
          path: `/ads/${ad._id}`,
        });
        toast({
          title: "Alert",
          description: newBookmark,
          duration: 5000,
          className: "bg-[#30AF5B] text-white",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed!",
          description: newBookmark,
          duration: 5000,
        });
      }
    } else {
      window.location.reload();
    }
  };
  const handledeletebk = async (id: string) => {
    const delBookmark = await deleteBookmark({
      bookmark: {
        userBId: userId,
        adId: id,
      },
      path: pathname,
    });
    if (delBookmark === "Bookmark deleted successfully") {
      const bookmarked = (Number(ad.bookmarked ?? "1") - 1).toString();
      const _id = ad._id;
      await updatebookmarked({
        _id,
        bookmarked,
        path: `/ads/${ad._id}`,
      });
      toast({
        variant: "destructive",
        title: "Deleted!",
        description: delBookmark,
        duration: 5000,
      });
    }
  };
  const router = useRouter();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: ismobile ? <NextArrow /> : isHovered ? <NextArrow /> : undefined,
    prevArrow: ismobile ? <PrevArrow /> : isHovered ? <PrevArrow /> : undefined,
    beforeChange: (current: any, next: any) => setActiveIndex(next),
    appendDots: (dots: any) => (
      <div style={{ bottom: "10px", width: "100%", overflow: "hidden" }}>
        <div
          className="flex items-center justify-center w-full"
          style={{
            transform: `translateX(-${activeIndex * 20}px)`, // Adjust the scroll speed by tweaking `20px`
            transition: "transform 0.5s ease",
          }}
        >
          <ul className="flex flex-row gap-0">{dots}</ul>
        </div>
      </div>
    ),
    customPaging: (index: number) => (
      <div
        className={`w-2 h-1 rounded-full ${
          index === activeIndex ? "bg-white" : "bg-white opacity-50"
        }`}
      ></div>
    ),
  };

  const handleOpenPopup = () => {
    setIsOpen(true);
  };
  const handleOpenPopupProfile = () => {
    setIsOpenProfile(true);
  };
  const handleClosePopupProfile = () => {
    setIsOpenProfile(false);
  };
  //console.log(ad.imageUrls);
  const handleShareOptions = async () => {
    if (navigator.share) {
      const shareUrl = `https://autoyard.co.ke/ads/${ad._id}`;
      const shareTitle = `${ad.title}, Price: Ksh ${ad.price}`;
      const shareDescription = ad.description;
      const imageUrl = ad.imageUrls[0];
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        });
        console.log("Share was successful.");
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      console.log("Share not supported on this browser.");
      // You can also show a modal or a tooltip with the URL or instructions here.
    }
  };
  // console.log(ad.imageUrls);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-[320px] lg:h-[430px] w-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[300px]"
    >
      <Slider {...sliderSettings}>
        {ad.imageUrls.map((url, index) => (
          <div
            key={index}
            onClick={() => router.push(`/ads/${ad._id}`)}
            className="cursor-pointer w-full h-[200px] lg:h-[300px] flex justify-center items-center overflow-hidden"
          >
            <Image
              src={url}
              alt={`Ad image ${index + 1}`}
              width={400}
              height={400}
              className="rounded-t-xl object-cover w-full h-full"
            />
          </div>
        ))}
      </Slider>
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
      {isAdCreator && (
        <div className="absolute right-2  top-1 lg:top-10 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
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
      <div className="flex min-h-[80px] flex-col p-1">
        <div className="w-full mt-[-40px] lg:mt-[-20px] flex justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 p-1 rounded-full">
          {!isAdCreator && !isbookmark && (
            <>
              <SignedIn>
                <div
                  className="w-7 h-7 lg:w-8 lg:h-8 p-1 mb-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center rounded-full bg-white text-black tooltip tooltip-bottom opacity-80 hover:opacity-100 hover:cursor-pointer"
                  data-tip="Bookmark"
                  onClick={() => handle(ad._id)}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <BookmarkIcon sx={{ fontSize: 16 }} />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p className="text-sm"> Save Ad</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </SignedIn>

              <SignedOut>
                <Link href="/sign-in">
                  <div
                    className="w-7 h-7 lg:w-8 lg:h-8 p-1 mb-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center rounded-full bg-white text-black tooltip tooltip-bottom opacity-80 hover:opacity-100 hover:cursor-pointer"
                    data-tip="Bookmark"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BookmarkIcon sx={{ fontSize: 16 }} />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p className="text-sm"> Save Ad</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </Link>
              </SignedOut>
            </>
          )}
          {/* {ad.youtube && (
            <div className="gap-1 cursor-pointer bg-[#000000] bg-opacity-70 text-[10px] lg:text-xs text-white flex rounded-lg p-1 shadow-sm transition-all">
              <YouTubeIcon
                sx={{ fontSize: 16, cursor: "pointer" }}
                style={{ color: "red" }}
              />{" "}
              Video
            </div>
          )}*/}
          <SignedIn>
            <div
              className="w-7 h-7 lg:w-8 lg:h-8 p-1 mb-1 shadow-lg flex items-center justify-center rounded-full bg-white text-black tooltip tooltip-bottom opacity-80 hover:opacity-100 hover:cursor-pointer"
              data-tip="Share"
              onClick={handleOpenPopup}
              // onClick={() => handle(ad._id)}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ReplyOutlinedIcon sx={{ fontSize: 16 }} />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-sm"> Share Ad</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <div
                className="w-7 h-7 lg:w-8 lg:h-8 p-1 mb-1 shadow-lg flex items-center justify-center rounded-full bg-white text-black tooltip tooltip-bottom opacity-80 hover:opacity-100 hover:cursor-pointer"
                data-tip="Share"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ReplyOutlinedIcon sx={{ fontSize: 16 }} />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-sm"> Share Ad</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Link>
          </SignedOut>
        </div>

        {!isAdCreator && (
          <div className="w-full mt-[-30px] lg:mt-[0px] flex justify-end  absolute top-2/3 left-1/2 transform -translate-x-1/2 p-1 rounded-full">
            <ProfileFolder
              onClick={handleOpenPopupProfile}
              profileImage={ad.organizer.photo ?? "/avator.png"}
              username={ad.organizer.firstName}
            />
          </div>
        )}

        {isbookmark && (
          <div className="w-full flex absolute top-2/3 left-1/2 transform -translate-x-1/2 p-1 rounded-full">
            <div
              className="w-7 h-7 lg:w-8 lg:h-8 p-1 mt-[-20px] shadow-lg flex items-center justify-center rounded-full bg-red-100 text-emerald-500 tooltip tooltip-bottom hover:text-[#2BBF4E] hover:cursor-pointer"
              data-tip="Bookmark"
              onClick={() => handledeletebk(ad._id)}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      src="/assets/icons/delete.svg"
                      alt="edit"
                      width={20}
                      height={20}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p className="text-sm"> Delete Ad</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
        {isAdCreator ? (
          <div className="flex justify-between items-center w-full p-1">
            <Link href={`/ads/${ad._id}`} className="no-underline">
              <span className="text-emerald-950 text-[12px] lg:text-lg font-bold w-min rounded-full text-green-60">
                {formatKsh(ad.price)}
              </span>
            </Link>
            {ad.adstatus && (
              <div
                className={`flex flex-col text-[8px] lg:text-[10px] p-1 text-white justify-center items-center rounded-full ${
                  ad.adstatus === "Pending"
                    ? "bg-yellow-600"
                    : ad.adstatus === "Failed"
                    ? "bg-red-600 "
                    : "bg-green-600"
                }`}
              >
                {ad.adstatus}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center p-1">
            <Link href={`/ads/${ad._id}`} className="no-underline">
              <span className="text-emerald-950 font-bold text-[12px] lg:text-lg w-min rounded-full text-green-60">
                {formatKsh(ad.price)}
              </span>
            </Link>
          </div>
        )}
        <Link
          href={`/ads/${ad._id}`}
          className="no-underline text-[12px] lg:text-sm"
        >
          <div className="text-gray-500 text-sm hidden lg:inline">
            {truncateTitle(ad.title, 35)}
          </div>
          <div className="text-gray-500 text-[12px] lg:hidden">
            {truncateTitle(ad.title, 20)}
          </div>
          {/* Change 20 to your desired character limit */}
        </Link>
        {ad.calcDistance && (
          <div className="text-[10px] lg:text-xs text-emerald-500">
            {Math.round(ad.calcDistance / 100) / 10} KM Away
          </div>
        )}
        <div className="text-gray-500 text-[12px] hidden lg:inline">
          <LocationOnIcon sx={{ fontSize: 14 }} />
          {truncateaddress(ad.address, 35)}
        </div>
        <div className="text-gray-500 text-[10px] lg:hidden">
          <LocationOnIcon sx={{ fontSize: 14 }} />
          {truncateaddress(ad.address, 25)}
        </div>
        <div className="flex justify-between w-full gap-1 p-1">
          {ad.vehiclecondition && (
            <div className="flex text-[8px] lg:text-xs bg-[#ebf2f7] rounded-sm p-1 justify-center border">
              {ad.vehiclecondition}
            </div>
          )}
          {ad.vehicleTransmissions && (
            <div className="flex text-[8px] lg:text-xs bg-[#ebf2f7] rounded-sm p-1 justify-center border">
              {ad.vehicleTransmissions}
            </div>
          )}
          {ad.vehicleEngineSizesCC && (
            <div className="flex text-[8px] lg:text-xs bg-[#ebf2f7] rounded-sm p-1 justify-center border">
              {ad.vehicleEngineSizesCC}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Share Ad</h3>

            <div className="flex w-full mb-2 rounded-lg bg-gray-100">
              <div className="relative w-[160px] lg:w-[200px] h-[200px]">
                <img
                  src={ad.imageUrls[0]}
                  alt="ad image"
                  className="object-cover rounded-l-lg h-full w-full"
                />
              </div>

              <div className="flex-1 mt-2 p-2">
                <Link
                  href={`/ads/${ad._id}`}
                  className="text-emerald-950 font-bold text-sm lg:text-basefont-bold line-clamp-2 hover:no-underline"
                >
                  {ad.title}
                </Link>
                <div className="text-[12px] lg:text-sm"></div>

                <div className="text-sm hidden lg:inline">
                  {ad?.description && truncateTitle(ad?.description, 100)}
                </div>
                <div className="text-[12px] lg:hidden">
                  {ad?.description && truncateTitle(ad?.description, 50)}
                </div>

                <div className="flex items-center">
                  <Link href={`/ads/${ad._id}`} className="no-underline">
                    <span className="text-emerald-950 text-[12px] font-bold lg:text-lg w-min rounded-full text-green-60">
                      {formatKsh(ad.price)}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <ShareAdCard ad={ad} />

            <div className="flex justify-between">
              <button
                onClick={handleShareOptions}
                className="hover:bg-white flex gap-1 items-center hover:text-black bg-[#000000] gap-1 text-white text-sm p-3 rounded-full shadow"
              >
                <div>
                  <IosShareOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                <div className="hidden lg:inline">More Options</div>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex justify-center items-center h-12 w-12 text-white bg-black rounded-full"
              >
                <CloseOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpenProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold mb-4">Seller Profile</h3>
              <button
                onClick={handleClosePopupProfile}
                className="flex justify-center items-center h-12 w-12 text-black bg-gray-50 hover:bg-black hover:text-white rounded-full"
              >
                <CloseOutlinedIcon />
              </button>
            </div>

            <SellerProfileCard
              userId={userId}
              ad={ad}
              userImage={userImage}
              userName={userName}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalCard;
