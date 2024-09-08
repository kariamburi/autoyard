import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Link from "next/link";
type Ratingsprop = {
  recipientUid: string;
};

interface Review {
  id: string;
  text: string;
  name: string;
  avatar: string;
  createdAt: Timestamp; // Assuming createdAt is a Firestore timestamp
  uid: string;
  recipientUid: string;
  starClicked: boolean[];
}

const Ratingsmobile = ({ recipientUid }: Ratingsprop) => {
  const [clickedStarsCount, setClickedStarsCount] = useState<number>(0);
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const [averangestar, setaverangestar] = useState<number>(0);
  useEffect(() => {
    const fetchMessages = () => {
      const messagesQuery = query(
        collection(db, "reviews"),
        where("recipientUid", "==", recipientUid),
        limit(100)
      );

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        let totalClickedStars = 0;
        let totalMessages = snapshot.size;
        snapshot.forEach((doc) => {
          const reviewData = doc.data() as Review;

          totalClickedStars += reviewData.starClicked
            ? reviewData.starClicked.filter((clicked: boolean) => clicked)
                .length
            : 0;
        });

        setClickedStarsCount(totalClickedStars);
        setMessagesCount(totalMessages);
        if (totalMessages === 0) {
          setaverangestar(0);
        } else {
          setaverangestar(totalClickedStars / totalMessages);
        }
      });

      return unsubscribe;
    };

    fetchMessages();
  }, [recipientUid]);

  return (
    <div className="text-[12px] flex gap-1 items-center justify-center h-full">
      <div className="text-[12px] font-bold"> {averangestar}</div>
      {averangestar < 1 && (
        <div className="w-[70px] items-center justify-center">
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
        </div>
      )}
      {averangestar >= 1 && averangestar < 1.5 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
        </div>
      )}
      {averangestar >= 1.5 && averangestar < 2 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarHalfIcon className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
        </div>
      )}
      {averangestar >= 2 && averangestar < 2.5 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
        </div>
      )}
      {averangestar >= 2.5 && averangestar < 3 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarHalfIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
        </div>
      )}
      {averangestar >= 3 && averangestar < 3.5 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
        </div>
      )}
      {averangestar >= 3.5 && averangestar < 4 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarHalfIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
        </div>
      )}
      {averangestar >= 4 && averangestar < 4.5 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-gray-400" />
        </div>
      )}
      {averangestar >= 4.5 && averangestar < 5 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarHalfIcon sx={{ fontSize: 14 }} className="text-amber-400" />
        </div>
      )}
      {averangestar >= 5 && (
        <div className="w-[70px]">
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
          <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
        </div>
      )}

      <Link
        href={`/reviews/${recipientUid}`}
        className="text-gray-600 text-xs no-underline font-boldm-1 hover:text-emerald-500 hover:underline"
      >
        <p className="items-center">{messagesCount} reviews</p>
      </Link>
    </div>
  );
};

export default Ratingsmobile;