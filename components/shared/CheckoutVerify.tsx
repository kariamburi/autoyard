"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { verificationStatus } from "@/lib/actions/verificationstatus";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { checkoutVerification } from "@/lib/actions/checkoutVerification";
//import { transactionStatus } from "@/lib/actions/transactionstatus";
const CheckoutVerify = ({
  plan,
  period,
  amount,
  planId,
  buyerId,
  phone,
  firstName,
  middleName,
  lastName,
  email,
}: {
  plan: string;
  period: string;
  amount: number;
  planId: string;
  buyerId: string;
  phone: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}) => {
  const router = useRouter();
  const onCheckout = async () => {
    const transaction = {
      plan,
      period,
      amount,
      planId,
      buyerId,
      phone,
      firstName,
      middleName,
      lastName,
      email,
    };

    const url = await checkoutVerification(transaction);
    // Store transaction values in session storage
    sessionStorage.setItem("plan", plan);
    sessionStorage.setItem("period", period);
    sessionStorage.setItem("amount", amount.toString());
    sessionStorage.setItem("planId", planId);
    sessionStorage.setItem("buyerId", buyerId);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("middleName", middleName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("email", email);

    router.push(`/pesapal/${encodeURIComponent(url)}`);
    // Pass necessary data as URL parameters
    //router.push(`/pesapal?plan=${encodeURIComponent(plan)}&period=${encodeURIComponent(period)}&amount=${encodeURIComponent(amount)}&planId=${encodeURIComponent(planId)}&buyerId=${encodeURIComponent(buyerId)}&redirect=true`);

    // window.location.href = url;
  };

  return (
    <>
      <form action={onCheckout} method="POST">
        <section>
          <button
            type="submit"
            className="hover:text-gray-500 bg-[#30AF5B] text-white text-xs hover:bg-white mt-2 p-2 rounded-lg shadow"
          >
            <VerifiedUserOutlinedIcon sx={{ marginRight: "5px" }} />
            Request Verification
          </button>
        </section>
      </form>
    </>
  );
};

export default CheckoutVerify;
