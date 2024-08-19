import Header from "@/components/shared/Header";
import dynamic from "next/dynamic";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { getAllCategories } from "@/lib/actions/category.actions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
//import Collection from "@/components/shared/Collection";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Link from "next/link";
const Menumobile = dynamic(() => import("@/components/shared/Menumobile"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-wrap mt-10 gap-1 justify-center">
        <Skeleton
          variant="rectangular"
          animation="wave"
          //  height={100}
          className="rounded-sm w-[100px] md:w-[150px] lg:w-[150px]"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          // height={100}
          className="rounded-sm w-[100px] md:w-[150px] lg:w-[150px]"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          // height={100}
          className="rounded-sm w-[100px] md:w-[150px] lg:w-[150px]"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          // height={100}
          className="rounded-sm w-[100px] md:w-[150px] lg:w-[150px]"
        />
      </div>
    </div>
  ),
});
export default async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userName = sessionClaims?.userName as string;
  const userImage = sessionClaims?.userImage as string;

  const categoryList = await getAllCategories();

  return (
    <main>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950">
        <Header />
      </div>

      <div className="max-w-6xl mx-auto flex mt-2 ">
        <div className="flex-1">
          <div className="p-0">
            <Menumobile categoryList={categoryList} />
          </div>
          <div className="p-2 mt-2">
            <div className="flex w-full items-center justify-between gap-5 p-2 md:flex-row">
              <div className="items-center flex">
                <h2 className="h2-bold p-5">Trending Ads</h2>
              </div>

              <SignedIn>
                <Link href="/ads/create">
                  <button
                    className={`w-[150px] bg-gradient-to-b from-[#4DCE7A] to-[#30AF5B] hover:bg-[#30AF5B] text-white p-2 rounded-full`}
                  >
                    <AddCircleOutlineOutlinedIcon /> SELL
                  </button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in">
                  <button
                    className={`w-[150px] bg-gradient-to-b from-[#4DCE7A] to-[#30AF5B] hover:bg-[#30AF5B] text-white p-2 rounded-lg`}
                  >
                    <AddCircleOutlineOutlinedIcon /> SELL
                  </button>
                </Link>
              </SignedOut>
            </div>
            COLLECTION
          </div>
        </div>
      </div>
    </main>
  );
}
