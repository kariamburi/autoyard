import { ICategory } from "@/lib/database/models/category.model";
import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter, useSearchParams } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  formUrlQuerymultiple,
  formUrlQuery,
  removeKeysFromQuery,
} from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SignalWifiStatusbarNullOutlinedIcon from "@mui/icons-material/SignalWifiStatusbarNullOutlined";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import CategoryFilterSearch from "./CategoryFilterSearch";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import InvertColorsOutlinedIcon from "@mui/icons-material/InvertColorsOutlined";
import FormatPaintOutlinedIcon from "@mui/icons-material/FormatPaintOutlined";
import FormatStrikethroughOutlinedIcon from "@mui/icons-material/FormatStrikethroughOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import SignalWifiStatusbarConnectedNoInternet4OutlinedIcon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4Outlined";
import { Input } from "../ui/input";
import {
  BusesMake,
  automotivePartsCategories,
  automotivePartsMakes,
  boatTypes,
  equipmentMakes,
  equipmentTypes,
  interiorVehicleColors,
  motorcycleMakes,
  truckMakes,
  truckTypes,
  vehicleBodyTypes,
  vehicleColors,
  vehicleConditions,
  vehicleFuelTypes,
  vehicleModels,
  vehicleRegistered,
  vehicleSeats,
  vehicleSecondConditions,
  vehicleTransmissions,
} from "@/constants";
type sidebarProps = {
  category: string;
  categoryList?: any;
  AdsCountPerSubcategory?: any;
  AdsCountPerRegion?: any;
  subcategory?: string;
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

const SidebarSearchmobile = ({
  category,
  categoryList,
  AdsCountPerSubcategory,
  AdsCountPerRegion,
  subcategory,
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
  AdsCountPerYear,
  Types,
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
}: sidebarProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  //const [Region, setRegion] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);
  //console.log(AdsCountPerCondition);
  const handleShowMore = () => {
    setShowMore(true);
  };
  const handleQuery = (index: number, query: string) => {
    let newUrl = "";
    if (query) {
      newUrl = formUrlQuerymultiple({
        params: "",
        updates: {
          category: category.toString(),
          subcategory: query.toString(),
        },
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["subcategory"],
      });
    }
    setQuery(query);
    router.push(newUrl, { scroll: false });
  };

  const [selectedRegion, setSelectedRegion] = useState("All Kenya");

  const handleRegionClick = (regionId: any) => {
    // Update the selected region state

    let newUrl = "";
    if (regionId) {
      newUrl = formUrlQuerymultiple({
        params: "",
        updates: {
          category: category.toString(),
          region: regionId.toString(),
        },
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["region"],
      });
    }
    setSelectedRegion(regionId);
    closeDialog();
    router.push(newUrl, { scroll: false });
    // Perform any other actions you need
  };

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");

  const [activerange, setactiverange] = useState(20);
  const handlePrice = (index: number, min: string, max: string) => {
    setactiverange(index);
    let newUrl = "";
    if (min) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "Price",
        value: min + "-" + max,
      });
      setminPrice(min);
      setmaxPrice(max);
    } else {
      setminPrice("");
      setmaxPrice("");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["Price"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  const handlebutton = () => {
    let newUrl = "";

    if (minPrice && maxPrice) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "Price",
        value: minPrice + "-" + maxPrice,
      });
    } else {
      setminPrice("");
      setmaxPrice("");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["Price"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  const onSelectPriceClear = () => {
    let newUrl = "";
    newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["Price"],
    });

    setminPrice("");
    setmaxPrice("");
    setactiverange(20);
    router.push(newUrl, { scroll: false });
  };

  const [selectedOption, setSelectedOption] = useState("all");
  const [selectedConditionOption, setselectedConditionOption] = useState("all");
  const [selectedColorOption, setselectedColorOption] = useState("all");
  const [selectedTransmissionOption, setselectedTransmissionOption] =
    useState("all");
  const [selectedFuelOption, setselectedFuelOption] = useState("all");
  const [selectedBodyOption, setselectedBodyOption] = useState("all");
  const [selectedCCOption, setselectedCCOption] = useState("all");
  const [selectedRegisteredOption, setselectedRegisteredOption] =
    useState("all");

  const [selectedExchangeOption, setselectedExchangeOption] = useState("all");

  const [selectedSeatsOption, setselectedSeatsOption] = useState("all");

  const [selectedSecondOption, setselectedSecondOption] = useState("all");

  const [selectedMakeOption, setselectedMakeOption] = useState("all");

  const [selectedYearOption, setselectedYearOption] = useState("all");

  const [selectedTypesOption, setselectedTypesOption] = useState("all");

  const [selectedhouseclassOption, setselectedhouseclassOption] =
    useState("all");

  const handlehouseclassChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedhouseclassOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "houseclass",
        value: event.target.value,
      });
    } else {
      setselectedhouseclassOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["houseclass"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [selectedfloorsOption, setselectedfloorsOption] = useState("all");

  const handlefloorsChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedfloorsOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "floors",
        value: event.target.value,
      });
    } else {
      setselectedfloorsOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["floors"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [selectedpropertysecurityOption, setselectedpropertysecurityOption] =
    useState("all");

  const handlepropertysecurityChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedpropertysecurityOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "propertysecurity",
        value: event.target.value,
      });
    } else {
      setselectedpropertysecurityOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["propertysecurity"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [selectedlanduseOption, setselectedlanduseOption] = useState("all");

  const handlelanduseChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedlanduseOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "landuse",
        value: event.target.value,
      });
    } else {
      setselectedlanduseOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["landuse"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  const [selectedareaOption, setselectedareaOption] = useState("all");

  const handleareaChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedareaOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "area",
        value: event.target.value,
      });
    } else {
      setselectedareaOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["area"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [selectedstatusOption, setselectedstatusOption] = useState("all");

  const handlestatusChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedstatusOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "status",
        value: event.target.value,
      });
    } else {
      setselectedstatusOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["status"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [selectedparkingOption, setselectedparkingOption] = useState("all");

  const handleparkingChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedparkingOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "parking",
        value: event.target.value,
      });
    } else {
      setselectedparkingOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["parking"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  const [selectedtoiletsOption, setselectedtoiletsOption] = useState("all");

  const handletoiletsChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedtoiletsOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "toilets",
        value: event.target.value,
      });
    } else {
      setselectedtoiletsOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["toilets"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  const [selectedamenitiesOption, setselectedamenitiesOption] = useState("all");

  const handleamenitiesChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedamenitiesOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "amenities",
        value: event.target.value,
      });
    } else {
      setselectedamenitiesOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["amenities"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [selectedfurnishingOption, setselectedfurnishingOption] =
    useState("all");

  const handlefurnishingChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedfurnishingOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "furnishing",
        value: event.target.value,
      });
    } else {
      setselectedfurnishingOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["furnishing"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [selectedbathroomsOption, setselectedbathroomsOption] = useState("all");

  const handlebathroomsChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedbathroomsOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "bathrooms",
        value: event.target.value,
      });
    } else {
      setselectedbathroomsOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["bathrooms"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [selectedbedroomsOption, setselectedbedroomsOption] = useState("all");

  const handlebedroomsChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedbedroomsOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "bedrooms",
        value: event.target.value,
      });
    } else {
      setselectedbedroomsOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["bedrooms"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const handleTypesChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedTypesOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "Types",
        value: event.target.value,
      });
    } else {
      setselectedTypesOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["Types"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const handleMakeChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedMakeOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "make",
        value: event.target.value,
      });
    } else {
      setselectedMakeOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["make"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const handleSecondChange = (event: any) => {
    let newUrl = "";
    alert(event.target.value);
    if (event.target.value) {
      //   setselectedSecondOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehiclesecordCondition",
        value: event.target.value,
      });
    } else {
      // setselectedSecondOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehiclesecordCondition"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleSeatsChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedSeatsOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehicleSeats",
        value: event.target.value,
      });
    } else {
      setselectedSeatsOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehicleSeats"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleExchangeChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedExchangeOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehicleexchangeposible",
        value: event.target.value,
      });
    } else {
      setselectedExchangeOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehicleexchangeposible"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleRegisteredChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedRegisteredOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehicleregistered",
        value: event.target.value,
      });
    } else {
      setselectedRegisteredOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehicleregistered"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleCCChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedCCOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehicleEngineSizesCC",
        value: event.target.value,
      });
    } else {
      setselectedCCOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehicleEngineSizesCC"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleYearChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedYearOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehicleyear",
        value: event.target.value,
      });
    } else {
      setselectedYearOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehicleyear"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const handleBodyChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedBodyOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehicleBodyTypes",
        value: event.target.value,
      });
    } else {
      setselectedBodyOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehicleBodyTypes"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleFuelChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedFuelOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehicleFuelTypes",
        value: event.target.value,
      });
    } else {
      setselectedFuelOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehicleFuelTypes"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleTransmissionChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedTransmissionOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehicleTransmissions",
        value: event.target.value,
      });
    } else {
      setselectedTransmissionOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehicleTransmissions"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleColorChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedColorOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehiclecolor",
        value: event.target.value,
      });
    } else {
      setselectedColorOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehiclecolor"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleConditionChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      setselectedConditionOption(event.target.value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "vehiclecondition",
        value: event.target.value,
      });
    } else {
      setselectedConditionOption("all");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["vehiclecondition"],
      });
    }

    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const handleChange = (event: any) => {
    let newUrl = "";

    if (event.target.value) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "membership",
        value: event.target.value,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["membership"],
      });
    }
    setSelectedOption(event.target.value);
    router.push(newUrl, { scroll: false });
    //alert(event.target.value);
  };

  const [vehicleyearfrom, setvehicleyearfrom] = useState("");
  const [vehicleyearto, setvehicleyearto] = useState("");
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let year = currentYear; year >= 1960; year--) {
    years.push(year.toString());
  }

  const onSelectYearClear = () => {
    let newUrl = "";

    newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["yearfrom", "yearto"],
    });

    router.push(newUrl, { scroll: false });
  };
  const onSelectYear = () => {
    let newUrl = "";

    if (vehicleyearfrom && vehicleyearto) {
      newUrl = formUrlQuerymultiple({
        params: searchParams.toString(),
        updates: {
          yearfrom: vehicleyearfrom,
          yearto: vehicleyearto,
        },
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["yearfrom", "yearto"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const [totalMake, settotalMake] = useState(0);
  const [totalColor, settotalColor] = useState(0);
  const [totalTransmission, settotalTransmission] = useState(0);
  const [totalFuel, settotalFuel] = useState(0);
  const [totalCondition, settotalCondition] = useState(0);
  const [totalCC, settotalCC] = useState(0);
  const [totalExchange, settotalExchange] = useState(0);
  const [totalBody, settotalBody] = useState(0);
  const [totalRegistered, settotalRegistered] = useState(0);
  const [totalSeats, settotalSeats] = useState(0);
  const [totalSecond, settotalSecond] = useState(0);
  const [totalRegion, settotalRegion] = useState(0);
  const [totalVerifiedAll, settotalVerifiedAll] = useState(0);

  const [totalYear, settotalYear] = useState(0);
  const [totalTypes, settotalTypes] = useState(0);
  const [totallanduse, settotallanduse] = useState(0);
  const [totalfloors, settotalfloors] = useState(0);
  const [totalhouseclass, settotalhouseclass] = useState(0);
  const [totalbedrooms, settotalbedrooms] = useState(0);
  const [totalbathrooms, settotalbathrooms] = useState(0);
  const [totalfurnishing, settotalfurnishing] = useState(0);
  const [totalamenities, settotalamenities] = useState(0);
  const [totaltoilets, settotaltoilets] = useState(0);
  const [totalparking, settotalparking] = useState(0);
  const [totalstatus, settotalstatus] = useState(0);
  const [totalarea, settotalarea] = useState(0);
  const [totalpropertysecurity, settotalpropertysecurity] = useState(0);
  useEffect(() => {
    try {
      const totalpropertysecurity = AdsCountPerpropertysecurity.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotalpropertysecurity(totalpropertysecurity); // Output: 4

      const totalarea = AdsCountPerarea.reduce((total: any, current: any) => {
        // Parse the adCount value to a number, ignore if it's not a valid number
        const adCount = parseInt(current.adCount);
        return !isNaN(adCount) ? total + adCount : total;
      }, 0);
      settotalarea(totalarea); // Output: 4

      const totalstatus = AdsCountPerstatus.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotalstatus(totalstatus); // Output: 4

      const totalparking = AdsCountPerparking.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotalparking(totalparking); // Output: 4

      const totaltoilets = AdsCountPertoilets.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotaltoilets(totaltoilets); // Output: 4

      const totaladbathrooms = AdsCountPerbathrooms.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotalbathrooms(totaladbathrooms); // Output: 4

      const totalbedrooms = AdsCountPerbedrooms.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotalbedrooms(totalbedrooms); // Output: 4

      const totalhouseclass = AdsCountPerhouseclass.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotalhouseclass(totalhouseclass); // Output: 4

      const totalfloors = AdsCountPerfloors.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotalfloors(totalfloors); // Output: 4

      const totallanduse = AdsCountPerlanduse.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );
      settotallanduse(totallanduse); // Output: 4

      const totalAdCountType = Types.reduce((total: any, current: any) => {
        // Parse the adCount value to a number, ignore if it's not a valid number
        const adCount = parseInt(current.adCount);
        return !isNaN(adCount) ? total + adCount : total;
      }, 0);
      settotalTypes(totalAdCountType); // Output: 4

      const totalAdCountYear = AdsCountPerYear.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalYear(totalAdCountYear); // Output: 4

      const totalAdCount = make.reduce((total: any, current: any) => {
        // Parse the adCount value to a number, ignore if it's not a valid number
        const adCount = parseInt(current.adCount);
        return !isNaN(adCount) ? total + adCount : total;
      }, 0);

      settotalMake(totalAdCount); // Output: 4

      const totalAdCountColor = AdsCountPerColor.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalColor(totalAdCountColor); // Output: 4

      const totalAdCountTransmission = AdsCountPerTransmission.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalTransmission(totalAdCountTransmission); // Output: 4

      const totalAdCountFuel = AdsCountPerFuel.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalFuel(totalAdCountFuel); // Output: 4

      const totalAdCountCondition = AdsCountPerCondition.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalCondition(totalAdCountCondition); // Output: 4

      const totalAdCountCC = AdsCountPerCC.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalCC(totalAdCountCC); // Output: 4

      const totalAdCountExchange = AdsCountPerExchange.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalExchange(totalAdCountExchange); // Output: 0

      const totalAdCountBody = AdsCountPerBodyType.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalBody(totalAdCountBody); // Output: 0

      const totalAdCountRegistered = AdsCountPerRegistered.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalRegistered(totalAdCountRegistered); // Output: 0

      const totalAdCountSeats = AdsCountPerSeats.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalSeats(totalAdCountSeats); // Output: 0

      const totalAdCountSecond = AdsCountPersecondCondition.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalSecond(totalAdCountSecond); // Output: 0

      const totalAdCountRegion = AdsCountPerRegion.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const adCount = parseInt(current.adCount);
          return !isNaN(adCount) ? total + adCount : total;
        },
        0
      );

      settotalRegion(totalAdCountRegion); // Output: 0

      const totalAdCountVerified = AdsCountPerVerifiedTrue.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const totalAds = parseInt(current.totalAds);
          return !isNaN(totalAds) ? total + totalAds : total;
        },
        0
      );

      const totalAdCountVerifiedFalse = AdsCountPerVerifiedFalse.reduce(
        (total: any, current: any) => {
          // Parse the adCount value to a number, ignore if it's not a valid number
          const totalAds = parseInt(current.totalAds);
          return !isNaN(totalAds) ? total + totalAds : total;
        },
        0
      );

      settotalVerifiedAll(totalAdCountVerifiedFalse + totalAdCountVerified); // Output: 0
    } catch (error) {
      console.error("Error fetching data:", error);
      // setHasError(true);
    } finally {
      // setIsLoading(false);
    }
  }, [
    AdsCountPerRegion,
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
    AdsCountPerVerifiedTrue,
    AdsCountPerVerifiedFalse,
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
  ]);

  return (
    <>
      <ScrollArea className="h-[500px] w-full  bg-white rounded-t-md border p-1">
        <div className="flex flex-col items-center w-full">
          <div className="text-sm mt-2 w-full p-4">
            <div className="flex gap-1 items-center font-bold">
              <LocationOnIcon sx={{ fontSize: 16 }} />
              Location
            </div>
            <Dialog open={isOpen}>
              <DialogTrigger asChild>
                <div
                  onClick={() => openDialog()}
                  className="flex cursor-pointer text-sm text-gray-500 rounded-sm p-1 justify-between items-center"
                >
                  {selectedRegion}
                  <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>
                    <div className="text-sm w-full">
                      <div className="flex text-sm text-gray-950 w-full gap-1 items-center mt-1 mb-1">
                        All Kenya -{category}
                        <div className="text-xs text-emerald-600">
                          | {totalRegion} ads
                        </div>
                      </div>
                    </div>
                  </DialogTitle>
                  <div className="w-full bg-white">
                    <div
                      onClick={closeDialog}
                      className="absolute top-2 right-2 z-30 bg-white"
                    >
                      <button className="bg-white">
                        <CloseIcon className="bg-white" sx={{ fontSize: 24 }} />
                      </button>
                    </div>
                  </div>
                </DialogHeader>

                <div className="w-full">
                  <Command className="rounded-lg border">
                    <CommandInput placeholder="search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Regions">
                        <ScrollArea className="w-full h-full">
                          {AdsCountPerRegion &&
                            AdsCountPerRegion.map(
                              (region: any, index: number) => (
                                <>
                                  <CommandItem
                                    key={index}
                                    onSelect={() =>
                                      handleRegionClick(region._id)
                                    }
                                    // Attach onClick event handler
                                    className={`flex bg-white w-full p-1 text-sm border-b justify-between ${
                                      selectedRegion === region._id
                                        ? "bg-emerald-100"
                                        : "" // Highlight selected item
                                    }`}
                                  >
                                    <div> {region._id}</div>{" "}
                                    <div className="text-emerald-600 flex gap-1">
                                      {" "}
                                      {region.adCount} ads{" "}
                                      <ArrowForwardIosIcon
                                        sx={{ fontSize: 14 }}
                                      />
                                    </div>
                                  </CommandItem>
                                </>
                              )
                            )}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="text-sm mt-2 w-full p-4">
            <div className="flex gap-1 mb-1 items-center font-bold no-underline">
              <VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} />
              Verified sellers
            </div>

            <div>
              <div className="w-full text-xs">
                <div className="flex w-full gap-2 p-1">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    value="all"
                    checked={selectedOption === "all"}
                    onChange={handleChange}
                  />
                  <div>Show All</div>
                  <div>|</div>
                  <div className="text-emerald-600 flex gap-1 mr-2">
                    {totalVerifiedAll}
                    <div>ads</div>
                  </div>
                </div>

                <div className="flex w-full gap-2 p-1">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    value="verified"
                    checked={selectedOption === "verified"}
                    onChange={handleChange}
                  />
                  <div className="flex w-full gap-1 items-center mt-1 mb-1">
                    Verified sellers
                    <div className="flex text-xs gap-1 text-emerald-600">
                      |{" "}
                      {AdsCountPerVerifiedTrue.length > 0
                        ? AdsCountPerVerifiedTrue[0].totalAds
                        : 0}
                      <div>ads</div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-2 p-1">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    value="unverified"
                    checked={selectedOption === "unverified"}
                    onChange={handleChange}
                  />
                  <div className="flex w-full gap-1 items-center mt-1 mb-1">
                    Unverified sellers
                    <div className="flex text-xs gap-1 text-emerald-600">
                      |{" "}
                      {AdsCountPerVerifiedFalse.length > 0
                        ? AdsCountPerVerifiedFalse[0].totalAds
                        : 0}
                      <div>ads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm mt-1 rounded-lg w-full bg-white p-4">
            <div className="grid grid-cols-2 gap-1">
              <TextField
                value={minPrice}
                label="Min Price*"
                className="text-sm"
                onChange={(e) => setminPrice(e.target.value)}
              />

              <TextField
                value={maxPrice}
                label="Max Price*"
                className="text-sm"
                onChange={(e) => setmaxPrice(e.target.value)}
              />
            </div>
          </div>

          {subcategory === "Car" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleModels"
                    options={[{ make: "All" }, ...vehicleModels]}
                    getOptionLabel={(option) => option.make}
                    value={
                      vehicleModels.find(
                        (cond: any) => cond.make === searchParams.get("make")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "make",
                          value: newValue.make, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["make"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.make}</span>
                        {option.make === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalMake}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(make &&
                                make.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.make
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Make*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Vehicle Parts & Accessories" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="automotivePartsCategories"
                    options={[{ name: "All" }, ...automotivePartsCategories]}
                    getOptionLabel={(option) => option.name}
                    value={
                      automotivePartsCategories.find(
                        (cond: any) => cond.name === searchParams.get("Types")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "Types",
                          value: newValue.name, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["Types"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.name}</span>
                        {option.mane === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalTypes}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(Types &&
                                Types.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.name
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Type*" />
                    )}
                  />
                </div>
              </div>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="automotivePartsMakes"
                    options={[{ make: "All" }, ...automotivePartsMakes]}
                    getOptionLabel={(option) => option.make}
                    value={
                      automotivePartsMakes.find(
                        (cond: any) => cond.make === searchParams.get("make")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "make",
                          value: newValue.make, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["make"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.make}</span>
                        {option.make === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalMake}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(make &&
                                make.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.make
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Make*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Trucks & Trailers" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="truckTypes"
                    options={[{ type: "All" }, ...truckTypes]}
                    getOptionLabel={(option) => option.type}
                    value={
                      truckTypes.find(
                        (cond: any) => cond.type === searchParams.get("Types")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "Types",
                          value: newValue.type, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["Types"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.type}</span>
                        {option.type === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalTypes}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(Types &&
                                Types.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.type
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Type*" />
                    )}
                  />
                </div>
              </div>

              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="truckMakes"
                    options={[{ make: "All" }, ...truckMakes]}
                    getOptionLabel={(option) => option.make}
                    value={
                      truckMakes.find(
                        (cond: any) => cond.make === searchParams.get("make")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "make",
                          value: newValue.make, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["make"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.make}</span>
                        {option.make === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalMake}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(make &&
                                make.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.make
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Make*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Heavy Equipment" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="equipmentTypes"
                    options={[{ type: "All" }, ...equipmentTypes]}
                    getOptionLabel={(option) => option.type}
                    value={
                      equipmentTypes.find(
                        (cond: any) => cond.type === searchParams.get("Types")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "Types",
                          value: newValue.type, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["Types"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.type}</span>
                        {option.type === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalTypes}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(Types &&
                                Types.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.type
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Type*" />
                    )}
                  />
                </div>
              </div>

              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="equipmentMakes"
                    options={[{ make: "All" }, ...equipmentMakes]}
                    getOptionLabel={(option) => option.make}
                    value={
                      equipmentMakes.find(
                        (cond: any) => cond.make === searchParams.get("make")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "make",
                          value: newValue.make, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["make"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.make}</span>
                        {option.make === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalMake}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(make &&
                                make.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.make
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Make*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Motorbikes & Scooters" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="motorcycleMakes"
                    options={[{ make: "All" }, ...motorcycleMakes]}
                    getOptionLabel={(option) => option.make}
                    value={
                      motorcycleMakes.find(
                        (cond: any) => cond.make === searchParams.get("make")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "make",
                          value: newValue.make, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["make"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.make}</span>
                        {option.make === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalMake}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(make &&
                                make.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.make
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Make*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Buses & Microbuses" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="BusesMake"
                    options={[{ make: "All" }, ...BusesMake]}
                    getOptionLabel={(option) => option.make}
                    value={
                      BusesMake.find(
                        (cond: any) => cond.make === searchParams.get("make")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "make",
                          value: newValue.make, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["make"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.make}</span>
                        {option.make === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalMake}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(make &&
                                make.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.make
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Make*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Watercraft & Boats" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="boatTypes"
                    options={[{ type: "All" }, ...boatTypes]}
                    getOptionLabel={(option) => option.type}
                    value={
                      boatTypes.find(
                        (cond: any) => cond.type === searchParams.get("Types")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "Types",
                          value: newValue.type, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["Types"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.type}</span>
                        {option.type === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalTypes}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(Types &&
                                Types.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.type
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Type*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {(subcategory === "Car" ||
            subcategory === "Buses & Microbuses" ||
            subcategory === "Motorbikes & Scooters" ||
            subcategory === "Heavy Equipment" ||
            subcategory === "Trucks & Trailers" ||
            subcategory === "Watercraft & Boats") && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-4">
                <div className="grid grid-cols-2 gap-1">
                  <Autocomplete
                    id="vehicleyearfrom"
                    options={years}
                    getOptionLabel={(option) => option}
                    value={years.find((yr) => yr === vehicleyearfrom) || null}
                    onChange={(event, newValue) => {
                      setvehicleyearfrom(newValue ?? "");
                    }}
                    renderInput={(field) => (
                      <TextField {...field} label="From" className="text-xs" />
                    )}
                  />

                  <Autocomplete
                    id="vehicleyearto"
                    options={years}
                    getOptionLabel={(option) => option}
                    value={years.find((yr) => yr === vehicleyearto) || null}
                    onChange={(event, newValue) => {
                      setvehicleyearto(newValue ?? "");
                    }}
                    renderInput={(field) => (
                      <TextField {...field} label="To" className="text-xs" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {(subcategory === "Car" ||
            subcategory === "Buses & Microbuses" ||
            subcategory === "Motorbikes & Scooters" ||
            subcategory === "Heavy Equipment" ||
            subcategory === "Trucks & Trailers" ||
            subcategory === "Vehicle Parts & Accessories" ||
            subcategory === "Watercraft & Boats") && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleConditions"
                    options={["All", ...vehicleConditions]}
                    getOptionLabel={(option) => option}
                    value={
                      vehicleConditions.find(
                        (cond) => cond === searchParams.get("vehiclecondition")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehiclecondition",
                          value: newValue, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehiclecondition"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option}</span>
                        {option === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalCondition}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPerCondition &&
                                AdsCountPerCondition.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Conditions*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {(subcategory === "Car" ||
            subcategory === "Buses & Microbuses" ||
            subcategory === "Motorbikes & Scooters") && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleColors"
                    options={["All", ...vehicleColors]}
                    getOptionLabel={(option) => option}
                    value={
                      vehicleColors.find(
                        (cond) => cond === searchParams.get("vehiclecolor")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehiclecolor",
                          value: newValue, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehiclecolor"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option}</span>
                        {option === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalColor}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPerColor &&
                                AdsCountPerColor.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Body Color*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {(subcategory === "Car" ||
            subcategory === "Buses & Microbuses" ||
            subcategory === "Motorbikes & Scooters" ||
            subcategory === "Trucks & Trailers") && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleTransmissions"
                    options={["All", ...vehicleTransmissions]}
                    getOptionLabel={(option) => option}
                    value={
                      vehicleTransmissions.find(
                        (cond) =>
                          cond === searchParams.get("vehicleTransmissions")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehicleTransmissions",
                          value: newValue, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehicleTransmissions"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option}</span>
                        {option === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalTransmission}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPerTransmission &&
                                AdsCountPerTransmission.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Transmission*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {(subcategory === "Car" || subcategory === "Buses & Microbuses") && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleFuelTypes"
                    options={["All", ...vehicleFuelTypes]}
                    getOptionLabel={(option) => option}
                    value={
                      vehicleFuelTypes.find(
                        (cond) => cond === searchParams.get("vehicleFuelTypes")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehicleFuelTypes",
                          value: newValue, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehicleFuelTypes"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option}</span>
                        {option === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalFuel}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPerFuel &&
                                AdsCountPerFuel.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Fuel*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Car" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleBodyTypes"
                    options={[{ type: "All" }, ...vehicleBodyTypes]}
                    getOptionLabel={(option) => option.type}
                    value={
                      vehicleBodyTypes.find(
                        (cond: any) =>
                          cond.type === searchParams.get("vehicleBodyTypes")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehicleBodyTypes",
                          value: newValue.type, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehicleBodyTypes"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option.type}</span>
                        {option.type === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalBody}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPerBodyType &&
                                AdsCountPerBodyType.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option.type
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Body Type*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Car" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleEngineSizesCC"
                    options={[
                      { _id: "All", adCount: totalCC },
                      ...AdsCountPerCC,
                    ]}
                    getOptionLabel={(option) => option._id}
                    value={
                      AdsCountPerCC.find(
                        (cond: any) =>
                          cond._id === searchParams.get("vehicleEngineSizesCC")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehicleEngineSizesCC",
                          value: newValue._id, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehicleEngineSizesCC"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option._id}</span>

                        <span className="flex gap-1 text-xs text-emerald-600">
                          {option.adCount ?? 0}
                          <span>ads</span>
                        </span>
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Engine Size*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {(subcategory === "Car" ||
            subcategory === "Buses & Microbuses" ||
            subcategory === "Motorbikes & Scooters") && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleRegistered"
                    options={["All", ...vehicleRegistered]}
                    getOptionLabel={(option) => option}
                    value={
                      vehicleRegistered.find(
                        (cond) => cond === searchParams.get("vehicleRegistered")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehicleRegistered",
                          value: newValue, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehicleRegistered"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option}</span>
                        {option === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalRegistered}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPerRegistered &&
                                AdsCountPerRegistered.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Registered*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {(subcategory === "Car" ||
            subcategory === "Buses & Microbuses" ||
            subcategory === "Motorbikes & Scooters" ||
            subcategory === "Heavy Equipment" ||
            subcategory === "Trucks & Trailers" ||
            subcategory === "Watercraft & Boats") && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleexchangeposible"
                    options={["All", ...vehicleRegistered]}
                    getOptionLabel={(option) => option}
                    value={
                      vehicleRegistered.find(
                        (cond) =>
                          cond === searchParams.get("vehicleexchangeposible")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehicleexchangeposible",
                          value: newValue, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehicleexchangeposible"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option}</span>
                        {option === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalExchange}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPerExchange &&
                                AdsCountPerExchange.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Exchange Possible*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {subcategory === "Car" && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleSeats"
                    options={["All", ...vehicleSeats]}
                    getOptionLabel={(option) => option}
                    value={
                      vehicleSeats.find(
                        (cond) => cond === searchParams.get("vehicleSeats")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehicleSeats",
                          value: newValue, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehicleSeats"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option}</span>
                        {option === "All" ? (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalSeats}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPerSeats &&
                                AdsCountPerSeats.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Seats No*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {(subcategory === "Car" || subcategory === "Buses & Microbuses") && (
            <>
              <div className="text-sm mt-1 rounded-lg w-full bg-white p-2">
                <div className="w-full p-2">
                  <Autocomplete
                    id="vehicleSecondConditions"
                    options={["All", ...vehicleSecondConditions]}
                    getOptionLabel={(option) => option}
                    value={
                      vehicleSecondConditions.find(
                        (cond) =>
                          cond === searchParams.get("vehiclesecordCondition")
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      let newUrl = "";
                      if (newValue) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: "vehiclesecordCondition",
                          value: newValue, // Here, newValue will be the option string itself
                        });
                      } else {
                        newUrl = removeKeysFromQuery({
                          params: searchParams.toString(),
                          keysToRemove: ["vehiclesecordCondition"],
                        });
                      }
                      router.push(newUrl, { scroll: false });
                    }}
                    renderOption={(props: any, option: any) => (
                      <div
                        {...props}
                        className="justify-between flex p-1 m-1 rounded-sm hover:cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-sm">{option}</span>
                        {option === "All" ? (
                          <>
                            {" "}
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {totalSecond}
                              <span>ads</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-1 text-xs text-emerald-600">
                              {(AdsCountPersecondCondition &&
                                AdsCountPersecondCondition.find(
                                  (item: { _id: string; adCount: number }) =>
                                    item._id === option
                                )?.adCount) ??
                                0}
                              <span>ads</span>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    renderInput={(field) => (
                      <TextField {...field} label="Second Conditions*" />
                    )}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default SidebarSearchmobile;
