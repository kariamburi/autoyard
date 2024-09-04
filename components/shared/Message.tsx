//import { UserAuth } from "../context/AuthContext";

import { UpdateUserParams } from "@/types";

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
  let formattedCreatedAt = "";
  try {
    const createdAtDate = new Date(message.createdAt.seconds * 1000); // Convert seconds to milliseconds

    // Get today's date
    const today = new Date();

    // Check if the message was sent today
    if (isToday(createdAtDate)) {
      formattedCreatedAt = "Today " + format(createdAtDate, "HH:mm"); // Set as "Today"
    } else if (isYesterday(createdAtDate)) {
      // Check if the message was sent yesterday
      formattedCreatedAt = "Yesterday " + format(createdAtDate, "HH:mm"); // Set as "Yesterday"
    } else {
      // Format the createdAt date with day, month, and year
      formattedCreatedAt = format(createdAtDate, "dd-MM-yyyy"); // Format as 'day/month/year'
    }

    // Append hours and minutes if the message is not from today or yesterday
    if (!isToday(createdAtDate) && !isYesterday(createdAtDate)) {
      formattedCreatedAt += " " + format(createdAtDate, "HH:mm"); // Append hours and minutes
    }
  } catch {
    // Handle error when formatting date
  }

  //console.log(message);
  return (
    <div className="">
      <div
        className={`flex items-start justify-${
          message.uid === uid ? "end" : "start"
        }`}
      >
        <div className="flex-shrink-0 mr-2">
          {message.uid === uid ? (
            // If the message is sent by the current user, display the user's avatar
            <>
              {" "}
              <div className="flex items-center gap-2">
                <Image
                  className="w-8 h-8 rounded-full object-cover"
                  src={photoURL}
                  alt="avatar"
                  width={200}
                  height={200}
                />
                <div className="text-[12px] lg:text-xs text-black font-medium flex gap-5">
                  {message.name}
                  <div className="text-[12px] lg:text-xs text-gray-500">
                    {formattedCreatedAt}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div
                  className={`max-w-xs mx-2 my-1 p-3 rounded-lg  ${
                    message.uid === uid
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {message.imageUrl && (
                    <Image
                      src={message.imageUrl}
                      alt="Image"
                      className="mb-2 object-cover"
                      width={900}
                      height={500}
                    />
                  )}
                  <div className="text-sm lg:text-base w-[200px] lg:w-full">
                    {message.text}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // If the message is sent by someone else, display the recipient's avatar
            <>
              {" "}
              <div className="flex items-center gap-2">
                <Image
                  className="w-8 h-8 rounded-full object-cover"
                  src={message.avatar}
                  alt="Avatar"
                  width={200}
                  height={200}
                />
                <div className="text-[12px] lg:text-xs text-black font-medium flex gap-3">
                  {recipient.firstName} {recipient.lastName}
                  <div className="text-[12px] lg:text-xs text-gray-500">
                    {formattedCreatedAt}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mr-2">
                <div
                  className={`max-w-xs mx-2 my-1 p-3 rounded-lg  ${
                    message.uid === uid
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {message.imageUrl && (
                    <Image
                      src={message.imageUrl}
                      alt="Image"
                      className="mb-2 object-cover"
                      width={900}
                      height={500}
                    />
                  )}
                  <div className="text-sm lg:text-base w-[200px] lg:w-full">
                    {message.text}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
