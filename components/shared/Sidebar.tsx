"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { format, isToday, isYesterday } from "date-fns";
import UnreadmessagesPeruser from "./UnreadmessagesPeruser";

type sidebarProps = {
  userId: string;
};
export async function updateRead(recipientUid: string, uid: string) {
  const q = query(
    collection(db, "messages"),
    where("uid", "==", uid),
    where("recipientUid", "==", recipientUid)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const docRef = doc.ref;

    // Update the amount field
    updateDoc(docRef, {
      read: "0",
    })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });
}
const Sidebar = ({ userId }: sidebarProps) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Function to get the last message in each conversation
    const getLastMessagesInConversations = async () => {
      try {
        // Initialize an empty object to store last messages
        const lastMessages: any = {};

        // Query all messages and order them by createdAt timestamp in descending order
        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("createdAt", "desc")
        );

        // Get all messages
        const querySnapshot = await getDocs(messagesQuery);

        // Iterate over each message to find the last message in each conversation
        querySnapshot.forEach((doc) => {
          const message = doc.data();

          // If the recipientUid is not already in the lastMessages object or the message is newer than the current last message,
          // update the last message for that recipientUid
          if (message.recipientUid === userId) {
            if (
              !lastMessages[message.recipientUid] ||
              message.createdAt.seconds >
                lastMessages[message.recipientUid].createdAt.seconds
            ) {
              lastMessages[message.recipientUid] = message;
            }
          }
        });

        // Convert object to array and return the last messages
        return Object.values(lastMessages);
      } catch (error) {
        console.error("Error getting last messages:", error);
        return []; // Return empty array in case of error
      }
    };

    // Example usage
    getLastMessagesInConversations()
      .then((lastMessages) => {
        console.log("Last messages:", lastMessages);
        setMessages(lastMessages);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId]);
  const router = useRouter();
  const pathname = usePathname();
  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  const handle = (uid: string, recipientUid: string) => {
    router.push("/chat/" + uid);
    updateRead(recipientUid, uid);
  };
  return (
    <div>
      {messages.length > 0 ? (
        <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {messages &&
              messages.map((messages, index) => {
                const isActive = pathname === "/chat/" + messages.uid;
                return (
                  <>
                    <li
                      key={index}
                      onClick={() =>
                        handle(messages.uid, messages.recipientUid)
                      }
                      className={`p-4 flex items-center space-x-4 hover:bg-gray-100 hover:cursor-pointer ${
                        isActive && "bg-emerald-100"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={messages.avatar}
                          alt={messages.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {messages.name}
                        </p>

                        <p className="flex gap-1 text-sm text-gray-500 truncate">
                          {truncateTitle(messages.text, 30)}
                          <UnreadmessagesPeruser
                            uid={messages.uid}
                            recipientUid={userId}
                          />
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-sm text-gray-500">
                        {new Date(
                          messages.createdAt.seconds * 1000
                        ).toLocaleTimeString()}
                      </div>
                    </li>

                    {/*     <li
                key={"/chat/" + messages.uid}
                className={`${
                  isActive &&
                  "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white rounded-sm"
                } p-medium-16 whitespace-nowrap bg-emerald-50 rounded-sm`}
              >
                <div
                  onClick={() => handle(messages.uid, messages.recipientUid)}
                  className="hover:bg-emerald-100 hover:rounded-sm hover:text-emerald-600 p-3 mb-1 hover:cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-right my-auto">
                      <Image
                        className="w-8 h-8 rounded-full object-cover"
                        src={messages.avatar}
                        alt="avatar"
                        width={300}
                        height={300}
                      />
                    </span>
                    <div className="text-xs">{messages.name}</div>
                  </div>
                  <div className="text-xs flex w-full justify-between">
                    <div className="flex gap-1 font-normal">
                      {truncateTitle(messages.text, 15)}
                      <UnreadmessagesPeruser
                        uid={messages.uid}
                        recipientUid={userId}
                      />
                    </div>
                    <div className="font-normal">{formattedCreatedAt}</div>
                  </div>
                </div>
              </li>*/}
                  </>
                );
              })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-f(ull flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="font-bold text-[16px] lg:text-[25px]">No Chat</h3>
          <p className="text-sm lg:p-regular-14">You have 0 messages</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
