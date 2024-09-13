"use client";
import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IAd } from "@/lib/database/models/ad.model";
import { IUser } from "@/lib/database/models/user.model";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { NGnaira } from "@/lib/help";
import { getData } from "@/lib/actions/transactionstatus";
import { sendEmail } from "@/lib/actions/sendEmail";
import { sendSMS } from "@/lib/actions/sendsmsnow";
type chatProps = {
  userId: string;
  userName: string;
  userImage: string;
  ad: any;
};
const ChatButton = ({ ad, userId, userName, userImage }: chatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  let subscription: any = [];

  const [daysRemaining, setdaysRemaining] = useState(0);
  const [planpackage, setplanpackage] = useState<string>("Free");
  const currDate = new Date();
  // Add one month to the current date
  let expirationDate = new Date(currDate);
  expirationDate.setMonth(currDate.getMonth() + 1);
  useEffect(() => {
    const checksubcription = async () => {
      try {
        subscription = await getData(ad.organizer._id);

        // Step 1: Parse createdAt date string into a Date object

        setplanpackage(subscription.currentpack.name);
        const createdAtDate = new Date(subscription.transaction.createdAt);

        // Step 2: Extract the number of days from the period string
        const periodDays = parseInt(subscription.transaction.period);

        // Step 3: Calculate expiration date by adding period days to createdAt date
        expirationDate = new Date(
          createdAtDate.getTime() + periodDays * 24 * 60 * 60 * 1000
        );
        // Step 4: Calculate the number of days remaining until the expiration date
        const currentDate = new Date();
        const daysRemaining_ = Math.ceil(
          (expirationDate.getTime() - currentDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        setdaysRemaining(daysRemaining_);
      } catch {}
    };

    checksubcription();
  }, []);
  // console.log(packagesList);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    const read = "1";
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        name: userName,
        avatar: userImage || "/default-avatar.jpg",
        createdAt: serverTimestamp(),
        uid: userId, // sender's UID
        recipientUid: ad.organizer._id, // recipient's UID
        imageUrl: ad.imageUrls[0],
        adTitle: ad.title,
        adDescription: ad.description,
        adUrl: `https://autoyard.co.ke/ads/${ad._id}`,
        read,
      });
      const adTitle = ad.title;
      const adUrl = `https://autoyard.co.ke/ads/${ad._id}`;
      const phoneNumber = ad.phone;
      const recipientEmail = ad?.organizer?.email;
      // Send notification sms
      if (
        (planpackage === "Premium" ||
          planpackage === "Diamond" ||
          planpackage === "Basic") &&
        daysRemaining > 0
      ) {
        const response = await sendSMS(phoneNumber, message, adTitle, adUrl);
        if (response == "success") {
          console.log("sms sent successfully");
        } else {
          console.error("Failed to send sms");
        }
      }
      const responseemail = await sendEmail(
        recipientEmail,
        message,
        adTitle,
        adUrl
      );
      if (responseemail == "success") {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }

      setMessage(""); // Clear the message input
      setIsOpen(false); // Close the popup
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
  const truncateDescription = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:bg-emerald-700 bg-[#30AF5B] text-white text-xs mt-2 p-2 rounded-lg shadow"
      >
        <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: "5px" }} />
        <div className="hidden lg:inline">Enquire</div>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{ad.title}</h3>
            <p className="text-gray-700 mb-4">
              {truncateDescription(ad?.description ?? "", 80)}
            </p>
            <span className="text-[12px] lg:text-lg font-bold w-min rounded-full mt-1 text-emerald-950">
              {NGnaira.format(ad.price)}
            </span>
            <img
              src={ad.imageUrls[0]}
              alt={ad.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your inquiry here..."
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none mr-2"
              >
                Send Inquiry
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatButton;
