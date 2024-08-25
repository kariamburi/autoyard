"use client";
import { NGnaira } from "@/lib/help";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useEffect, useState } from "react";
//import { Carousel } from "react-responsive-carousel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallIcon from "@mui/icons-material/Call";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  EmailShareButton,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

import Link from "next/link";
import { IAd } from "@/lib/database/models/ad.model";
import Image from "next/image";
import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FloatingChatIcon from "./FloatingChatIcon";
import ChatWindow from "./ChatWindow";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import YouTubePlayer from "./YouTubePlayer ";
import Streetmap from "./Streetmap";
import { format, isToday, isYesterday } from "date-fns";
import Ratings from "./ratings";
//import SellerProfile from "./SellerProfile";
import { IUser } from "@/lib/database/models/user.model";
import { CreateUserParams } from "@/types";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SettingsOverscanOutlinedIcon from "@mui/icons-material/SettingsOverscanOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import { updateview } from "@/lib/actions/ad.actions";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import SellerProfile from "./SellerProfile";

type CardProps = {
  ad: IAd;
  userId: string;
};
export default function Ads({ ad, userId }: CardProps) {
  const [videoAdId, setvideoAdId] = React.useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const hideAddVideo = userId === ad.organizer._id;
  const [showphone, setshowphone] = useState(false);
  const handleShowPhoneClick = (e: any) => {
    setshowphone(true);
    window.location.href = `tel:${ad.phone}`;
  };

  const handleImageClick = (index: number) => {
    if (!api) {
      return;
    }
    api?.scrollTo(index);
    if (autoplayEnabled) {
      plugin.current.stop();
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  // Handler to toggle the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [isChatOpen, setChatOpen] = useState(false);
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const [api, setApi] = React.useState<CarouselApi>();
  const [api2, setApi2] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    plugin.current.stop();
    // Subscribe to the "select" event to update the current index when the user manually selects a slide
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      api2?.scrollTo(api.selectedScrollSnap() - 1);
      setSelectedIndex(api.selectedScrollSnap());
    });

    sessionStorage.setItem("id", ad._id);
    if (ad.title) {
      sessionStorage.setItem("title", ad.title);
    }
    if (ad.description) {
      sessionStorage.setItem("description", ad.description);
    }
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    // Function to check if it's a YouTube URL and extract the video ID
    function extractYouTubeVideoId(url: string) {
      const match = url.match(youtubeRegex);
      if (match && match[1]) {
        return match[1]; // Return the video ID
      } else {
        return null; // Not a YouTube URL or invalid URL
      }
    }
    if (ad.youtube) {
      const videoId = extractYouTubeVideoId(ad.youtube);
      if (videoId) {
        setvideoAdId(videoId);
        // console.log("YouTube Video ID:", videoId);
      } else {
        setvideoAdId(ad.youtube);
        //  console.log("Not a valid YouTube URL.");
      }
    }
  }, [api, ad._id, ad.description, ad.title, ad.youtube, api2, setvideoAdId]);
  useEffect(() => {
    const updateviewed = async () => {
      const views = (Number(ad.views) + 1).toString();
      const _id = ad._id;
      await updateview({
        _id,
        views,
        path: `/ads/${ad._id}`,
      });
    };
    updateviewed();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const [autoplayEnabled, setAutoplayEnabled] = useState(false); // Initially, autoplay is enabled

  const handlePlay = () => {
    if (autoplayEnabled) {
      plugin.current.stop();
      setAutoplayEnabled(false);
    } else {
      plugin.current.play();
      setAutoplayEnabled(true);
    }
  };
  const [currentSlide, setCurrentSlide] = useState(1); // Initially set to first slide
  const [totalSlides, setTotalSlides] = useState(ad.imageUrls.length); // Set total number of slides
  const setApi3 = (api3: any) => {
    if (!api3) {
      return;
    }
    setTotalSlides(api3.scrollSnapList().length);
    setCurrentSlide(api3.selectedScrollSnap() + 1);
  };

  const handleDirectionClick = () => {
    // Perform navigation or other actions when direction button is clicked
    // Example: Open a new tab with Google Maps directions
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${ad.latitude},${ad.longitude}`,
      "_blank"
    );
  };
  let formattedCreatedAt = "";
  try {
    const createdAtDate = new Date(ad.createdAt); // Convert seconds to milliseconds

    // Get today's date
    const today = new Date();

    // Check if the message was sent today
    if (isToday(createdAtDate)) {
      formattedCreatedAt = "Today " + format(createdAtDate, "HH:mm"); // Set as "Today"
    } else if (isYesterday(createdAtDate)) {
      // Check if the message was sent yesterday
      formattedCreatedAt = "Yesterday " + format(createdAtDate, "HH:mm"); // Set as "Yesterday"
    } else {
      // Format the createdAt date with day, month, and year
      formattedCreatedAt = format(createdAtDate, "dd-MM-yyyy"); // Format as 'day/month/year'
    }

    // Append hours and minutes if the message is not from today or yesterday
    if (!isToday(createdAtDate) && !isYesterday(createdAtDate)) {
      formattedCreatedAt += " " + format(createdAtDate, "HH:mm"); // Append hours and minutes
    }
  } catch {
    // Handle error when formatting date
  }

  return (
    <>
      <div className="m-1 space-y-0 lg:flex lg:space-x-5">
        <div className="lg:flex-1 border-t-8 border-emerald-950 bg-white rounded-lg">
          {/* Carousel */}
          <div className="relative">
            <Carousel
              setApi={setApi}
              plugins={[plugin.current as any]}
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
              className="w-full"
            >
              <CarouselContent>
                {ad.imageUrls.map((image: string, index: number) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="object-cover cursor-pointer h-[500px]"
                      width={800} // Adjust the width as needed
                      height={500} // Adjust the height as needed
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="md:h-10 md:w-10 lg:h-20 lg:w-20 ml-20 font-bold border-0 text-white bg-black bg-opacity-50 p-2 text-3xl" />
              <CarouselNext className="md:h-10 md:w-10 lg:h-20 lg:w-20 mr-20 font-bold border-0 bg-black bg-opacity-50 text-white p-2 text-3xl" />
            </Carousel>
            <div className="flex gap-1 absolute bottom-0 right-0 items-center text-white text-[10px] lg:text-xs m-1 p-0 focus:outline-none">
              <div className="flex pr-2 pl-2 h-10 rounded-sm items-center bg-black bg-opacity-50">
                Slide {current} of {count}
              </div>
              <div
                className="p-1 cursor-pointer rounded-sm shadow"
                onClick={togglePopup}
              >
                <Image
                  src="/assets/icons/expand.png"
                  alt="logo"
                  className="w-8 ml-5 hover:cursor-pointer"
                  width={36}
                  height={36}
                />
              </div>
            </div>
            <div className="flex gap-1 absolute bottom-0 left-0 text-white text-xs m-1 p-0 focus:outline-none">
              <div
                className="p-1 cursor-pointer rounded-sm"
                onClick={handlePlay}
              >
                {autoplayEnabled ? (
                  <Image
                    src="/assets/icons/pause.png"
                    alt="logo"
                    className="w-8 ml-5 hover:cursor-pointer"
                    width={36}
                    height={36}
                  />
                ) : (
                  <Image
                    src="/assets/icons/play.png"
                    alt="logo"
                    className="w-8 ml-5 hover:cursor-pointer"
                    width={36}
                    height={36}
                  />
                )}
              </div>
            </div>
            {ad.plan.name !== "Free" && (
              <div
                style={{
                  backgroundColor: ad.plan.color,
                }}
                className="hidden lg:inline absolute shadow-lg top-0 left-0 text-white text-xs py-1 px-3 rounded-br-lg"
              >
                <Link href={`/plan`}>
                  <div className="flex gap-1 cursor-pointer">
                    {ad.plan.name}
                  </div>
                </Link>
              </div>
            )}
            {ad.organizer.verified &&
              ad.organizer.verified[0].accountverified === true && (
                <div className="hidden lg:inline absolute bg-emerald-100 top-0 right-0 text-xs py-1 px-3 rounded-bl-lg">
                  <div className="flex gap-1 cursor-pointer">
                    {" "}
                    <VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} />
                    Verified
                  </div>
                </div>
              )}
          </div>
          <div className="flex space-x-1">
            <Carousel
              setApi={setApi2}
              opts={{
                align: "start",
              }}
              className="w-full ml-2 mr-2 mt-1"
            >
              <CarouselContent>
                {ad.imageUrls.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="rounded-lg basis-1/3 lg:basis-1/6 pl-5 lg:pr-0"
                  >
                    <div
                      style={{
                        border:
                          selectedIndex === index
                            ? "3px solid black"
                            : "3px solid transparent",
                      }}
                      className="p-0 w-full rounded-lg"
                    >
                      <span key={index} onClick={() => handleImageClick(index)}>
                        <Image
                          src={image}
                          alt="AdImage"
                          className="h-[100px] rounded-sm bg-opacity-40 object-cover cursor-pointer border-2 border-transparent hover:border-emerald-500"
                          width={244} // Adjust width to match the `w-36` Tailwind class
                          height={196} // Adjust height to match the `h-24` Tailwind class
                        />
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="md:h-10 md:w-10 lg:h-10 lg:w-10 ml-10 font-bold text-grey border-2 bg-[#ebf2f7] bg-opacity-80 p-2" />
              <CarouselNext className="md:h-10 md:w-10 lg:h-10 lg:w-10 mr-10 font-bold bg-[#ebf2f7] border-2 bg-opacity-80 text-grey p-2" />
            </Carousel>
          </div>
          {/* Popup for displaying all images */}
          {showPopup && (
            <div className="bg-black fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50">
              <div className="bg-black p-4 w-full flex flex-col items-center justify-center z-50">
                <button
                  onClick={togglePopup}
                  className="bg-opacity-70 rounded-full m-1 bg-black absolute top-0 right-0 focus:outline-none"
                >
                  <CloseIcon className="text-white m-0" />
                </button>
                <div className="relative flex flex-row flex-wrap justify-center">
                  <Carousel setApi={setApi3} className="w-full">
                    <CarouselContent>
                      {ad.imageUrls.map((image: string, index: number) => (
                        <CarouselItem
                          key={index}
                          className="relative flex flex-row flex-wrap justify-center"
                        >
                          <Zoom>
                            <Image
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="object-cover"
                              width={900} // Max width of the image
                              height={200} // Height of the image
                              style={{ maxWidth: "100%", marginLeft: "0%" }} // Apply additional styles as needed
                            />
                          </Zoom>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="md:h-10 md:w-10 lg:h-20 lg:w-20 ml-20 font-bold border-0 text-white bg-white bg-opacity-40 p-2" />
                    <CarouselNext className="md:h-10 md:w-10 lg:h-20 lg:w-20 mr-20 font-bold border-0 bg-white bg-opacity-40 text-white p-2" />
                  </Carousel>
                  <div className="p-1 text-center text-white text-sm text-muted-foreground z-10 mt">
                    Slide {currentSlide} of {totalSlides}
                  </div>
                </div>
                {/* Close button with CloseIcon */}
              </div>
            </div>
          )}

          {/* Ad details */}
          <div className="m-5">
            <p className="text-lg lg:text-2xl font-bold text-emerald-950">
              {ad.title}
            </p>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex gap-2">
                <p className="text-gray-500 text-[10px] lg:text-sm">
                  <AccessTimeIcon sx={{ fontSize: 20 }} />
                  Posted {formattedCreatedAt}
                </p>
                <p className="text-gray-500 text-[10px] lg:text-sm">
                  <LocationOnIcon sx={{ fontSize: 20 }} /> {ad.address}
                </p>
              </div>
              <p className="text-gray-500 text-[10px] lg:text-sm">
                <VisibilityIcon sx={{ fontSize: 20 }} /> {ad.views} Views
              </p>
            </div>
            {!videoAdId && hideAddVideo && (
              <a href={`/video/`}>
                <button className="bg-[#000000] mt-2 hover:bg-emerald-600 text-sm text-white py-1 px-4 rounded-full flex items-center">
                  <YouTubeIcon style={{ color: "red" }} />
                  Link to youtube video
                </button>
              </a>
            )}
            {videoAdId && (
              <>
                <div className="divider"></div>
                <p className="mt-5 font-bold">Video</p>
                <div className="mt-1">
                  <div>
                    <YouTubePlayer videoId={videoAdId} />
                  </div>
                </div>
              </>
            )}
            <div className="divider"></div>
            <div className="grid grid-cols-3 lg:grid-cols-5 w-full gap-1 mt-2">
              {ad.make && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">{ad.make}</div>
                  <div className="text-gray-500 text-xs">MAKE</div>
                </div>
              )}
              {ad.vehiclemodel && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehiclemodel}
                  </div>
                  <div className="text-gray-500 text-xs">MODEL</div>
                </div>
              )}
              {ad.vehicleyear && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleyear}
                  </div>
                  <div className="text-gray-500 text-xs">YEAR</div>
                </div>
              )}
              {ad.vehiclemileage && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehiclemileage}
                  </div>
                  <div className="text-gray-500 text-xs">MILAGE</div>
                </div>
              )}
              {ad.vehicleTransmissions && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleTransmissions}
                  </div>
                  <div className="text-gray-500 text-xs">TRANSMISSION</div>
                </div>
              )}
              {ad.vehicleEngineSizesCC && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleEngineSizesCC}
                  </div>
                  <div className="text-gray-500 text-xs">ENGINE SIZE</div>
                </div>
              )}
              {ad.vehicleFuelTypes && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleFuelTypes}
                  </div>
                  <div className="text-gray-500 text-xs">FUEL TYPE</div>
                </div>
              )}
              {ad.vehicleBodyTypes && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleBodyTypes}
                  </div>
                  <div className="text-gray-500 text-xs">BODY TYPE</div>
                </div>
              )}
              {ad.vehiclecolor && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehiclecolor}
                  </div>
                  <div className="text-gray-500 text-xs">BODY COLOR</div>
                </div>
              )}
              {ad.vehicleinteriorColor && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleinteriorColor}
                  </div>
                  <div className="text-gray-500 text-xs">INTERIOR COLOR</div>
                </div>
              )}
              {ad.vehicleSeats && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleSeats}
                  </div>
                  <div className="text-gray-500 text-xs">SEATS</div>
                </div>
              )}
              {ad.vehiclecondition && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehiclecondition}
                  </div>
                  <div className="text-gray-500 text-xs">CONDITION</div>
                </div>
              )}
              {ad.vehiclesecordCondition && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehiclesecordCondition}
                  </div>
                  <div className="text-gray-500 text-xs">SECORD CONDITION</div>
                </div>
              )}
              {ad.vehicleregistered && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleregistered}
                  </div>
                  <div className="text-gray-500 text-xs">REGISTERED</div>
                </div>
              )}
              {ad.vehicleexchangeposible && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehicleexchangeposible}
                  </div>
                  <div className="text-gray-500 text-xs">EXCHANGE POSSIBLE</div>
                </div>
              )}
              {ad.vehiclechassis && (
                <div className="mb-2 md:flex-row">
                  <div className="text-emerald-950 text-sm">
                    {ad.vehiclechassis}
                  </div>
                  <div className="text-gray-500 text-xs">VIN CHASSIS NO.</div>
                </div>
              )}
            </div>

            {ad.vehiclekeyfeatures.length > 0 && (
              <>
                <div className="divider"></div>
                <p className="mt-5 font-bold text-emerald-950">Key Features</p>
                <div className="grid grid-cols-3 lg:grid-cols-5 w-full gap-1 mt-1">
                  {ad.vehiclekeyfeatures.map((feature) => (
                    <>
                      <div className="flex flex-col items-center h-10 gap-2 text-[10px] lg:text-xs bg-[#ebf2f7] rounded-sm p-1 justify-center border">
                        {feature}
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
            <div className="divider"></div>
            <p className="mt-5 font-bold text-emerald-950">Description</p>
            <p className="my-1 text-text-emerald-950 text-sm lg:text-base">
              {ad.description}
            </p>

            <div className="divider"></div>
            <h1 className="mt-5 p-0 font-bold text-emerald-950 text-sm">
              Share this Ad on Social media
            </h1>
            <div className="flex items-center space-x-2">
              <FacebookShareButton url={"https://localhost/ads/" + ad._id + ""}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <RedditShareButton url={"https://localhost/ads/" + ad._id + ""}>
                <RedditIcon size={32} round />
              </RedditShareButton>
              <WhatsappShareButton url={"https://localhost/ads/" + ad._id + ""}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <LinkedinShareButton url={"https://localhost/ads/" + ad._id + ""}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <TwitterShareButton url={"https://localhost/ads/" + ad._id + ""}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <EmailShareButton url={"https://localhost/ads/" + ad._id + ""}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:w-[30%] lg:inline">
          <div className="bg-white p-5 text-l rounded-lg overflow-hidden shadow-md">
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold w-min rounded-full px-4 py-1 text-emerald-950">
                {NGnaira.format(ad.price)}
              </span>
              <div className="flex items-center">
                {ad.negotiable && (
                  <div className="flex gap-2 text-sm text-emerald-700 font-bold bg-white rounded-lg p-1 justify-center border">
                    Negotiable
                    <CheckCircleIcon sx={{ fontSize: 20 }} />
                  </div>
                )}
              </div>
            </div>
            <br />
            <span className="m-0">
              <div className="justify-between flex w-full  gap-1">
                <SignedIn>
                  <button
                    className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow"
                    onClick={handleShowPhoneClick}
                  >
                    <CallIcon sx={{ marginRight: "5px" }} />
                    {showphone ? <>{ad.phone}</> : <> Call</>}
                  </button>
                </SignedIn>
                <SignedOut>
                  <a href={`/sign-in`}>
                    <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                      <CallIcon sx={{ marginRight: "5px" }} />
                      Call
                    </button>
                  </a>
                </SignedOut>

                <SignedIn>
                  <a href={`/chat/${ad.organizer._id}`}>
                    <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                      <ChatBubbleOutlineOutlinedIcon
                        sx={{ marginRight: "5px" }}
                      />
                      Message
                    </button>
                  </a>
                </SignedIn>
                <SignedOut>
                  <a href={`/sign-in`}>
                    <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                      <ChatBubbleOutlineOutlinedIcon
                        sx={{ marginRight: "5px" }}
                      />
                      Message
                    </button>
                  </a>
                </SignedOut>

                {ad.organizer.whatsapp && (
                  <>
                    <SignedIn>
                      <a href={`https://wa.me/${ad.organizer.whatsapp}/`}>
                        <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                          <WhatsAppIcon sx={{ marginRight: "5px" }} />
                          WhatsApp
                        </button>
                      </a>
                    </SignedIn>
                    <SignedOut>
                      <a href={`/sign-in`}>
                        <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                          <WhatsAppIcon sx={{ marginRight: "5px" }} />
                          WhatsApp
                        </button>
                      </a>
                    </SignedOut>
                  </>
                )}
              </div>
            </span>
          </div>

          <br />
          <div className="bg-white p-5 text-l rounded-lg overflow-hidden shadow-md">
            <div className="">
              <p className="mt-5 font-bold">Approximate Location</p>
              <p className="text-gray-400 mb-1 text-xs lg:text-sm">
                <LocationOnIcon sx={{ fontSize: 20 }} /> {ad.address}
              </p>

              <Streetmap
                id={ad._id}
                title={ad.title}
                price={ad.price}
                imageUrls={ad.imageUrls}
                lat={ad.latitude}
                lng={ad.longitude}
              />
              <div className="justify-between flex w-full">
                <button
                  onClick={handleDirectionClick}
                  className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow"
                >
                  <AssistantDirectionIcon sx={{ marginRight: "5px" }} />
                  Get Direction
                </button>
              </div>
            </div>
          </div>

          <br />
          <div className="bg-white p-1 text-l rounded-lg overflow-hidden shadow-md">
            <div className="">
              <div className="flex flex-col">
                <SellerProfile
                  userId={ad.organizer._id}
                  loggedId={userId}
                  user={ad.organizer}
                />
              </div>
            </div>
            <br />

            <div className="justify-between flex w-full"></div>
          </div>

          <div className="bg-white p-5 text-sm mt-5 rounded-lg overflow-hidden shadow-md">
            <div className="font-bold text-lg text-center">Safety tips</div>

            <ol>
              <li>
                <div className="flex gap-2 text-xs lg:text-sm">
                  <CheckCircleIcon sx={{ fontSize: 14 }} /> Don&apos;t pay in
                  advance, including for delivery
                </div>
              </li>

              <li>
                <div className="flex gap-2 text-xs lg:text-sm">
                  <CheckCircleIcon sx={{ fontSize: 14 }} /> Meet the seller at a
                  safe public place
                </div>
              </li>

              <li>
                <div className="flex gap-2 text-xs lg:text-sm">
                  <CheckCircleIcon sx={{ fontSize: 14 }} /> Inspect the item and
                  ensure its exactly what you want
                </div>
              </li>

              <li>
                <div className="flex gap-2 text-xs lg:text-sm">
                  <CheckCircleIcon sx={{ fontSize: 14 }} /> On delivery, check
                  that the item delivered is what was inspected
                </div>
              </li>

              <li>
                <div className="flex gap-2 text-xs lg:text-sm">
                  <CheckCircleIcon sx={{ fontSize: 14 }} /> Only pay when youre
                  satisfied
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <FloatingChatIcon onClick={toggleChat} isOpen={false} />
      <ChatWindow
        isOpen={isChatOpen}
        onClose={toggleChat}
        recipientUid={""}
        senderId={""}
        senderName={""}
        senderImage={""}
      />
    </>
  );
}
