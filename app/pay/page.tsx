// components/Chat.js

import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import {
  getallTransaction,
  getpayTransaction,
} from "@/lib/actions/transactionstatus";

import DashboardPay from "@/components/shared/dashboardPay";
import DashboardHistory from "@/components/shared/dashboardHistory";
type payProps = {
  params: {
    id: string;
  };
};
const Pay = async ({ params: { id } }: payProps) => {
  //  const trans = await getpayTransaction(id);
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const alltrans = await getallTransaction(userId);
  const userName = sessionClaims?.userName as string;
  //  const userEmail = sessionClaims?.userEmail as string;
  const userImage = sessionClaims?.userImage as string;
  const recipientUid = id;

  //console.log(alltrans);
  if (!alltrans) {
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
        <div className="">
          <Navbar userstatus="User" userId={recipientUid || ""} />
        </div>
      </div>
      <div className="max-w-8xl mx-auto flex mt-20 mb-0 p-1">
        <DashboardHistory userId={userId} alltrans={alltrans} />
      </div>
    </>
  );
};

export default Pay;
