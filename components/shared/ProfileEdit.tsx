"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { UpdateUserParams } from "@/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/lib/database/models/user.model";
import { UserDefaultValues } from "@/constants";
import { UserFormSchema } from "@/lib/validator";
import { updateUser, updateUserFromSettings } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { TextField } from "@mui/material";
import { SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs";
import { FileUploaderCategory } from "./FileuploaderCategory";
import { useUploadThing } from "@/lib/uploadthing";
import { FileuploaderBusiness } from "./FileuploaderBusiness";
import { verificationStatus } from "@/lib/actions/verificationstatus";

type setingsProp = {
  type: "Create" | "Update";
  user?: IUser;
  userId?: string;
};

type Businesshours = {
  openHour: string;
  openMinute: string;
  closeHour: string;
  closeMinute: string;
};
const ProfileEdit = ({ user, type, userId }: setingsProp) => {
  const { toast } = useToast();
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("OrderTrackingId")) {
      const orderTrackingId = query.get("OrderTrackingId");
      console.log(orderTrackingId);
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
        console.log("TRA***********: " + transaction);

        const response = await verificationStatus(transaction);

        if (response === "success") {
          console.log("RESPONSE    " + response);
          toast({
            title: "Verification successful!",
            description: "You will receive an email confirmation",
            duration: 5000,
            className: "bg-[#30AF5B] text-white",
          });

          router.push("/settings/");
        } else if (response === "failed") {
          toast({
            variant: "destructive",
            title: "Verification canceled!",
            description:
              "Continue to shop around and checkout when you're ready",
            duration: 5000,
          });
        }
      };
      checkstatus({ transaction });
    }
  }, []);
  const [countryCode, setCountryCode] = useState(
    user?.phone.substring(0, 4) ?? "+254"
  ); // Default country code
  const [phoneNumber, setPhoneNumber] = useState(
    user?.phone.substring(user?.phone.length - 9) ?? ""
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(
    user?.businessworkingdays ?? []
  );

  const [startHour, setStartHour] = useState(
    user?.businesshours[0]?.openHour ?? "09"
  );
  const [startMinute, setStartMinute] = useState(
    user?.businesshours[0]?.openMinute ?? "00"
  );
  const [endHour, setEndHour] = useState(
    user?.businesshours[0]?.closeHour ?? "17"
  );
  const [endMinute, setEndMinute] = useState(
    user?.businesshours[0]?.closeMinute ?? "00"
  );

  const initialValues =
    user && type === "Update"
      ? {
          ...user,
        }
      : UserDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: initialValues,
  });
  async function onSubmit(values: z.infer<typeof UserFormSchema>) {
    alert("okay");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-3 bg-gray-100"
      >
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} User `}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileEdit;
