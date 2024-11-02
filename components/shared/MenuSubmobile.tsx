"use client";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuerymultiple, removeKeysFromQuery } from "@/lib/utils";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";

type Subcategory = {
  title: string;
};

type Category = {
  imageUrl: string;
  name: string;
  _id: string;
  subcategory: Subcategory[];
};

type MobileProps = {
  categoryList: Category[];
};

export default function MenuSubmobile({ categoryList }: MobileProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = (subcategory: string) => {
    let newUrl = "";
    if (subcategory) {
      newUrl = formUrlQuerymultiple({
        params: "",
        updates: {
          category: "Vehicle",
          subcategory: subcategory.toString(),
        },
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["subcategory"],
      });
    }

    router.push("/category/" + newUrl, { scroll: false });
  };

  const vehicleCategory = categoryList.find(
    (category) => category.name === "Vehicle"
  );

  // Define animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const hoverEffect = { scale: 1.1 };

  return (
    <div className="mx-auto mt-10">
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 m-1 gap-1">
        <SignedIn>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            whileHover={hoverEffect}
            className="hidden lg:inline h-[100px] bg-emerald-500 shadow-xl text-white flex flex-col items-center justify-center cursor-pointer rounded-xl p-1 border-0 border-emerald-300 hover:bg-emerald-600"
            onClick={() => router.push("/ads/create")}
          >
            <div className="flex flex-col items-center text-center justify-center">
              <div className="h-12 w-12 rounded-full p-2">
                <AddCircleOutlineOutlinedIcon />
              </div>
              <h2 className="text-lg font-bold">SELL</h2>
            </div>
          </motion.div>
        </SignedIn>

        <SignedOut>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            whileHover={hoverEffect}
            className="hidden lg:inline h-[100px] shadow-xl bg-emerald-500 text-white flex flex-col items-center justify-center cursor-pointer rounded-xl p-1 border-0 border-emerald-300 hover:bg-emerald-600"
            onClick={() => router.push("/sign-in")}
          >
            <div className="flex flex-col items-center text-center justify-center">
              <div className="h-12 w-12 rounded-full p-2">
                <AddCircleOutlineOutlinedIcon />
              </div>
              <h2 className="text-lg font-bold">SELL</h2>
            </div>
          </motion.div>
        </SignedOut>

        {vehicleCategory?.subcategory.map((sub, index) => (
          <motion.div
            key={sub.title}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: index * 0.1 }}
            whileHover={hoverEffect}
            onClick={() => handleCategory(sub.title)}
            className="h-[100px] bg-white flex flex-col items-center justify-center cursor-pointer rounded-xl p-1 border-0 border-emerald-300 hover:bg-emerald-100"
          >
            <div className="flex flex-col items-center text-center justify-center">
              <div className="rounded-full bg-white p-2">
                <Image
                  className="w-full h-full object-cover"
                  src={"/" + sub.title + ".png"}
                  alt={sub.title}
                  width={60}
                  height={60}
                />
              </div>
              <h2 className="text-xs">{sub.title}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
