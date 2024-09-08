// components/Chat.js
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Image from "next/image";
import { getUserById } from "@/lib/actions/user.actions";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SellerProfile from "@/components/shared/SellerProfile";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Sidebar from "@/components/shared/Sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import Footersub from "@/components/shared/Footersub";
import BottomNavigation from "@/components/shared/BottomNavigation";
const pagechat = async () => {
  const { sessionClaims } = auth();
  const senderId = sessionClaims?.userId as string;
  const user = await getUserById(senderId);

  const senderName = sessionClaims?.userName as string;
  //  const userEmail = sessionClaims?.userEmail as string;
  const senderImage = sessionClaims?.userImage as string;
  const recipientUid = senderId;
  // console.log(senderId);
  if (!user) {
    return (
      <div className="flex-center h-screen w-full bg-[#ebf2f7] bg-dotted-pattern bg-cover bg-fixed bg-center">
        <div className="top-0 z-10 fixed w-full">
          <Navbar userstatus="User" userId={recipientUid || ""} />
        </div>
        <div className="max-w-6xl mx-auto mt-20">
          <div className="flex gap-1 items-center">
            <Image
              src="/assets/icons/loading.gif"
              alt="edit"
              width={60}
              height={60}
            />
            Loading...
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="fixed z-10 top-0 w-full">
        <Navbar userstatus="User" userId={recipientUid} />
      </div>
      <div className="max-w-6xl mx-auto flex mt-20 mb-0 p-1">
        <div className="hidden lg:inline mr-5">
          <div className="bg-white w-full rounded-lg p-1">
            <SellerProfile
              user={user}
              loggedId={senderId}
              userId={recipientUid}
            />
          </div>
        </div>

        <div className="flex-1">
          {/*   <div className="bg-white p-1 rounded-lg lg:hidden">
            <SellerProfile
              user={user}
              loggedId={senderId}
              userId={recipientUid}
            />
          </div>*/}
          <div className="rounded-lg mb-20 lg:mb-0 max-w-6xl mx-auto flex flex-col p-0 mt-0">
            <div className="lg:flex-1 p-0 ml-0 mr-0">
              <ScrollArea className="max-h-[400px] p-2">
                <div className="w-full w-full bg-white rounded-lg items-center">
                  <span className="logo font-bold text-[25px] text-emerald-950">
                    Messanger
                  </span>
                  <div className="flex gap-1 items-center">
                    <PeopleOutlinedIcon />
                    Latest Chats
                  </div>
                </div>
                <Sidebar userId={senderId} />
              </ScrollArea>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="hidden lg:inline">
          <Footersub />
        </div>
        <div className="lg:hidden">
          <BottomNavigation userId={senderId} />
        </div>
      </footer>
    </>
  );
};

export default pagechat;
