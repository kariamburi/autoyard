"use client";
import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { v4 as uuidv4 } from "uuid";
import { createTransaction } from "@/lib/actions/transactionstatus";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { format, isToday, isYesterday } from "date-fns";
import { IUser } from "@/lib/database/models/user.model";
import { getVerfiesfee } from "@/lib/actions/verifies.actions";
import { useRouter } from "next/navigation";

type setingsProp = {
  user: IUser;
  userId: string;
  isAdCreator: boolean;
};

const Verification = ({ user, userId, isAdCreator }: setingsProp) => {
  const _id = "662b9ab6dd4398a447257e59";
  const router = useRouter();
  const [activationfee, setactivationfee] = useState(500);

  const handlepay = async (
    packIdInput: string,
    packNameInput: string,
    periodInput: string,
    priceInput: string
  ) => {
    const customerId = uuidv4();

    const trans = {
      orderTrackingId: customerId,
      amount: Number(priceInput),
      plan: packNameInput,
      planId: packIdInput,
      period: periodInput,
      buyerId: userId,
      merchantId: userId,
      status: "Pending",
      createdAt: new Date(),
    };
    const response = await createTransaction(trans);
    if (response.status === "Pending") {
      router.push(`/pay/${response.orderTrackingId}`);
    }
  };

  let formattedCreatedAt = "";
  try {
    const createdAtDate = new Date(user?.verified[0]?.verifieddate);
    const today = new Date();

    if (isToday(createdAtDate)) {
      formattedCreatedAt = "Today " + format(createdAtDate, "HH:mm");
    } else if (isYesterday(createdAtDate)) {
      formattedCreatedAt = "Yesterday " + format(createdAtDate, "HH:mm");
    } else {
      formattedCreatedAt = format(createdAtDate, "dd-MM-yyyy");
      formattedCreatedAt += " " + format(createdAtDate, "HH:mm");
    }
  } catch {
    // Handle error when formatting date
  }

  useEffect(() => {
    if (user.verified && user?.verified[0]?.accountverified === true) {
    } else {
      const getfee = async () => {
        const verifies = await getVerfiesfee(_id);
        setactivationfee(verifies.fee);
      };
      getfee();
    }
  }, []);

  return (
    <div className="p-2">
      {user.verified && user?.verified[0]?.accountverified === true ? (
        <HoverCard>
          <HoverCardTrigger
            asChild
            onTouchStart={(e) => e.currentTarget.focus()} // Trigger focus on touch for mobile
          >
            <p className="text-[#30AF5B] text-xs cursor-pointer hover:underline">
              <VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} />
              Account Verified
            </p>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 ml-2 mr-2">
            <div className="flex justify-between space-x-4">
              <VerifiedUserOutlinedIcon
                sx={{ fontSize: 24 }}
                className="text-emerald-600"
              />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Account Verified</h4>
                <p className="text-sm">
                  This account has been fully verified and is genuine.
                </p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    Verified since {formattedCreatedAt}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <>
          {isAdCreator ? (
            <HoverCard>
              <HoverCardTrigger
                asChild
                onTouchStart={(e) => e.currentTarget.focus()} // Trigger focus on touch for mobile
              >
                <p className="text-gray-50 text-xs cursor-pointer hover:underline">
                  <ShieldOutlinedIcon sx={{ fontSize: 16 }} />
                  Account unverified
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 ml-2 mr-2">
                <div className="flex justify-between space-x-4">
                  <ShieldOutlinedIcon
                    sx={{ fontSize: 24 }}
                    className="text-[#ff0000]"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-[#ff0000]">
                      Account unverified
                    </h4>
                    <p className="text-sm">
                      This account is currently unverified. Request verification
                      to enhance client confidence and attract more clients.
                    </p>
                    <div className="flex items-center pt-2">
                      <button
                        onClick={() =>
                          handlepay(
                            _id,
                            "Verification",
                            "0",
                            activationfee.toString()
                          )
                        }
                        className="bg-[#30AF5B] text-white text-xs hover:bg-[#000000] mt-2 p-2 rounded-lg shadow"
                      >
                        <CheckCircleIcon sx={{ marginRight: "5px" }} />
                        Request Verification
                      </button>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <HoverCard>
              <HoverCardTrigger
                asChild
                onTouchStart={(e) => e.currentTarget.focus()} // Trigger focus on touch for mobile
              >
                <p className="text-gray-50 text-xs cursor-pointer hover:underline">
                  <ShieldOutlinedIcon sx={{ fontSize: 16 }} />
                  Account unverified
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 ml-2 mr-2">
                <div className="flex justify-between space-x-4">
                  <ShieldOutlinedIcon
                    sx={{ fontSize: 24 }}
                    className="text-[#ff0000]"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-[#ff0000]">
                      Account unverified
                    </h4>
                    <p className="text-sm">
                      The seller's account has not been verified.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </>
      )}
    </div>
  );
};

export default Verification;
