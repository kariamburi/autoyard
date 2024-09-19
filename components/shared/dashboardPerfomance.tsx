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
import SellerProfileMobile from "./SellerProfileMobile";
import Verification from "./Verification";
import Ratingsmobile from "./ratingsmobile";
import SellerProfilePermonance from "./SellerProfilePermonance";
import Verificationmobile from "./Verificationmobile";
import { DeleteConfirmation } from "./DeleteConfirmation";
import Image from "next/image";
type CollectionProps = {
  userId: string;
  userName: string;
  userImage: string;
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
  userName,
  userImage,
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
      <div className="w-full lg:max-w-6xl mx-auto p-6">
        <section className="bg-grey-50 bg-dotted-pattern bg-cover bg-center py-0 md:py-0 rounded-sm">
          <div className="flex items-center p-1 justify-between">
            <div className="flex flex-col">
              <SellerProfilePermonance
                userId={userId}
                userName={userName}
                userImage={userImage}
                user={user}
              />
            </div>

            {isAdCreator &&
            packname !== "Free" &&
            daysRemaining &&
            daysRemaining > 0 ? (
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
            ) : (
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
        <h1 className="text-3xl font-bold mb-6">Ad Performance</h1>

        {data.length > 0 ? (
          data.map((ad: any) => (
            <div
              key={ad._id}
              className="flex gap-1 bg-white shadow-lg rounded-lg overflow-hidden mb-6 border border-gray-200"
            >
              {/* Ad Image */}
              <img
                src={ad.imageUrls[0] || "/default-ad-image.jpg"}
                alt={ad.title}
                className="w-20 lg:w-64 h-64 object-cover"
              />

              <div className="p-2 grid grid-cols-3">
                {/* 1. Ad Details */}
                <section className="mb-3 bg-gray-50 p-1 raounded-lg">
                  <h2 className="font-semibold mb-2 text-gray-800">
                    Ad Details
                  </h2>
                  <p className="text-gray-700 text-sm">
                    <strong>Title: </strong> {ad.title}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Category: </strong> {ad.category?.name || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Created Date: </strong>{" "}
                    {new Date(ad.createdAt).toLocaleDateString()}
                  </p>
                </section>

                {/* 2. Ad Engagement */}
                <section className="mb-3 bg-gray-50 p-1 raounded-lg">
                  <h2 className="font-semibold mb-2 text-gray-800">
                    Ad Engagement
                  </h2>

                  <p className="text-gray-700 text-sm">
                    <strong>Views: </strong> {ad.views}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Inquiries: </strong> {ad.inquiries || "0"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Calls: </strong> {ad.calls || "0"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>WhatsApp: </strong> {ad.whatsapp || "0"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Share: </strong> {ad.shared || "0"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Liked / Bookmarked: </strong> {ad.bookmarked || "0"}
                  </p>
                </section>

                {/* 3. Ad Duration & Status */}
                <section className="mb-3 bg-gray-50 p-1 raounded-lg">
                  <h2 className="font-semibold mb-2 text-gray-800">
                    Ad Duration & Status
                  </h2>
                  <p className="text-gray-700 text-sm">
                    <strong>Ad Expiry: </strong>{" "}
                    {new Date(ad.expirely).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-gray-700 text-sm ${
                      ad.adstatus === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <strong>Status: </strong>{" "}
                    {ad.adstatus === "active" ? "Active" : "Expired"}
                  </p>
                </section>

                {/* 4. Ad Performance */}
                <section className="mb-3 bg-gray-50 p-1 raounded-lg">
                  <h2 className="font-semibold mb-2 text-gray-800">
                    Ad Performance
                  </h2>
                  <p className="text-gray-700 text-sm">
                    <strong>Priority Level: </strong> {ad.priority || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Plan: </strong> {ad.plan?.name || "Free"}
                  </p>
                </section>

                {/* 5. Contact Info */}
                <section className="mb-3 bg-gray-50 p-1 raounded-lg">
                  <h2 className="font-semibold mb-2 text-gray-800">
                    Contact Info
                  </h2>
                  <p className="text-gray-700 text-sm">
                    <strong>Phone Number: </strong> {ad.phone || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>WhatsApp: </strong>{" "}
                    {ad.organizer?.whatsapp || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Verified Status: </strong>{" "}
                    {ad.organizer?.verified?.accountverified
                      ? "Verified"
                      : "Not Verified"}
                  </p>
                </section>

                {/* 6. Geographical Info */}
                <section className="mb-3 bg-gray-50 p-1 raounded-lg">
                  <h2 className="font-semibold mb-2 text-gray-800">
                    Geographical Info
                  </h2>
                  <p className="text-gray-700 text-sm">
                    <strong>Location: </strong> {ad.address || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm text-sm">
                    <strong>Map Enabled: </strong> {"Yes"}
                  </p>
                </section>

                <div className="flex gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                  <Link href={`/ads/${ad._id}/update`}>
                    <Image
                      src="/assets/icons/edit.svg"
                      alt="edit"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <DeleteConfirmation adId={ad._id} imageUrls={ad.imageUrls} />
                </div>
              </div>
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
