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
import { Input } from "@/components/ui/input";

import { VerifiesFormSchema } from "@/lib/validator";
import { VerifiesDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SetStateAction, useState } from "react";
import { FileUploader } from "./FileUploader";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
//import router from "next/router";
import { useRouter } from "next/navigation";
import { ICategory } from "@/lib/database/models/category.model";
import { FileUploaderCategory } from "./FileuploaderCategory";
import { createCategory, updateCategory } from "@/lib/actions/category.actions";
import { IVerifies } from "@/lib/database/models/verifies.model";
import { createVerify } from "crypto";
import { createVerifies, updateVerifies } from "@/lib/actions/verifies.actions";
import { useToast } from "@/components/ui/use-toast";
type VerifyFormProps = {
  type: "Create" | "Update";
  verifies?: IVerifies;
  verifiesId?: string;
};

const VerifyForm = ({ type, verifies, verifiesId }: VerifyFormProps) => {
  const initialValues =
    verifies && type === "Update"
      ? {
          ...verifies,
        }
      : VerifiesDefaultValues;
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof VerifiesFormSchema>>({
    resolver: zodResolver(VerifiesFormSchema),
    defaultValues: initialValues,
  });
  const { toast } = useToast();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof VerifiesFormSchema>) {
    if (type === "Create") {
      try {
        // alert(uploadedImageUrl);

        const newVerify = await createVerifies({
          verifies: { ...values },
          path: "/verified",
        });

        // alert(newCategory);
        if (newVerify) {
          form.reset();
          //  router.push(`/admin/${newCategory._id}`);
          router.push(`/verified/`);
          // window.location.href = "/events/" + newEvent._id;
        }
      } catch (error) {
        console.log(error);
      }
    } else if (type === "Update") {
      try {
        if (!verifiesId) {
          router.back();
          return;
        }

        const updatedverifies = await updateVerifies({
          verifies: {
            ...values,
            _id: verifiesId,
          },
          path: `/verified/${verifiesId}`,
        });

        if (updatedverifies) {
          toast({
            title: "Successful!",
            description: "You have updated Verification fee successfully",
            duration: 5000,
            className: "bg-[#30AF5B] text-white",
          });
          // form.reset();
          // router.push(`/verified/${updatedverifies._id}/update`);
          // router.push(`/categories`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex pr-5">
          <FormField
            control={form.control}
            name="fee"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Verification fee"
                    {...field}
                    className="w-full p-2 focus:outline-none bg-white border rounded-r-none rounded-l-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-[200px] bg-gradient-to-b from-emerald-800 to-emerald-900 text-white rounded-r-lg px-5 text-sm"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} fee `}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default VerifyForm;
