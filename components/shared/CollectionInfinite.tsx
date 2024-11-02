"use client";
import { motion } from "framer-motion"; // Import framer-motion
import { IAd } from "@/lib/database/models/ad.model";
import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import FloatingChatIcon from "./FloatingChatIcon";
import ChatWindow from "./ChatWindow";
import SkeletonCard from "./SkeletonCard";
import { usePathname } from "next/navigation";
import { getAllAd } from "@/lib/actions/ad.actions";
import { AnyArray } from "mongoose";
import ViewListIcon from "@mui/icons-material/ViewList";
import ShareLocationOutlinedIcon from "@mui/icons-material/ShareLocationOutlined";
import StreetmapAll from "./StreetmapAll";
import SkeletonCardMobile from "./SkeletonCardMobile";
type CollectionProps = {
  // data: IAd[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  //page: number;
  //totalPages?: number;
  urlParamName?: string;
  userId: string;
  userName: string;
  userImage: string;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";

  searchText: string;
  sortby: string;
  category: string;
  subcategory: string;
  make: string;
  vehiclemodel: string;
  yearfrom: string;
  yearto: string;
  vehiclecolor: string;
  vehiclecondition: string;
  vehicleTransmissions: string;
  longitude: string;
  latitude: string;
  region: string;
  membership: string;
  vehicleFuelTypes: string;
  vehicleEngineSizesCC: string;
  vehicleexchangeposible: string;
  vehicleBodyTypes: string;
  vehicleregistered: string;
  vehicleSeats: string;
  vehiclesecordCondition: string;
  vehicleyear: string;
  Price: string;
  bedrooms: string;
  bathrooms: string;
  furnishing: string;
  amenities: any;
  toilets: string;
  parking: string;
  status: string;
  area: string;
  landuse: string;
  propertysecurity: string;
  floors: string;
  estatename: string;
  houseclass: string;
};

const CollectionInfinite = ({
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  userId,
  userName,
  userImage,
  searchText,
  sortby,
  category,
  subcategory,
  make,
  vehiclemodel,
  yearfrom,
  yearto,
  vehiclecolor,
  vehiclecondition,
  vehicleTransmissions,
  longitude,
  latitude,
  region,
  membership,
  vehicleFuelTypes,
  vehicleEngineSizesCC,
  vehicleexchangeposible,
  vehicleBodyTypes,
  vehicleregistered,
  vehicleSeats,
  vehiclesecordCondition,
  vehicleyear,
  Price,
  bedrooms,
  bathrooms,
  furnishing,
  amenities,
  toilets,
  parking,
  status,
  area,
  landuse,
  propertysecurity,
  floors,
  estatename,
  houseclass,
}: CollectionProps) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const toggleChat = () => setChatOpen(!isChatOpen);
  const pathname = usePathname();
  const isAdCreator = pathname === "/ads/";
  const [newpage, setnewpage] = useState(false);
  const [data, setAds] = useState<IAd[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const Ads = await getAllAd({
        query: searchText,
        sortby,
        category,
        subcategory,
        make,
        vehiclemodel,
        yearfrom,
        yearto,
        vehiclecolor,
        vehiclecondition,
        vehicleTransmissions,
        longitude,
        latitude,
        address: region,
        membership,
        vehicleFuelTypes,
        vehicleEngineSizesCC,
        vehicleexchangeposible,
        vehicleBodyTypes,
        vehicleregistered,
        vehicleSeats,
        vehiclesecordCondition,
        vehicleyear,
        Price,
        bedrooms,
        bathrooms,
        furnishing,
        amenities,
        toilets,
        parking,
        status,
        area,
        landuse,
        propertysecurity,
        floors,
        estatename,
        houseclass,
        page,
        limit: 20,
      });

      if (newpage) {
        setnewpage(false);
        setAds((prevAds) => [
          ...prevAds,
          ...Ads?.data.filter(
            (ad: any) => !prevAds.some((item) => item._id === ad._id)
          ),
        ]);
      } else {
        setnewpage(false);
        setAds(Ads?.data);
      }
      setTotalPages(Ads?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching ads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!newpage) setPage(1);
    fetchAds();
  }, [page, searchText]);

  const lastAdRef = (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages) {
        setnewpage(true);
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  const [isMap, setisMap] = useState(false);
  // Handler to toggle the popup
  const togglePopup = () => {
    setisMap(!isMap);
  };
  const [isButtonVisible, setIsButtonVisible] = useState(true); // State to control button visibility

  const dataRef = useRef<HTMLDivElement | null>(null); // Reference to the data div

  useEffect(() => {
    const handleScroll = () => {
      if (dataRef.current) {
        const dataDivBottom = dataRef.current.getBoundingClientRect().bottom;
        setIsButtonVisible(dataDivBottom > window.innerHeight); // Hide button if scrolled past
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <div ref={dataRef}>
          {!isMap && (
            <>
              <div className="flex flex-col items-center gap-10 p-0">
                <div className="grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
                  {data.map((ad, index) => {
                    const hasOrderLink = collectionType === "Ads_Organized";
                    const hidePrice = collectionType === "My_Tickets";

                    if (data.length === index + 1) {
                      return (
                        <motion.div
                          key={ad._id}
                          ref={lastAdRef}
                          className="flex justify-center"
                          variants={animationVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <Card
                            ad={ad}
                            hasOrderLink={hasOrderLink}
                            hidePrice={hidePrice}
                            userId={userId}
                            userImage={userImage}
                            userName={userName}
                          />
                        </motion.div>
                      );
                    } else {
                      return (
                        <motion.div
                          key={ad._id}
                          className="flex justify-center"
                          variants={animationVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <Card
                            ad={ad}
                            hasOrderLink={hasOrderLink}
                            hidePrice={hidePrice}
                            userId={userId}
                            userImage={userImage}
                            userName={userName}
                          />
                        </motion.div>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          )}
          {isMap && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} // Initial state: transparent and above its position
              animate={{ opacity: 1, y: 0 }} // Final state: fully opaque and in position
              transition={{ delay: 0.3, duration: 0.5 }} // Delay before starting motion
              className="bg-white rounded-xl p-3"
            >
              <StreetmapAll data={data} />
            </motion.div>
          )}
        </div>
      ) : (
        !loading && (
          <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
            <h3 className="font-bold text-[16px] lg:text-[25px]">
              {emptyTitle}
            </h3>
            <p className="text-sm lg:p-regular-14">{emptyStateSubtext}</p>
          </div>
        )
      )}
      {userId && (
        <>
          <FloatingChatIcon onClick={toggleChat} isOpen={isChatOpen} />
          <ChatWindow
            isOpen={isChatOpen}
            onClose={toggleChat}
            senderId={userId}
            senderName={userName}
            senderImage={userImage}
            recipientUid={"66dd62d837607af83cabf551"}
          />
        </>
      )}
      {loading && (
        <>
          <div className="hidden lg:inline mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <div className="mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
          <div className="lg:hidden mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <SkeletonCardMobile />
            <SkeletonCardMobile />
            <SkeletonCardMobile />
            <SkeletonCardMobile />
          </div>
        </>
      )}
      {isButtonVisible && data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="fixed bottom-20 lg:bottom-0 lg:right-0 lg:left-0 z-10 p-3 flex flex-col lg:justify-center lg:items-center"
        >
          <button
            onClick={togglePopup}
            className=" flex gap-1 items-center hover:bg-white hover:text-black bg-[#000000] gap-1 text-white text-sm p-3 rounded-full shadow"
          >
            {isMap ? (
              <>
                <div>
                  <ViewListIcon sx={{ fontSize: 18 }} />
                </div>
                <div className="">Show List</div>
              </>
            ) : (
              <>
                <div>
                  {" "}
                  <ShareLocationOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                <div className="">Show Map</div>
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CollectionInfinite;
