"use client";
import NavItems from "@/components/shared/NavItems";
import EventForm from "@/components/shared/EventForm";
import { Separator } from "@radix-ui/react-separator";
import NavItemsMobile from "./NavItemsMobile";
import { IAd } from "@/lib/database/models/ad.model";
import Collection from "./Collection";
import { Button } from "../ui/button";
import Link from "next/link";
//import CollectionMyads from "./CollectionMyads";
import { CreateUserParams } from "@/types";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  EmailShareButton,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Ratings from "./ratings";
//import SellerProfile from "./SellerProfile";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import CollectionBookmark from "./CollectionBookmark";
const CollectionMyads = dynamic(() => import("./CollectionMyads"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          // height={250}
          className="rounded-sm w-[200px] md:w-[200px] lg:w-[250px]"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          //  height={250}
          className="rounded-sm w-[200px] md:w-[200px] lg:w-[250px]"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          // height={250}
          className="rounded-sm w-[200px] md:w-[200px] lg:w-[250px]"
        />
      </div>
    </div>
  ),
});
const SellerProfile = dynamic(() => import("./SellerProfile"), {
  ssr: false,
  loading: () => (
    <div className="m-1 space-y-0 lg:flex lg:space-x-5">
      <div className="flex flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="rounded-sm w-full md:w-[300px] lg:w-[300px]"
        />
      </div>
    </div>
  ),
});
type CollectionProps = {
  userId: string;
  data: IAd[];
  user: CreateUserParams;
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const dashboardBookmark = ({
  userId,
  data,
  user,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: // Accept the onSortChange prop
CollectionProps) => {
  const [activeButton, setActiveButton] = useState(0);
  const [isVertical, setisVertical] = useState(true);
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
    if (index === 0) {
      setisVertical(true);
    } else {
      setisVertical(false);
    }
  };

  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  const handleSortChange = (selectedOption: string) => {
    // Do something with the selected sorting option
    console.log("Selected sorting option:", selectedOption);
    setQuery(selectedOption);
    // Example: If "lowest" option is selected, perform some action
    if (selectedOption === "lowest") {
      // Perform your action here
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto flex mt-3 p-1">
        <div className="hidden lg:inline mr-5">
          <div className="bg-white w-full rounded-lg p-1">
            <div className="flex justify-center items-center w-full h-full">
              <SellerProfile user={user} loggedId={userId} userId={userId} />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white border rounded-lg lg:hidden">
            <SellerProfile user={user} loggedId={userId} userId={userId} />
          </div>
          <div className="rounded-lg border bg-white max-w-6xl mx-auto lg:flex-row mt-3 p-1 justify-center">
            <section className="bg-grey-50 bg-dotted-pattern bg-cover bg-center py-0 md:py-0 rounded-sm">
              <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">Bookmark</h3>
              </div>
            </section>
            <section className=" my-2">
              <CollectionBookmark
                data={data}
                emptyTitle="No ads have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Ads_Organized"
                limit={3}
                page={page}
                urlParamName="adsPage"
                totalPages={totalPages}
                userId={userId}
                isAdCreator={false}
                isVertical={isVertical}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboardBookmark;
