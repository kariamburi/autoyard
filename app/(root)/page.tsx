import dynamic from "next/dynamic";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { getAllCategories } from "@/lib/actions/category.actions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Link from "next/link";
import { getAllAd } from "@/lib/actions/ad.actions";
//import MenuSubmobile from "@/components/shared/MenuSubmobile";
//import Collection from "@/components/shared/Collection";
import { createUser, getUserById } from "@/lib/actions/user.actions";
import { getfcmTokenFromCookie } from "@/lib/actions/cookies";
import CollectionInfinite from "@/components/shared/CollectionInfinite";
import AppPopup from "@/components/shared/AppPopup ";
import TrendingAds from "@/components/shared/TrendingAds ";
import SkeletonMenu from "@/components/shared/SkeletonMenu";
import Navbarhome from "@/components/shared/navbarhome";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/shared/Footer";
import BottomNavigation from "@/components/shared/BottomNavigation";
import Head from "next/head";
import PageSkeleton from "@/components/shared/PageSkeleton";

const MenuSubmobile = dynamic(
  () => import("@/components/shared/MenuSubmobile"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full">
        <div className="hidden lg:inline">
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-1">
            <SkeletonMenu />
            <SkeletonMenu />
            <SkeletonMenu />
            <SkeletonMenu />
            <SkeletonMenu />
            <SkeletonMenu />
            <SkeletonMenu />
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-1">
          <SkeletonMenu />
          <SkeletonMenu />
          <SkeletonMenu />
          <SkeletonMenu />
          <SkeletonMenu />
          <SkeletonMenu />
        </div>
      </div>
    ),
  }
);
export default async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userName = sessionClaims?.userName as string;
  const userImage = sessionClaims?.userImage as string;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const sortby = (searchParams?.sortby as string) || "recommeded";
  const category = (searchParams?.category as string) || "";
  const subcategory = (searchParams?.subcategory as string) || "";
  const make = (searchParams?.make as string) || "";
  const vehiclemodel = (searchParams?.vehiclemodel as string) || "";
  const yearfrom = (searchParams?.yearfrom as string) || "";
  const yearto = (searchParams?.yearto as string) || "";
  const Price = (searchParams?.Price as string) || "";
  const vehiclecolor = (searchParams?.vehiclecolor as string) || "";
  const vehiclecondition = (searchParams?.vehiclecondition as string) || "";
  const longitude = (searchParams?.longitude as string) || "";
  const latitude = (searchParams?.latitude as string) || "";
  const region = (searchParams?.region as string) || "";
  const membership = (searchParams?.membership as string) || "";
  const vehicleTransmissions =
    (searchParams?.vehicleTransmissions as string) || "";
  const vehicleFuelTypes = (searchParams?.vehicleFuelTypes as string) || "";
  const vehicleEngineSizesCC =
    (searchParams?.vehicleEngineSizesCC as string) || "";
  const vehicleexchangeposible =
    (searchParams?.vehicleexchangeposible as string) || "";
  const vehicleBodyTypes = (searchParams?.vehicleBodyTypes as string) || "";
  const vehicleregistered = (searchParams?.vehicleregistered as string) || "";
  const vehicleSeats = (searchParams?.vehicleSeats as string) || "";
  const vehiclesecordCondition =
    (searchParams?.vehiclesecordCondition as string) || "";

  const vehicleyear = (searchParams?.vehicleyear as string) || "";

  const bedrooms = (searchParams?.bedrooms as string) || "";

  const bathrooms = (searchParams?.bathrooms as string) || "";

  const furnishing = (searchParams?.furnishing as string) || "";

  const amenities = (searchParams?.amenities as string[]) || "";

  const toilets = (searchParams?.toilets as string) || "";

  const parking = (searchParams?.parking as string) || "";

  const status = (searchParams?.status as string) || "";

  const area = (searchParams?.area as string) || "";

  const landuse = (searchParams?.landuse as string) || "";

  const propertysecurity = (searchParams?.propertysecurity as string) || "";
  const floors = (searchParams?.floors as string) || "";
  const estatename = (searchParams?.estatename as string) || "";
  const houseclass = (searchParams?.houseclass as string) || "";
  const categoryList = await getAllCategories();
  // const Ads = await getAllAd({
  //   query: searchText,
  //   sortby: sortby,
  //  category,
  //   subcategory,
  //  make: make,
  //  vehiclemodel: vehiclemodel,
  //  yearfrom: yearfrom,
  //  yearto: yearto,
  //   vehiclecolor: vehiclecolor,
  //  vehiclecondition: vehiclecondition,
  //  vehicleTransmissions: vehicleTransmissions,
  //  longitude: longitude,
  //  latitude: latitude,
  //   address: region,
  //  membership: membership,
  //  vehicleFuelTypes: vehicleFuelTypes,
  //  vehicleEngineSizesCC: vehicleEngineSizesCC,
  //  vehicleexchangeposible: vehicleexchangeposible,
  //  vehicleBodyTypes: vehicleBodyTypes,
  //  vehicleregistered: vehicleregistered,
  //  vehicleSeats: vehicleSeats,
  //  vehiclesecordCondition: vehiclesecordCondition,
  //   vehicleyear: vehicleyear,
  //   Price: Price,
  //   bedrooms: bedrooms,
  // bathrooms: bathrooms,
  //  furnishing: furnishing,
  //  amenities: amenities,
  //  toilets: toilets,
  //  parking: parking,
  //   status: status,
  //   area: area,
  //  landuse: landuse,
  //  propertysecurity: propertysecurity,
  //  floors: floors,
  //  estatename: estatename,
  //   houseclass: houseclass,
  //   page,
  //   limit: 20,
  // });

  let user: any = [];
  if (userId) {
    user = await getUserById(userId);
  }
  if (!categoryList) {
    return <PageSkeleton />;
  }

  return (
    <main>
      <div className="min-h-screen">
        <Head>
          <title>AutoYard | Buy and Sell Vehicles in Kenya</title>
          <meta
            name="description"
            content="AutoYard.co.ke is Kenya's leading online vehicle marketplace. Buy or sell cars, motorbikes, buses, pickups, heavy-duty machinery, and more with ease."
          />
          <meta
            property="og:title"
            content="AutoYard | Buy and Sell Vehicles in Kenya"
          />
          <meta
            property="og:description"
            content="Welcome to AutoYard.co.ke, the trusted platform for buying and selling vehicles across Kenya. Find your perfect ride or sell your vehicle today!"
          />
          <meta property="og:image" content="/assets/images/logo.png" />
          <meta property="og:url" content="https://autoyard.co.ke" />
          <meta property="og:type" content="website" />
          <meta
            name="keywords"
            content="AutoYard, buy vehicles, sell vehicles, cars, motorbikes, buses, machinery, Kenya"
          />
          <meta name="author" content="AutoYard" />
          <link rel="canonical" href="https://autoyard.co.ke" />
        </Head>

        <div className="w-full h-full">
          <div className="sm:hidden fixed top-0 z-10 w-full">
            {user ? (
              <Navbarhome userstatus={user.status} userId={userId} />
            ) : (
              <Navbarhome userstatus="User" userId="" />
            )}
          </div>
          <div className="hidden sm:inline">
            <div className="w-full">
              {user ? (
                <Navbarhome userstatus={user.status} userId={userId} />
              ) : (
                <Navbarhome userstatus="User" userId="" />
              )}
            </div>{" "}
          </div>
          <div className="max-w-6xl mx-auto flex mt-0">
            <div className="flex-1 w-full">
              <div className="mt-[190px] sm:mt-0 w-full">
                <MenuSubmobile categoryList={categoryList} />
              </div>
              <div className="p-2 mt-2 mb-20 lg:mb-0">
                <div className="flex w-full items-center justify-between gap-5 p-2 md:flex-row">
                  <TrendingAds />
                </div>
                <CollectionInfinite
                  emptyTitle="No Ads Found"
                  emptyStateSubtext="Come back later"
                  collectionType="All_Ads"
                  limit={8}
                  userId={userId}
                  userName={userName}
                  userImage={userImage}
                  searchText={searchText}
                  sortby={sortby}
                  category={category}
                  subcategory={subcategory}
                  make={make}
                  vehiclemodel={vehiclemodel}
                  yearfrom={yearfrom}
                  yearto={yearto}
                  vehiclecolor={vehiclecolor}
                  vehiclecondition={vehiclecondition}
                  vehicleTransmissions={vehicleTransmissions}
                  longitude={longitude}
                  latitude={latitude}
                  region={region}
                  membership={membership}
                  vehicleFuelTypes={vehicleFuelTypes}
                  vehicleEngineSizesCC={vehicleEngineSizesCC}
                  vehicleexchangeposible={vehicleexchangeposible}
                  vehicleBodyTypes={vehicleBodyTypes}
                  vehicleregistered={vehicleregistered}
                  vehicleSeats={vehicleSeats}
                  vehiclesecordCondition={vehiclesecordCondition}
                  vehicleyear={vehicleyear}
                  Price={Price}
                  bedrooms={bedrooms}
                  bathrooms={bathrooms}
                  furnishing={furnishing}
                  amenities={amenities}
                  toilets={toilets}
                  parking={parking}
                  status={status}
                  area={area}
                  landuse={landuse}
                  propertysecurity={propertysecurity}
                  floors={floors}
                  estatename={estatename}
                  houseclass={houseclass}
                />
              </div>
            </div>
          </div>
          <Toaster />
          {/*  <div className="mt-5 w-full hidden lg:inline">
          <Image
            src="/footer-png-8.png"
            alt=""
            className="mx-auto"
            layout="responsive" // Makes the image responsive
            width={800}
            height={50}
          />
        </div>*/}
          <footer className="bg-white">
            <div className="hidden lg:inline">
              <Footer />
            </div>
            <div className="lg:hidden">
              <BottomNavigation userId={userId} />
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
