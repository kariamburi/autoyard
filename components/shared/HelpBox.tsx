"use client";
import { db } from "@/lib/firebase";
import Message from "./Message";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  where,
  getDocs,
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

type sidebarProps = {
  displayName: string;
  uid: string;
  recipientUid: string;
  photoURL: string;
  recipient: UpdateUserParams;
  client: boolean;
};
type propmess = {
  messageId: string;
};
const HelpBox = ({
  uid,
  photoURL,
  displayName,
  recipientUid,
  recipient,
  client,
}: sidebarProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  //const [recipientUid, setrecipientUid] = React.useState<string | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // console.log("chatbox:" + recipientUid);
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

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  // Function to update the read status of a message

  const updateMessageReadStatus = async ({ messageId }: propmess) => {
    try {
      // Get a reference to the message document
      const messageRef = doc(db, "messages", messageId);

      // Update the read field to 1 (indicating read status)
      await updateDoc(messageRef, {
        read: 0,
      });

      console.log("Message read status updated successfully.");
    } catch (error) {
      console.error("Error updating message read status: ", error);
    }
  };

  // Call the function to update the read status of the message

  return (
    <div className="">
      <ScrollArea className="h-[390px] w-full  bg-white rounded-t-md border p-4">
        <div>
          <div>
            <h2 className="font-bold">Frequently Asked Questions</h2>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>What is OfferUp?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      OfferUp is an online marketplace that allows users to buy
                      and sell items locally. It's a platform for people to list
                      items for sale and for buyers to find great deals in their
                      area.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>How do I create an account on OfferUp?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      To create an account, download the OfferUp app from the
                      App Store or Google Play Store, or visit the OfferUp
                      website. Follow the prompts to sign up using your email
                      address, Facebook account, or Google account.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>How do I list an item for sale?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Open the OfferUp app or website and click on the "Post"
                      button. Follow the prompts to add photos, a description,
                      and a price for your item. Once you've completed the
                      details, click "Post" to list your item for sale.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>How do I contact a seller?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      To contact a seller, click on the item you're interested
                      in and then click the "Ask" button. You can send a message
                      to the seller to ask questions or make an offer.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>How do I make a payment?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      OfferUp provides a secure payment system called OfferUp
                      Payments. Once you agree on a price with the seller, you
                      can make a payment directly through the app using your
                      credit or debit card.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>Is OfferUp safe?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      OfferUp takes safety seriously. The platform includes
                      features like user profiles, ratings, and secure messaging
                      to help ensure a safe buying and selling experience.
                      Always meet in public places and follow common safety
                      practices.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>Can I ship items on OfferUp?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Yes, OfferUp offers a shipping option for certain items.
                      When listing an item, you can choose to offer shipping.
                      Buyers can also filter their searches to find items that
                      can be shipped to them.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>What fees does OfferUp charge?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Listing items for sale on OfferUp is free. However, there
                      is a service fee for transactions made through OfferUp
                      Payments, which covers payment processing and buyer
                      protection.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3>How do I report a problem or get support?</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      If you encounter any issues or need help, you can visit
                      the OfferUp Help Center or contact their support team
                      through the app or website. There are options to report
                      users, items, or transactions directly from the platform.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HelpBox;
