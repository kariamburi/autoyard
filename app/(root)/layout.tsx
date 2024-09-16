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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  let user: any = [];
  if (userId) {
    user = await getUserById(userId);
  }

  //console.log(user.status);
  return (
    <div className="min-h-screen">
      <Head>
        <title>AutoYard</title>
        <meta
          name="description"
          content="AutoYard | Where Every Ride Finds a Buyer"
        />
        <meta property="og:title" content="AutoYard" />
        <meta
          property="og:description"
          content="Welcome to AutoYard.co.ke, Kenya's premier online marketplace for buying and selling vehicles. Whether you're in the market for a car, motorbike, bus, pickup, or even heavy-duty and agricultural machinery, we provide a trusted platform that connects buyers and sellers across the country."
        />
        <meta property="og:image" content="/assets/images/logo.png" />
        <meta property="og:url" content="https://autoyard.co.ke" />
        
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
        <main className="flex-1">{children}</main>
        <Toaster />
        <div className="mt-5 w-full hidden lg:inline">
          <Image
            src="/footer-png-8.png"
            alt=""
            className="mx-auto"
            layout="responsive" // Makes the image responsive
            width={800}
            height={50}
          />
        </div>
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
  );
}
