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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IAd } from "@/lib/database/models/ad.model";
import Ratingsmobile from "./ratingsmobile";
import Verificationmobile from "./Verificationmobile";
type chatProps = {
  userId: string;
  userName: string;
  userImage: string;
  ad: IAd;
};
const SellerProfileMobile = ({
  ad,
  userId,
  userName,
  userImage,
}: chatProps) => {
  const [activationfee, setactivationfee] = useState(500);
  const [showphone, setshowphone] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === "/shop/" + userId;
  const isActiveReviews = pathname === "/reviews/" + userId;
  const router = useRouter();
  const isAdCreator = userId === ad.organizer._id;

  let formattedCreatedAt = "";
  try {
    const createdAtDate = new Date(ad.organizer?.verified[0]?.verifieddate); // Convert seconds to milliseconds

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
    <div className="flex gap-1 items-center">
      <div className="lg:hidden flex gap-1 items-center p-1 w-full">
        <Link
          href={`/shop/${ad.organizer._id}`}
          className="no-underline font-bold m-1"
        >
          <div className="w-10 h-10 rounded-full bg-white">
            <Image
              className="w-full h-w-full rounded-full object-cover"
              src={ad.organizer.photo ?? "/avator.png"}
              alt="Avator"
              width={200}
              height={200}
            />
          </div>
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/shop/${ad.organizer._id}`}
            className="no-underline font-boldm-1"
          >
            <p className="ml-2 text-xs font-bold">
              {ad.organizer.firstName} {ad.organizer.lastName}
            </p>
          </Link>

          <Link
            href={`/shop/${ad.organizer._id}`}
            className="no-underline font-boldm-1"
          >
            <p className="ml-2 text-xs text-emerald-500 hover:text-emerald-950 hover:underline">
              View Seller Shop
            </p>
          </Link>
        </div>
      </div>
      {/* <Ratingsmobile recipientUid={userId} />*/}
    </div>
  );
};

export default SellerProfileMobile;