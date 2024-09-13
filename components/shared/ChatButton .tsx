"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IAd } from "@/lib/database/models/ad.model";
import { IUser } from "@/lib/database/models/user.model";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { NGnaira } from "@/lib/help";
type chatProps = {
  userId: string;
  userName: string;
  userImage: string;
  ad: IAd;
};
const ChatButton = ({ ad, userId, userName, userImage }: chatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

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
      // Send notification email

      const emailResponse = await fetch("/lib/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientEmail: ad.organizer.email || "default-email@example.com", // recipient's email
          phoneNumber: ad.phone, // recipient's phone number
          message, // inquiry message
          adTitle: ad.title,
          adUrl: `https://autoyard.co.ke/ads/${ad._id}`,
        }),
      });

      if (emailResponse.ok) {
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
