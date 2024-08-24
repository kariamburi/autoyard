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
const Sidebar = dynamic(() => import("@/components/shared/Sidebar"), {
  ssr: false,
  loading: () => (
    <div className="w-full">
      <div className="flex w-full flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={30}
          className="rounded-sm w-full"
        />
      </div>
    </div>
  ),
});
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
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 top-0 z-10 fixed w-full">
          <div className="p-3">
            <Navbar userstatus="User" userId={recipientUid || ""} />
          </div>
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
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 fixed z-10 top-0 w-full">
        <div className="p-3">
          <Navbar userstatus="User" userId={recipientUid} />
        </div>
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
          <div className="bg-white p-1 rounded-lg lg:hidden">
            <SellerProfile
              user={user}
              loggedId={senderId}
              userId={recipientUid}
            />
          </div>
          <div className="rounded-lg max-w-6xl mx-auto flex flex-col p-0 mt-0">
            <div className="lg:flex-1 p-0 ml-0 mr-0">
              <ScrollArea className="max-h-[400px] w-full bg-white rounded-md border p-4">
                <div className="w-full items-center justify-center">
                  <span className="logo h3-bold text-emerald-950">
                    Messages
                  </span>
                  <p className=" text-center sm:text-left">Latest chats</p>
                </div>
                <Sidebar userId={senderId} />
              </ScrollArea>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default pagechat;
