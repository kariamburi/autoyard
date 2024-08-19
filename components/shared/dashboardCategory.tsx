"use client";
import NavItems from "@/components/shared/NavItems";
import EventForm from "@/components/shared/EventForm";
import { Separator } from "@radix-ui/react-separator";
import NavItemsMobile from "./NavItemsMobile";
import { IAd } from "@/lib/database/models/ad.model";
import Collection from "./Collection";
import { Button } from "../ui/button";
import Link from "next/link";
import CollectionMyads from "./CollectionMyads";
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

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  formUrlQuery,
  formUrlQuerymultiple,
  removeKeysFromQuery,
} from "@/lib/utils";
import Ratings from "./ratings";
import SellerProfile from "./SellerProfile";
//import SidebarSearch from "./SidebarSearch";
//import CollectionSearch from "./CollectionSearch";
import Search from "./Search";
import CategoryFilter from "./CategoryFilter";
import { ICategory } from "@/lib/database/models/category.model";
import ShareLocationOutlinedIcon from "@mui/icons-material/ShareLocationOutlined";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Menumake from "./menumake";
import CategoryFilterSearch from "./CategoryFilterSearch";
import MakeFilter from "./MakeFilter";
import ModelFilter from "./ModelFilter";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { getAllCategories } from "@/lib/actions/category.actions";
import MenumakeBus from "./MenumakeBus";
import MenumakeMotobikes from "./MenumakeMotobikes";
import MenuequipType from "./MenuequipType";
import MenuSpareparts from "./MenuSpareparts";
import MenuBoats from "./MenuBoats";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
const CollectionSearch = dynamic(() => import("./CollectionSearch"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          //height={250}
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
const SidebarSearch = dynamic(() => import("./SidebarSearch"), {
  ssr: false,
  loading: () => (
    <div className="m-1 space-y-0 lg:flex lg:space-x-5">
      <div className="flex flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          //height={400}
          className="rounded-sm w-full md:w-[300px] lg:w-[300px]"
        />
      </div>
    </div>
  ),
});
type CollectionProps = {
  loading: boolean;
  userId: string;
  category: string;
  categoryList?: ICategory;
  subcategory: string;
  data: IAd[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  //vehiclemake: string;
  AdsCountPerSubcategory: any;
  AdsCountPerRegion: any;
  AdsCountPerVerifiedTrue: any;
  AdsCountPerVerifiedFalse: any;
  make: any;
  AdsCountPerColor: any;
  AdsCountPerTransmission: any;
  AdsCountPerFuel: any;
  AdsCountPerCondition: any;
  AdsCountPerCC: any;
  AdsCountPerExchange: any;
  AdsCountPerBodyType: any;
  AdsCountPerRegistered: any;
  AdsCountPerSeats: any;
  AdsCountPersecondCondition: any;
  AdsCountPerYear: any;
  Types: any;
  AdsCountPerlanduse: any;
  AdsCountPerfloors: any;
  AdsCountPerhouseclass: any;
  AdsCountPerbedrooms: any;
  AdsCountPerbathrooms: any;
  AdsCountPerfurnishing: any;
  AdsCountPeramenities: any;
  AdsCountPertoilets: any;
  AdsCountPerparking: any;
  AdsCountPerstatus: any;
  AdsCountPerarea: any;
  AdsCountPerpropertysecurity: any;
};

const DashboardCategory = ({
  loading,
  userId,
  data,
  page,
  totalPages = 0,
  category,
  categoryList,
  subcategory,
  AdsCountPerSubcategory,
  AdsCountPerRegion,
  AdsCountPerVerifiedTrue,
  AdsCountPerVerifiedFalse,
  make,
  AdsCountPerColor,
  AdsCountPerTransmission,
  AdsCountPerFuel,
  AdsCountPerCondition,
  AdsCountPerCC,
  AdsCountPerExchange,
  AdsCountPerBodyType,
  AdsCountPerRegistered,
  AdsCountPerSeats,
  AdsCountPersecondCondition,
  Types,
  AdsCountPerYear,
  AdsCountPerlanduse,
  AdsCountPerfloors,
  AdsCountPerhouseclass,
  AdsCountPerbedrooms,
  AdsCountPerbathrooms,
  AdsCountPerfurnishing,
  AdsCountPeramenities,
  AdsCountPertoilets,
  AdsCountPerparking,
  AdsCountPerstatus,
  AdsCountPerarea,
  AdsCountPerpropertysecurity,
}: // user,

// Accept the onSortChange prop
CollectionProps) => {
  const [activeButton, setActiveButton] = useState(0);
  const [activerange, setactiverange] = useState(20);
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  const [querysort, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (selectedOption: string) => {
    // Do something with the selected sorting option
    // Example: If "lowest" option is selected, perform some action
    if (selectedOption === "nearby") {
      getCurrentLocation(selectedOption);
    } else {
      console.log("Selected sorting option:", selectedOption);
      setQuery(selectedOption);
      let newUrl = "";

      if (querysort) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "sortby",
          value: querysort,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["sortby"],
        });
      }

      router.push(newUrl, { scroll: false });
    }
  };

  const handlePrice = (index: number, min: string, max: string) => {
    setactiverange(index);
    let newUrl = "";
    if (min) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "Price",
        value: min + "-" + max,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["Price"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  // Function to get current location
  function getCurrentLocation(selectedOption: string) {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Request permission to access user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback, position object contains coordinates
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          let newUrl = "";

          if (latitude && longitude) {
            newUrl = formUrlQuerymultiple({
              params: searchParams.toString(),
              updates: {
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                sortby: selectedOption,
              },
            });
            setQuery(selectedOption);
          } else {
            newUrl = removeKeysFromQuery({
              params: searchParams.toString(),
              keysToRemove: ["sortby"],
            });
          }

          router.push(newUrl, { scroll: false });
        },
        (error) => {
          // Error callback, handle errors here
          console.error("Error getting location:", error.message);
          alert("error: " + error.message.toString());
        }
      );
    } else {
      // Geolocation not supported by the browser
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser. ");
    }
  }

  const [loadin, setLoading] = useState(loading);
  const [adsData, setAdsData] = useState(data);

  useEffect(() => {
    // Simulate loading state
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAdsData(data);
    }, 1000);

    // Simulated delay
  }, [data]);

  return (
    <>
      <div className="max-w-6xl mx-auto flex mt-3 p-1">
        <div className="hidden lg:inline mr-5">
          <div className="w-full rounded-lg p-0">
            <div className="flex justify-center items-center w-full h-full">
              <SidebarSearch
                categoryList={categoryList}
                category={category}
                AdsCountPerSubcategory={AdsCountPerSubcategory}
                AdsCountPerRegion={AdsCountPerRegion}
                subcategory={subcategory}
                AdsCountPerVerifiedTrue={AdsCountPerVerifiedTrue}
                AdsCountPerVerifiedFalse={AdsCountPerVerifiedFalse}
                make={make}
                AdsCountPerColor={AdsCountPerColor}
                AdsCountPerTransmission={AdsCountPerTransmission}
                AdsCountPerFuel={AdsCountPerFuel}
                AdsCountPerCondition={AdsCountPerCondition}
                AdsCountPerCC={AdsCountPerCC}
                AdsCountPerExchange={AdsCountPerExchange}
                AdsCountPerBodyType={AdsCountPerBodyType}
                AdsCountPerRegistered={AdsCountPerRegistered}
                AdsCountPerSeats={AdsCountPerSeats}
                AdsCountPersecondCondition={AdsCountPersecondCondition}
                Types={Types}
                AdsCountPerYear={AdsCountPerYear}
                AdsCountPerlanduse={AdsCountPerlanduse}
                AdsCountPerfloors={AdsCountPerfloors}
                AdsCountPerhouseclass={AdsCountPerhouseclass}
                AdsCountPerbedrooms={AdsCountPerbedrooms}
                AdsCountPerbathrooms={AdsCountPerbathrooms}
                AdsCountPerfurnishing={AdsCountPerfurnishing}
                AdsCountPeramenities={AdsCountPeramenities}
                AdsCountPertoilets={AdsCountPertoilets}
                AdsCountPerparking={AdsCountPerparking}
                AdsCountPerstatus={AdsCountPerstatus}
                AdsCountPerarea={AdsCountPerarea}
                AdsCountPerpropertysecurity={AdsCountPerpropertysecurity}
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="border rounded-lg lg:hidden">
            <SidebarSearch
              categoryList={categoryList}
              category={category}
              AdsCountPerSubcategory={AdsCountPerSubcategory}
              AdsCountPerRegion={AdsCountPerRegion}
              subcategory={subcategory}
              AdsCountPerVerifiedTrue={AdsCountPerVerifiedTrue}
              AdsCountPerVerifiedFalse={AdsCountPerVerifiedFalse}
              make={make}
              AdsCountPerColor={AdsCountPerColor}
              AdsCountPerTransmission={AdsCountPerTransmission}
              AdsCountPerFuel={AdsCountPerFuel}
              AdsCountPerCondition={AdsCountPerCondition}
              AdsCountPerCC={AdsCountPerCC}
              AdsCountPerExchange={AdsCountPerExchange}
              AdsCountPerBodyType={AdsCountPerBodyType}
              AdsCountPerRegistered={AdsCountPerRegistered}
              AdsCountPerSeats={AdsCountPerSeats}
              AdsCountPersecondCondition={AdsCountPersecondCondition}
              Types={Types}
              AdsCountPerYear={AdsCountPerYear}
              AdsCountPerlanduse={AdsCountPerlanduse}
              AdsCountPerfloors={AdsCountPerfloors}
              AdsCountPerhouseclass={AdsCountPerhouseclass}
              AdsCountPerbedrooms={AdsCountPerbedrooms}
              AdsCountPerbathrooms={AdsCountPerbathrooms}
              AdsCountPerfurnishing={AdsCountPerfurnishing}
              AdsCountPeramenities={AdsCountPeramenities}
              AdsCountPertoilets={AdsCountPertoilets}
              AdsCountPerparking={AdsCountPerparking}
              AdsCountPerstatus={AdsCountPerstatus}
              AdsCountPerarea={AdsCountPerarea}
              AdsCountPerpropertysecurity={AdsCountPerpropertysecurity}
            />
          </div>
          <div className="rounded-lg border bg-white max-w-8xl mx-auto lg:flex-row mt-0 p-1 justify-center">
            <section className="bg-white bg-dotted-pattern bg-cover bg-center py-0 md:py-0 rounded-sm">
              <div className="font-bold text-lg text-emerald-950 text-center sm:text-left p-2">
                {category} {subcategory ? <> | {subcategory}</> : "| All"}{" "}
              </div>
            </section>

            <section className="my-0">
              <div className="flex items-center gap-1 justify-between">
                <Search />
              </div>
              <div className=" bg-gray-50 rounded-lg mt-2 p-1 mb-2">
                <div className="w-full">
                  {subcategory === "Car" && (
                    <>
                      <div className="grid grid-cols-4 lg:grid-cols-7 justify-between gap-1 m-0">
                        <div
                          onClick={() => handlePrice(1, "0", "500000")}
                          className={`text-sm rounded-sm p-2 justify-center cursor-pointer ${
                            activerange === 1
                              ? "bg-[#30AF5B] text-white"
                              : "bg-[#ebf2f7] hover:bg-emerald-100"
                          }`}
                        >
                          0-500K
                        </div>

                        <div
                          onClick={() => handlePrice(2, "500000", "1000000")}
                          className={`text-sm rounded-sm p-2 justify-center cursor-pointer ${
                            activerange === 2
                              ? "bg-[#30AF5B] text-white"
                              : "bg-[#ebf2f7] hover:bg-emerald-100"
                          }`}
                        >
                          {"500K-1M"}
                        </div>

                        <div
                          onClick={() => handlePrice(3, "1000000", "2000000")}
                          className={`text-sm rounded-sm p-2 justify-center cursor-pointer ${
                            activerange === 3
                              ? "bg-[#30AF5B] text-white"
                              : "bg-[#ebf2f7] hover:bg-emerald-100"
                          }`}
                        >
                          {"1M-2M"}
                        </div>
                        <div
                          onClick={() => handlePrice(4, "2000000", "3000000")}
                          className={`text-sm rounded-sm p-2 justify-center cursor-pointer ${
                            activerange === 4
                              ? "bg-[#30AF5B] text-white"
                              : "bg-[#ebf2f7] hover:bg-emerald-100"
                          }`}
                        >
                          {"2M-3M"}
                        </div>
                        <div
                          onClick={() => handlePrice(5, "3000000", "5000000")}
                          className={`text-sm rounded-sm p-2 justify-center cursor-pointer ${
                            activerange === 5
                              ? "bg-[#30AF5B] text-white"
                              : "bg-[#ebf2f7] hover:bg-emerald-100"
                          }`}
                        >
                          {"3M-5M"}
                        </div>
                        <div
                          onClick={() => handlePrice(6, "5000000", "10000000")}
                          className={`text-sm rounded-sm p-2 justify-center cursor-pointer ${
                            activerange === 6
                              ? "bg-[#30AF5B] text-white"
                              : "bg-[#ebf2f7] hover:bg-emerald-100"
                          }`}
                        >
                          {"5M-10M"}
                        </div>
                        <div
                          onClick={() =>
                            handlePrice(7, "10000000", "9999999999")
                          }
                          className={`text-sm rounded-sm p-2 justify-center cursor-pointer ${
                            activerange === 7
                              ? "bg-[#30AF5B] text-white"
                              : "bg-[#ebf2f7] hover:bg-emerald-100"
                          }`}
                        >
                          {"Above 10M"}
                        </div>
                      </div>
                      <Menumake category={category} subcategory={subcategory} />
                      {/* This is a comment inside a JSX expression
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-2">
                          <AccordionTrigger>
                            <p className="">
                              <SearchOutlinedIcon /> Quick search
                            </p>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 lg:grid-cols-4">
                              <MakeFilter />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                       */}
                    </>
                  )}
                  {subcategory === "Buses & Microbuses" && (
                    <>
                      <Menumake category={category} subcategory={subcategory} />
                    </>
                  )}
                  {subcategory === "Trucks & Trailers" && (
                    <>
                      <MenumakeBus
                        category={category}
                        subcategory={subcategory}
                      />
                    </>
                  )}
                  {subcategory === "Motorbikes & Scooters" && (
                    <>
                      <MenumakeMotobikes
                        category={category}
                        subcategory={subcategory}
                      />
                    </>
                  )}
                  {subcategory === "Heavy Equipment" && (
                    <>
                      <MenuequipType
                        category={category}
                        subcategory={subcategory}
                      />
                    </>
                  )}
                  {subcategory === "Watercraft & Boats" && (
                    <>
                      <MenuBoats
                        category={category}
                        subcategory={subcategory}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex w-full justify-between">
                <div className="flex gap-1 flex-wrap justify-center md:justify-start items-center mb-4 md:mb-0">
                  <div
                    className={`cursor-pointer ${
                      activeButton === 0 ? "text-[#30AF5B]" : "text-gray-400"
                    }`}
                    onClick={() => handleButtonClick(0)}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <ViewModuleIcon />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Grid layout</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div
                    className={`cursor-pointer ${
                      activeButton === 1 ? "text-[#30AF5B]" : "text-gray-400"
                    }`}
                    onClick={() => handleButtonClick(1)}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <ViewListIcon />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>List layout</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div
                    className={`cursor-pointer ${
                      activeButton === 2 ? "text-[#30AF5B]" : "text-gray-400"
                    }`}
                    onClick={() => handleButtonClick(2)}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <ShareLocationOutlinedIcon />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View on Map</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="rounded-lg p-1 flex items-center">
                  <div className="text-[#30AF5B]">
                    <SwapVertIcon />
                  </div>
                  <Select onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="recommeded">
                          Recommended first
                        </SelectItem>
                        <SelectItem value="nearby">NearBy first</SelectItem>
                        <SelectItem value="new">Newest first</SelectItem>
                        <SelectItem value="lowest">
                          Lowest price first
                        </SelectItem>
                        <SelectItem value="highest">
                          Highest price first
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CollectionSearch
                data={adsData}
                emptyTitle="No ads have been created yet"
                emptyStateSubtext="Go create some now"
                // collectionType="Ads_Organized"
                limit={3}
                page={page}
                urlParamName="adsPage"
                totalPages={totalPages}
                userId={userId}
                activeButton={activeButton}
                loading={loadin}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCategory;
