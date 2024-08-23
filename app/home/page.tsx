"use server";

import HomeDashboard from "@/components/shared/HomeDashboard";
import Navbar from "@/components/shared/navbar";
import { auth } from "@clerk/nextjs/server";

const Home = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userName = sessionClaims?.userName as string;
  const userImage = sessionClaims?.userImage as string;

  return (
    <>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 fixed z-10 top-0 w-full">
        <div className="p-3">
          <Navbar userstatus="User" userId={userId} />
        </div>
      </div>
      <div className="w-full flex mt-20 mb-0 p-1">
        <HomeDashboard
          userId={userId}
          userName={userName}
          userImage={userImage}
        />
      </div>
    </>
  );
};

export default Home;
