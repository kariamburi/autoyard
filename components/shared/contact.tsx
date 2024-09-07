"use client";
import { IAd } from "@/lib/database/models/ad.model";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React, { useState } from "react";
import ChatButton from "./ChatButton ";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Link from "next/link";
import Verification from "./Verification";
import Image from "next/image";
import SellerProfileMobile from "./SellerProfileMobile";
import Verificationmobile from "./Verificationmobile";
import Ratingsmobile from "./ratingsmobile";
type chatProps = {
  userId: string;
  userName: string;
  userImage: string;
  ad: IAd;
};
const Contact = ({ ad, userId, userName, userImage }: chatProps) => {
  const [showphone, setshowphone] = useState(false);
  const handleShowPhoneClick = (e: any) => {
    setshowphone(true);
    window.location.href = `tel:${ad.phone}`;
  };
  const isAdCreator = userId === ad.organizer._id;
  return (
    <div className="w-full">
      <div className="lg:hidden justify-between flex w-full gap-1">
        <Verificationmobile
          user={ad.organizer}
          userId={userId}
          isAdCreator={isAdCreator}
        />
        <Ratingsmobile recipientUid={userId} />
      </div>
      <div className="justify-between lg:justify-end flex w-full gap-1">
        <div className="lg:hidden flex gap-1 items-center p-1 w-full">
          <SellerProfileMobile
            userId={userId}
            ad={ad}
            userName={userName}
            userImage={userImage}
          />
        </div>
        <div className="flex gap-1 items-center p-1 lg:mr-10">
          <SignedIn>
            <button
              className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow"
              onClick={handleShowPhoneClick}
            >
              <CallIcon sx={{ marginRight: "5px" }} />
              {showphone ? (
                <>{ad.phone}</>
              ) : (
                <>
                  {" "}
                  <div className="hidden lg:inline">Call</div>
                </>
              )}
            </button>
          </SignedIn>
          <SignedOut>
            <a href={`/sign-in`}>
              <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                <CallIcon sx={{ marginRight: "5px" }} />
                <div className="hidden lg:inline">Call</div>
              </button>
            </a>
          </SignedOut>

          <SignedIn>
            <ChatButton
              ad={ad}
              userId={userId}
              userImage={userImage}
              userName={userName}
            />
          </SignedIn>
          <SignedOut>
            <a href={`/sign-in`}>
              <button className="flex gap-1 hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: "5px" }} />
                <div className="hidden lg:inline">Message</div>
              </button>
            </a>
          </SignedOut>

          {ad.organizer.whatsapp && (
            <>
              <SignedIn>
                <a href={`https://wa.me/${ad.organizer.whatsapp}/`}>
                  <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                    <WhatsAppIcon sx={{ marginRight: "5px" }} />

                    <div className="hidden lg:inline">WhatsApp</div>
                  </button>
                </a>
              </SignedIn>
              <SignedOut>
                <a href={`/sign-in`}>
                  <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow">
                    <WhatsAppIcon sx={{ marginRight: "5px" }} />

                    <div className="hidden lg:inline">WhatsApp</div>
                  </button>
                </a>
              </SignedOut>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
