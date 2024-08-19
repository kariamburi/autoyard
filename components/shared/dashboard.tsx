"use client";
import NavItems from "@/components/shared/NavItems";

import EventForm from "@/components/shared/EventForm";
import { Separator } from "@radix-ui/react-separator";
import NavItemsMobile from "./NavItemsMobile";
import { IAd } from "@/lib/database/models/ad.model";
import { Button } from "../ui/button";
import Link from "next/link";
type Package = {
  imageUrl: string;
  name: string;
  _id: string;
  description: string;
  price: string[];
  features: string[];
  color: string;
};
type dashboardProps = {
  userId: string;
  planId: string;
  daysRemaining: number;
  packname: string;
  userName: string;
  type: string;
  ad?: IAd;
  adId?: string;
  packagesList: Package[];
  listed: number;
  priority: number;
  expirationDate: Date;
  adstatus: string;
};
const dashboard = ({
  userId,
  planId,
  packname,
  userName,
  daysRemaining,
  type,
  ad,
  adId,
  packagesList,
  listed,
  priority,
  expirationDate,
  adstatus,
}: dashboardProps) => {
  return (
    <>
      <div className="max-w-6xl mx-auto flex mt-3 p-1">
        {/*  <div className="hidden lg:inline mr-5">
          <div className="bg-white w-full rounded-lg p-3">
            <NavItems userstatus="User" userId={userId} />
          </div>
        </div>  */}

        <div className="flex-1">
          {/*  <div className="bg-white rounded-lg lg:hidden">
            <div className="">
              <NavItemsMobile userstatus="User" userId={userId} />
            </div>
          </div>
          */}
          <div className="rounded-lg max-w-6xl mx-auto lg:flex-row mt-0 p-1 justify-center">
            <EventForm
              userId={userId}
              type={type}
              ad={ad}
              adId={adId}
              planId={planId}
              userName={userName}
              daysRemaining={daysRemaining}
              packname={packname}
              packagesList={packagesList}
              listed={listed}
              priority={priority}
              expirationDate={expirationDate}
              adstatus={adstatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
