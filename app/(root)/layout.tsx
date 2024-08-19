import Footer from "@/components/shared/Footer";
//import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/actions/user.actions";
//import { auth } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
//import { UpdateUserParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";
import Navbar from "@/components/shared/navbar";
//import ChatWindow from "@/components/shared/ChatWindow";

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
    <div className="">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-3">
        {user ? (
          <Navbar userstatus={user.status} userId={userId} />
        ) : (
          <Navbar userstatus="User" userId="" />
        )}
      </div>
      <main className="flex-1">{children}</main>
      <Toaster />
      <div className="mt-5">
        <img src="/footer-png-8.png" alt="city logo" className="mx-auto" />
      </div>
      <footer className="bg-white">
        <Footer />
      </footer>
    </div>
  );
}
