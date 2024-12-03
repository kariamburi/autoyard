import Footer from "@/components/shared/Footer";
//import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/actions/user.actions";
//import { auth } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
//import { UpdateUserParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import BottomNavigation from "@/components/shared/BottomNavigation";
import Navbarhome from "@/components/shared/navbarhome";
import ClientFCMHandler from "@/components/shared/ClientFCMHandler";
import Head from "next/head";
import dynamic from "next/dynamic";
import SkeletonSearch from "@/components/shared/SkeletonSearch";
//const Navbarhome = dynamic(() => import("@/components/shared/navbarhome"), {
// ssr: false,
// loading: () => (
//   <div className="items-center justify-center w-full">
//     <div className="w-full grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 m-1 gap-1 items-center justify-center">
//       <SkeletonSearch />
//     </div>
//   </div>
//  ),
//});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //console.log(user.status);
  return <main className="flex-1">{children}</main>;
}
