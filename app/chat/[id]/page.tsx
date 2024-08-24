// components/Chat.js
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Image from "next/image";
import NavbarChats from "@/components/shared/NavbarChats";
import { getUserById } from "@/lib/actions/user.actions";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
          className="rounded-sm w-full"
        />
      </div>
    </div>
  ),
});
const SendMessage = dynamic(() => import("@/components/shared/SendMessage"), {
  ssr: false,
  loading: () => (
    <div className="w-full">
      <div className="flex w-full flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="rounded-sm w-full"
        />
      </div>
    </div>
  ),
});
const ChatBox = dynamic(() => import("@/components/shared/ChatBox"), {
  ssr: false,
  loading: () => (
    <div className="w-full">
      <div className="flex w-full flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="rounded-sm w-full"
        />
      </div>
    </div>
  ),
});
type chatProps = {
  params: {
    id: string;
  };
};

const pagechat = async ({ params: { id } }: chatProps) => {
  // const user = await getUserById(id);
  const user = await getUserById(id);
  const { sessionClaims } = auth();
  const senderId = sessionClaims?.userId as string;
  const senderName = sessionClaims?.userName as string;
  //  const userEmail = sessionClaims?.userEmail as string;
  const senderImage = sessionClaims?.userImage as string;
  const recipientUid = id;
  // console.log(senderId);
  if (!user) {
    return (
      <div className="flex-center h-screen w-full bg-[#ebf2f7] bg-dotted-pattern bg-cover bg-fixed bg-center">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 top-0 z-10 fixed w-full">
          <div className="p-2">
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
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 fixed z-0 top-0 w-full">
        <div className="p-2">
          <NavbarChats recipient={user} userId={recipientUid} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex mt-20 mb-0 p-1">
        <div className="hidden lg:inline mr-5">
          <div className="bg-white w-full rounded-lg p-0">
            <ScrollArea className="max-h-[400px] w-full bg-white rounded-md border p-4">
              <div className="w-full items-center justify-center">
                <span className="logo h3-bold text-emerald-950">
                  Offerup Chat
                </span>
                <p className=" text-center sm:text-left">Latest chats</p>
              </div>
              <Sidebar userId={senderId} />
            </ScrollArea>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg lg:hidden">
            <ScrollArea className="max-h-[400px] w-full bg-white rounded-md border p-4 mb-2 mt-10 lg:mt-10">
              <div className="w-full items-center justify-center">
                <span className="logo h3-bold text-emerald-950">
                  Offerup Chat
                </span>
                <p className=" text-center sm:text-left">Latest chats</p>
              </div>
              <Sidebar userId={senderId} />
            </ScrollArea>
          </div>
          <div className="rounded-lg max-w-6xl mx-auto flex flex-col p-0 mt-0">
            <div className="lg:flex-1 p-0 ml-0 mr-0">
              <ChatBox
                displayName={senderName}
                uid={senderId}
                photoURL={senderImage}
                recipientUid={recipientUid}
                recipient={user}
                client={false}
              />

              <SendMessage
                displayName={senderName}
                uid={senderId}
                photoURL={senderImage}
                recipientUid={recipientUid}
                client={false}
              />
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default pagechat;
