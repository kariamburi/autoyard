//import { UserAuth } from "../context/AuthContext";

import { UpdateUserParams } from "@/types";
//import { auth } from "@clerk/nextjs";
import { format, isToday, isYesterday } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { DeleteReview } from "./DeleteReview";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
interface ReviewsProps {
  message: {
    starClicked: any;
    id: string;
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

const Reviews = ({
  message,
  displayName,
  uid,
  recipientUid,
  photoURL,
  recipient,
}: ReviewsProps) => {
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
  const clickedStarsCount = message.starClicked
    ? message.starClicked.filter((clicked: boolean) => clicked).length + ".0"
    : 0;

  //console.log(message);
  return (
    <div className="w-full">
      <div
        className={`flex items-start justify-start rounded-lg bg-gray-100 mb-2 p-3`}
      >
        <div className="">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={message.avatar}
              alt="avatar"
            />
            <div className="text-xs font-bold flex gap-3">{message.name}</div>
          </div>
          <div className="text-xs items-center font-medium flex gap-3">
            <div className="items-center flex gap-1">
              <p className="font-bold text-sm">{clickedStarsCount}</p>
              {message.starClicked &&
                message.starClicked.map((clicked: boolean, index: any) => (
                  <StarIcon
                    key={index}
                    sx={{ fontSize: 24, color: clicked ? "orange" : "gray" }}
                  />
                ))}
            </div>
            <div className="text-xs text-gray-500">{formattedCreatedAt}</div>
          </div>
          <div className="w-full">
            <div className={`text-sm text-gray-700 mb-1`}>{message.text}</div>
            {uid === message.uid && (
              <>
                <DeleteReview messageId={message.id} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
