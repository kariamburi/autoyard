"use client";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faTiktok,
  faChrome,
} from "@fortawesome/free-brands-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CreateUserParams } from "@/types";
import Ratings from "./ratings";
import Streetmap from "./Streetmap";
import Link from "next/link";
import StreetmapOfice from "./StreetmapOffice";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { format, isToday, isYesterday } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import Share from "./Share";
import { v4 as uuidv4 } from "uuid";
import { createTransaction } from "@/lib/actions/transactionstatus";
import { getVerfiesfee } from "@/lib/actions/verifies.actions";
import Verification from "./Verification";
import { IUser } from "@/lib/database/models/user.model";
import Image from "next/image";
type CollectionProps = {
  userId: string;
  loggedId: string;
  user: any;
};

const SellerProfile = ({ userId, loggedId, user }: CollectionProps) => {
  const [activationfee, setactivationfee] = useState(500);
  const [showphone, setshowphone] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === "/shop/" + userId;
  const isActiveReviews = pathname === "/reviews/" + userId;
  const router = useRouter();
  const isAdCreator = userId === loggedId;
  const handleShowPhoneClick = (e: any) => {
    setshowphone(true);
    window.location.href = `tel:${user.phone}`;
  };
  // console.log(user);
  const handleDirectionClick = () => {
    // Perform navigation or other actions when direction button is clicked
    // Example: Open a new tab with Google Maps directions
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${user.latitude},${user.longitude}`,
      "_blank"
    );
  };

  let formattedCreatedAt = "";
  try {
    const createdAtDate = new Date(user?.verified[0]?.verifieddate); // Convert seconds to milliseconds

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
    <div className="flex bg-white flex-col m-1 lg:m-0 items-center min-w-[300px] lg:max-w-[350px]">
      <div className="flex flex-col items-center rounded-t-lg w-full p-1 bg-emerald-700">
        <Link href={`/shop/${userId}`} className="no-underline font-bold m-1">
          <div className="w-16 h-16 p-1 rounded-full bg-white">
            <Image
              className="w-full h-full rounded-full object-cover"
              src={user.photo}
              alt="Profile Image"
              width={200}
              height={200}
            />
          </div>
        </Link>
        <Link href={`/shop/${userId}`} className="no-underline font-boldm-1">
          <p className="p-medium-14 md:p-medium-16 text-white">
            {user.firstName} {user.lastName}
          </p>
        </Link>
        {isActive === false && (
          <Link href={`/shop/${userId}`} className="no-underline font-boldm-1">
            <p className="p-medium-14 md:p-medium-16 text-emerald-100 hover:text-white hover:underline">
              View Seller Shop
            </p>
          </Link>
        )}
        <Verification user={user} userId={userId} isAdCreator={isAdCreator} />
      </div>
      <div className="divider"></div>
      {userId === loggedId && (
        <div className="flex justify-between w-full p-1 items-center">
          <div>
            {" "}
            <a href={`/settings/`}>
              <button className="p-1 gap-1 text-xs text-emerald-900 rounded-full bg-white ring-1 ring-emerald-900 hover:bg-emerald-100">
                <SettingsIcon sx={{ fontSize: 14 }} />
                Settings
              </button>
            </a>
          </div>
          <Share userId={userId} />
        </div>
      )}
      <Ratings recipientUid={userId} />
      {isActiveReviews === false && (
        <>
          <div className="divider"></div>
          <div className="">
            <h1 className="mt-5 p-0 font-bold">About Seller</h1>
          </div>
          <div className="flex w-full gap-5 p-1 bg-gray-100 rounded-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <p className="text-xs lg:text-sm">Show More...</p>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-0 rounded-[20px] m-2 shadow bg-white">
                    {user.imageUrl && (
                      <div className="flex h-50 w-full flex-1 justify-center">
                        <Image
                          src={user.imageUrl}
                          alt="image"
                          className="object-center rounded-t-[20px]"
                          width={900}
                          height={500}
                        />
                      </div>
                    )}
                    <div className="m-3 p-1">
                      <div className="mb-5 md:flex-row">
                        <div className="font-bold text-xs lg:text-sm">
                          Business Name
                        </div>
                        <div className="lg:text-xs text-[10px]">
                          {user.businessname}
                        </div>
                      </div>

                      <div className="mb-5 md:flex-row">
                        <div className="font-bold text-xs lg:text-sm">
                          About Business
                        </div>
                        <div className="lg:text-xs text-[10px]">
                          {user.aboutbusiness}
                        </div>
                      </div>

                      <div className="mb-5 md:flex-row">
                        <div className="font-bold text-xs lg:text-sm">
                          Business Address
                        </div>
                        <div className="lg:text-xs text-[10px]">
                          {user.businessaddress}
                        </div>
                      </div>
                      {user.latitude && user.latitude && (
                        <>
                          <div className="bg-white p-0 text-l rounded-lg overflow-hidden">
                            <div className="">
                              <p className="text-xs lg:text-sm font-bold">
                                Office Location
                              </p>
                              <p className="mb-1 lg:text-xs text-[10px]">
                                <LocationOnIcon sx={{ fontSize: 20 }} /> GPS
                                Location
                              </p>
                              <StreetmapOfice
                                id={userId}
                                name={user.businessname}
                                address={user.businessaddress}
                                imageUrl={user.imageUrl ?? user.photo}
                                lat={user.latitude}
                                lng={user.longitude}
                              />
                              <div className="justify-between flex w-full mb-5">
                                <button
                                  onClick={handleDirectionClick}
                                  className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow"
                                >
                                  <AssistantDirectionIcon
                                    sx={{ marginRight: "5px" }}
                                  />
                                  Get Direction
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {user.businesshours && user.businesshours.length > 0 && (
                        <>
                          <div className="flex flex-col gap-5 mb-0 md:flex-row">
                            <div>
                              <>
                                <div className="flex flex-col gap-5 mb-0 md:flex-row">
                                  <div>
                                    <label>
                                      <p className="font-bold text-xs lg:text-sm">
                                        Office Open Time:
                                      </p>
                                    </label>
                                    <div className="flex flex-col gap-5 mb-5 md:flex-row text-[10px] lg:text-xs">
                                      <select
                                        className="bg-gray-100 p-1 border rounded-sm"
                                        value={
                                          user?.businesshours[0].openHour ?? ""
                                        }
                                      >
                                        {Array.from(
                                          { length: 24 },
                                          (_, i) => i
                                        ).map((hour) => (
                                          <option
                                            key={hour}
                                            value={hour
                                              .toString()
                                              .padStart(2, "0")}
                                          >
                                            {hour.toString().padStart(2, "0")}
                                          </option>
                                        ))}
                                      </select>
                                      <select
                                        className="bg-gray-100 p-1 border rounded-sm"
                                        value={
                                          user?.businesshours[0].openMinute ??
                                          ""
                                        }
                                      >
                                        {Array.from(
                                          { length: 60 },
                                          (_, i) => i
                                        ).map((minute) => (
                                          <option
                                            key={minute}
                                            value={minute
                                              .toString()
                                              .padStart(2, "0")}
                                          >
                                            {minute.toString().padStart(2, "0")}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div>
                                    <label>
                                      {" "}
                                      <p className="font-bold text-xs lg:text-sm">
                                        Office Close Time:
                                      </p>
                                    </label>
                                    <div className="flex flex-col gap-5 mb-0 md:flex-row text-[10px] lg:text-xs">
                                      <select
                                        className="bg-gray-100 p-1 border rounded-sm"
                                        value={
                                          user?.businesshours[0].closeHour ?? ""
                                        }
                                      >
                                        {Array.from(
                                          { length: 24 },
                                          (_, i) => i
                                        ).map((hour) => (
                                          <option
                                            key={hour}
                                            value={hour
                                              .toString()
                                              .padStart(2, "0")}
                                          >
                                            {hour.toString().padStart(2, "0")}
                                          </option>
                                        ))}
                                      </select>
                                      <select
                                        className="bg-gray-100 p-1 border rounded-sm"
                                        value={
                                          user?.businesshours[0].closeMinute ??
                                          ""
                                        }
                                      >
                                        {Array.from(
                                          { length: 60 },
                                          (_, i) => i
                                        ).map((minute) => (
                                          <option
                                            key={minute}
                                            value={minute
                                              .toString()
                                              .padStart(2, "0")}
                                          >
                                            {minute.toString().padStart(2, "0")}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex flex-col gap-5 mb-5 md:flex-row">
                        <div>
                          <label>
                            <p className="font-bold text-xs lg:text-sm">
                              Office Working Days:
                            </p>
                          </label>

                          <>
                            <div className="flex text-[10px] gap-1 w-full items-center lg:text-xs">
                              <input
                                type="checkbox"
                                checked={user?.businessworkingdays.includes(
                                  "Sunday"
                                )}
                              />

                              <label>Sunday</label>
                            </div>
                            <div className="flex text-[10px] gap-1 w-full items-center lg:text-xs">
                              <input
                                type="checkbox"
                                checked={user?.businessworkingdays.includes(
                                  "Monday"
                                )}
                              />
                              <label>Monday</label>
                            </div>
                            <div className="flex text-[10px] gap-1 w-full items-center lg:text-xs">
                              <input
                                type="checkbox"
                                checked={user?.businessworkingdays.includes(
                                  "Tuesday"
                                )}
                              />
                              <label>Tuesday</label>
                            </div>
                            <div className="flex text-[10px] gap-1 w-full items-center lg:text-xs">
                              <input
                                type="checkbox"
                                checked={user?.businessworkingdays.includes(
                                  "Wednesday"
                                )}
                              />
                              <label>Wednesday</label>
                            </div>
                            <div className="flex text-[10px] gap-1 w-full items-center lg:text-xs">
                              <input
                                type="checkbox"
                                checked={user?.businessworkingdays.includes(
                                  "Thursday"
                                )}
                              />
                              <label>Thursday</label>
                            </div>
                            <div className="flex text-[10px] gap-1 w-full items-center lg:text-xs">
                              <input
                                type="checkbox"
                                checked={user?.businessworkingdays.includes(
                                  "Friday"
                                )}
                              />
                              <label>Friday</label>
                            </div>
                            <div className="flex text-[10px] gap-1 w-full items-center lg:text-xs">
                              <input
                                type="checkbox"
                                checked={user?.businessworkingdays.includes(
                                  "Saturday"
                                )}
                              />
                              <label>Saturday</label>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="divider"></div>
          <div className="">
            <h1 className="mt-5 p-0 font-bold">Seller contacts</h1>
          </div>
          <div className="justify-center flex w-full gap-1 p-0">
            {user.phone && (
              <>
                <SignedIn>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow"
                          onClick={handleShowPhoneClick}
                        >
                          <CallIcon sx={{ marginRight: "5px" }} />
                          {showphone ? <>{user.phone}</> : <> Call</>}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Call</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SignedIn>
                <SignedOut>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href={`/sign-in`}>
                          <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                            <CallIcon sx={{ marginRight: "5px" }} />
                            Call
                          </button>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Call</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SignedOut>
              </>
            )}
            <SignedIn>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={`/chat/${userId}`}>
                      <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                        <ChatBubbleOutlineOutlinedIcon
                          sx={{ marginRight: "5px" }}
                        />
                        Message
                      </button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wheels Chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SignedIn>
            <SignedOut>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={`/sign-in`}>
                      <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                        <ChatBubbleOutlineOutlinedIcon
                          sx={{ marginRight: "5px" }}
                        />
                        Message
                      </button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wheels Chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SignedOut>

            {user.whatsapp && (
              <>
                {" "}
                <SignedIn>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href={`https://wa.me/${user.whatsapp}/`}>
                          <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                            <WhatsAppIcon sx={{ marginRight: "5px" }} />
                            WhatsApp
                          </button>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Whatsapp</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SignedIn>
                <SignedOut>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href={`/sign-in`}>
                          <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                            <WhatsAppIcon sx={{ marginRight: "5px" }} />
                            WhatsApp
                          </button>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Whatsapp</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SignedOut>
              </>
            )}
          </div>
          <div className="divider"></div>
          <div className="">
            <h1 className="mt-5 p-0 font-bold">Seller Social media</h1>
          </div>
          <div className="flex space-x-2">
            <div className="ml-1 justify-center gap-5 w-full">
              {user.whatsapp && (
                <Link
                  href={`${user.facebook}`}
                  className="no-underline font-boldm-1 mr-2"
                >
                  <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
                </Link>
              )}

              {user.twitter && (
                <Link
                  href={`${user.twitter}`}
                  className="no-underline font-boldm-1 mr-2"
                >
                  <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
                </Link>
              )}

              {user.instagram && (
                <Link
                  href={`${user.instagram}`}
                  className="no-underline font-boldm-1 mr-2"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                </Link>
              )}
              {user.tiktok && (
                <Link
                  href={`${user.tiktok}`}
                  className="no-underline font-boldm-1 mr-2"
                >
                  <FontAwesomeIcon icon={faTiktok} className="text-2xl" />
                </Link>
              )}

              {user.website && (
                <Link
                  href={`${user.website}`}
                  className="no-underline font-boldm-1 mr-2"
                >
                  <FontAwesomeIcon icon={faChrome} className="text-2xl" />
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SellerProfile;
