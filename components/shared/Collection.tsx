"use client";
import { IAd } from "@/lib/database/models/ad.model";
import React, { useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FloatingChatIcon from "./FloatingChatIcon";
import ChatWindow from "./ChatWindow";

import Link from "next/link";
//import Card from './Card'
//import Pagination from './Pagination'

type CollectionProps = {
  data: IAd[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  userId: string;
  userName: string;
  userImage: string;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  userId,
  userName,
  userImage,
}: CollectionProps) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10 p-0">
          <ul className="grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {data.map((ad) => {
              const hasOrderLink = collectionType === "Ads_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={ad._id} className="flex justify-center">
                  <Card
                    ad={ad}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                    userId={userId}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}

      <FloatingChatIcon onClick={toggleChat} isOpen={isChatOpen} />
      <ChatWindow
        isOpen={isChatOpen}
        onClose={toggleChat}
        senderId={userId}
        senderName={userName}
        senderImage={userImage}
        recipientUid={"65d4a2ffec4c43cdc488ce0d"}
      />
    </div>
  );
};

export default Collection;
