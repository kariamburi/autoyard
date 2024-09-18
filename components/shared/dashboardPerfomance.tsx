"use client";
import { IAd } from "@/lib/database/models/ad.model";
import { CreateUserParams } from "@/types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import CollectionBookmark from "./CollectionBookmark";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { IUser } from "@/lib/database/models/user.model";
import Link from "next/link";

type CollectionProps = {
  userId: string;
  loggedId: string;
  daysRemaining?: number;
  packname?: string;
  color: string;
  data: IAd[];
  user: IUser;
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  isAdCreator: boolean;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const DashboardPerformance = ({
  userId,
  data,
  packname,
  daysRemaining,
  color,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  isAdCreator,
  user,
  loggedId,
}: // Accept the onSortChange prop
CollectionProps) => {
  const [activeButton, setActiveButton] = useState(0);
  const [isVertical, setisVertical] = useState(true);

  return (
    <>
      <div className="container mx-auto p-6">
        <section className="bg-grey-50 bg-dotted-pattern bg-cover bg-center py-0 md:py-0 rounded-sm">
          <div className="flex items-center p-1 justify-between">
            <h1 className="text-3xl font-bold mb-6">Ad Performance</h1>

            {isAdCreator &&
              packname !== "Free" &&
              daysRemaining &&
              daysRemaining > 0 && (
                <>
                  <div
                    style={{
                      backgroundColor: color,
                    }}
                    className="text-center sm:text-left rounded-lg p-3 text-white relative"
                  >
                    <div className="flex flex-col">
                      <div className="font-bold text-sm mt-4">
                        Plan: {packname}
                      </div>
                      <div className="text-xs">
                        Days remaining: {daysRemaining}
                      </div>
                    </div>
                    {/* Green ribbon */}
                    <div className="absolute top-0 shadow-lg left-0 bg-green-500 text-white text-xs py-1 px-3 rounded-bl-lg rounded-tr-lg">
                      Active
                    </div>
                    <Link href="/plan">
                      <div className="p-1 items-center flex flex-block text-black underline text-xs cursor-pointer border-2 border-transparent rounded-full hover:bg-[#000000]  hover:text-white">
                        <div>Upgrade Plan</div>
                      </div>
                    </Link>
                  </div>
                </>
              )}
          </div>
        </section>

        {data.length > 0 ? (
          data.map((ad: any) => (
            <div
              key={ad._id}
              className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
            >
              {/* 1. Ad Details */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Ad Details</h2>
                <p className="text-gray-700">
                  <strong>Title: </strong> {ad.title}
                </p>
                <p className="text-gray-700">
                  <strong>Category: </strong> {ad.category?.name || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Created Date: </strong>{" "}
                  {new Date(ad.createdAt).toLocaleDateString()}
                </p>
              </section>

              {/* 2. Ad Engagement */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Ad Engagement</h2>
                <p className="text-gray-700">
                  <strong>Views: </strong> {ad.views}
                </p>
                <p className="text-gray-700">
                  <strong>Inquiries: </strong> {ad.inquiries || "0"}
                </p>
                <p className="text-gray-700">
                  <strong>Calls: </strong> {ad.calls || "0"}
                </p>
                <p className="text-gray-700">
                  <strong>WhatsApp Messages: </strong> {ad.whatsapp || "0"}
                </p>
              </section>

              {/* 3. Ad Duration & Status */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Ad Duration & Status
                </h2>
                <p className="text-gray-700">
                  <strong>Ad Expiry: </strong>{" "}
                  {new Date(ad.expirely).toLocaleDateString()}
                </p>
                <p
                  className={`text-gray-700 ${
                    ad.adstatus === "active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <strong>Status: </strong>{" "}
                  {ad.adstatus === "active" ? "Active" : "Expired"}
                </p>
              </section>

              {/* 4. Ad Performance */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Ad Performance</h2>
                <p className="text-gray-700">
                  <strong>Priority Level: </strong> {ad.priority || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Plan: </strong> {ad.plan?.name || "Free"}
                </p>
              </section>

              {/* 5. Contact Info */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
                <p className="text-gray-700">
                  <strong>Phone Number: </strong> {ad.phone || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>WhatsApp: </strong> {ad.organizer?.whatsapp || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Verified Status: </strong>{" "}
                  {ad.organizer?.verified?.accountverified
                    ? "Verified"
                    : "Not Verified"}
                </p>
              </section>

              {/* 6. Geographical Info */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Geographical Info
                </h2>
                <p className="text-gray-700">
                  <strong>Location: </strong> {ad.address || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Map Enabled: </strong> {ad.enableMap ? "Yes" : "No"}
                </p>
              </section>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No ads to display.</p>
        )}
      </div>
    </>
  );
};

export default DashboardPerformance;
