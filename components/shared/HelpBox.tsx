"use client";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { UpdateUserParams } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SidebarProps = {
  displayName: string;
  uid: string;
  recipientUid: string;
  photoURL: string;
  recipient: UpdateUserParams;
  client: boolean;
};

type PropMess = {
  messageId: string;
};

const HelpBox = ({
  uid,
  photoURL,
  displayName,
  recipientUid,
  recipient,
  client,
}: SidebarProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const fetchMessages = () => {
      const senderMessagesQuery = query(
        collection(db, "messages"),
        where("uid", "==", uid),
        where("recipientUid", "==", recipientUid),
        limit(50)
      );

      const recipientMessagesQuery = query(
        collection(db, "messages"),
        where("uid", "==", recipientUid),
        where("recipientUid", "==", uid),
        limit(50)
      );

      const unsubscribeSender = onSnapshot(senderMessagesQuery, (snapshot) => {
        const senderMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages((prevMessages) =>
          [
            ...prevMessages.filter((msg) => msg.uid !== uid), // Filter out previous messages from current user
            ...senderMessages,
          ].sort((a, b) => a.createdAt - b.createdAt)
        );
      });

      const unsubscribeRecipient = onSnapshot(
        recipientMessagesQuery,
        (snapshot) => {
          const recipientMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages((prevMessages) =>
            [
              ...prevMessages.filter((msg) => msg.uid !== recipientUid), // Filter out previous messages from recipient user
              ...recipientMessages,
            ].sort((a, b) => a.createdAt - b.createdAt)
          );
        }
      );

      return () => {
        unsubscribeSender();
        unsubscribeRecipient();
      };
    };

    fetchMessages();
  }, [uid, recipientUid]);

  // Function to update the read status of a message
  const updateMessageReadStatus = async ({ messageId }: PropMess) => {
    try {
      const messageRef = doc(db, "messages", messageId);
      await updateDoc(messageRef, {
        read: 1, // Correct read status value to indicate the message is read
      });
      console.log("Message read status updated successfully.");
    } catch (error) {
      console.error("Error updating message read status: ", error);
    }
  };

  return (
    <div className="">
      <ScrollArea className="h-[390px] text-sm lg:text-base w-full bg-white rounded-t-md border p-4">
        <div>
          <h2 className="font-bold">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem key="faq-1" value="item-1">
              <AccordionTrigger>
                <h3>What is Wheels?</h3>
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Wheels.co.ke is an online marketplace that allows users to buy
                  and sell items locally. It&apos;s a platform for people to
                  list items for sale and for buyers to find great deals in
                  their area.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem key="faq-2" value="item-2">
              <AccordionTrigger>
                <h3>How do I create an account on Wheels?</h3>
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  To create an account, download the Wheels app from the App
                  Store or Google Play Store, or visit the Wheels.co.ke website.
                  Follow the prompts to sign up using your email address,
                  Facebook account, or Google account.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem key="faq-3" value="item-3">
              <AccordionTrigger>
                <h3>How do I list an item for sale?</h3>
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Open the Wheels.co.ke app or website and click on the
                  &quot;Post&quot; button. Follow the prompts to add photos, a
                  description, and a price for your item. Once you&apos;ve
                  completed the details, click &quot;Post&quot; to list your
                  item for sale.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Add more FAQ sections with unique keys */}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HelpBox;
