//import { UserAuth } from "../context/AuthContext";

import { UpdateUserParams } from "@/types";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { format, isToday, isYesterday } from "date-fns";
import Image from "next/image";
interface MessageProps {
  message: {
    uid: string;
    recipientUid: string;
    imageUrl: string;
    avatar: string;
    createdAt: {
      seconds: number;
      nanoseconds: number;
    }; // Assuming createdAt is a Timestamp object
    name: string;
    text: string;
    adUrl: string;
    adTitle: string;
    adDescription: string;
  };
  displayName: string;
  uid: string;
  photoURL: string;
  recipientUid: string | null;
  recipient: UpdateUserParams;
}

const Message = ({
  message,
  displayName,
  uid,
  recipientUid,
  photoURL,
  recipient,
}: MessageProps) => {
  // Convert Timestamp to Date object

  //console.log(message);
  const truncateDescription = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  return (
    <div className="">
      <div className="chatbox p-4 bg-gray-50">
        <div
          className={`flex items-start mb-4 ${
            message.uid === uid ? "justify-end" : "justify-start"
          }`}
        >
          <img
            src={message.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div
            className={`message-content max-w-xs rounded-lg p-3 ${
              message.uid === uid
                ? "bg-green-100 text-right"
                : "bg-blue-100 text-left"
            }`}
          >
            <h4 className="font-semibold">{message.name}</h4>
            <p className="text-sm">{message.text}</p>
            <small className="text-gray-500">
              {message.createdAt
                ? new Date(
                    message.createdAt.seconds * 1000
                  ).toLocaleTimeString()
                : "No date"}
            </small>
            {message.imageUrl && (
              <Zoom>
                <img
                  src={message.imageUrl}
                  alt="ad image"
                  className="mt-2 rounded-lg cursor-pointer"
                />
              </Zoom>
            )}
            <a
              href={message.adUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-600 underline"
            >
              {message.adTitle}
            </a>
            <p className="text-sm text-gray-700">
              {truncateDescription(message.adDescription ?? "", 80)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
