"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "@/lib/firebase";
import UnreadmessagesPeruser from "./UnreadmessagesPeruser";
import Image from "next/image";
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
    const docRef = doc.ref;
    updateDoc(docRef, { read: "0" })
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getLastMessagesInConversations = async () => {
      try {
        const lastMessages: any = {};
        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(messagesQuery);
        querySnapshot.forEach((doc) => {
          const message = doc.data();
          if (message.recipientUid === userId) {
            if (
              !lastMessages[message.uid] ||
              message.createdAt.seconds >
                lastMessages[message.uid].createdAt.seconds
            ) {
              lastMessages[message.uid] = message;
            }
          }
        });
        return Object.values(lastMessages);
      } catch (error) {
        console.error("Error getting last messages:", error);
        return [];
      }
    };

    getLastMessagesInConversations().then((lastMessages) => {
      setMessages(lastMessages);
    });
  }, [userId]);

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  const handle = (uid: string, recipientUid: string) => {
    router.push("/chat/" + uid);
    updateRead(recipientUid, uid);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex gap-1 items-center">
            <CircularProgress sx={{ color: "black" }} size={30} />
            Loading chats...
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg">
          <ul className="divide-y divide-gray-200">
            {messages.map((message, index) => {
              const isActive = pathname === "/chat/" + message.uid;
              return (
                <li
                  key={index}
                  onClick={() => handle(message.uid, message.recipientUid)}
                  className={`p-4 flex items-center space-x-4 hover:bg-gray-100 hover:cursor-pointer ${
                    isActive ? "bg-emerald-100" : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={message.avatar}
                      alt={message.name}
                      height={200}
                      width={200}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {message.name}
                    </p>
                    <p className="flex gap-1 text-sm text-gray-500 truncate">
                      {truncateTitle(message.text, 18)}
                      <UnreadmessagesPeruser
                        uid={message.uid}
                        recipientUid={userId}
                      />
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-sm text-gray-500">
                    {new Date(
                      message.createdAt.seconds * 1000
                    ).toLocaleTimeString()}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
