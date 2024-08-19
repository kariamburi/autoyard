"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
//import { checkoutCredits } from "@/lib/actions/checkoutCredits";
import { transactionStatus } from "@/lib/actions/transactionstatus";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
const Checkout = ({
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
  const { toast } = useToast();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("OrderTrackingId")) {
      const orderTrackingId = query.get("OrderTrackingId");
      // Retrieve transaction values from session storage
      const plan = sessionStorage.getItem("plan");
      const period = sessionStorage.getItem("period");
      const amount = parseInt(sessionStorage.getItem("amount") || "0");
      const planId = sessionStorage.getItem("planId");
      const buyerId = sessionStorage.getItem("buyerId");
      const phone = sessionStorage.getItem("phone");
      const firstName = sessionStorage.getItem("firstName");
      const middleName = sessionStorage.getItem("middleName");
      const lastName = sessionStorage.getItem("lastName");
      const email = sessionStorage.getItem("email");

      const transaction = {
        plan: plan,
        amount: amount,
        period: period,
        planId: planId,
        buyerId: buyerId,
        phone: phone,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        orderTrackingId: orderTrackingId || "", // Provide a default value if null
      };

      //  alert(JSON.stringify(transaction));
      const checkstatus = async ({ transaction }: any) => {
        //console.log("TRA***********: " + transaction);

        const response = await transactionStatus(transaction);

        if (response === "success") {
          // console.log("RESPONSE    " + response);
          toast({
            title: "Order placed!",
            description: "You will receive an email confirmation",
            duration: 5000,
            className: "bg-[#30AF5B] text-white",
          });

          router.push("/shop/" + buyerId);
        } else if (response === "failed") {
          toast({
            variant: "destructive",
            title: "Order canceled!",
            description:
              "Continue to shop around and checkout when you're ready",
            duration: 5000,
          });
        }
      };
      checkstatus({ transaction });
    }
  }, []);

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

    //const url = await checkoutCredits(transaction);
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
    // router.push(`/pesapal/${encodeURIComponent(url)}`);
  };

  return (
    <>
      <form action={onCheckout} method="POST">
        <section>
          <Button
            type="submit"
            role="link"
            className="w-full rounded-full bg-[#000000] bg-cover"
          >
            Buy Now
          </Button>
        </section>
      </form>
    </>
  );
};

export default Checkout;
