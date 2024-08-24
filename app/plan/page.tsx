import { getAllPackages } from "@/lib/actions/packages.actions";
import Image from "next/image";
import { getData } from "@/lib/actions/transactionstatus";
import { getUserById } from "@/lib/actions/user.actions";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@clerk/nextjs/server";
import Listpackages from "@/components/shared/listpackages";

const Packages = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const user = await getUserById(userId);
  const packagesList = await getAllPackages();
  let daysRemaining = 0;
  let planpackage = "Free";
  let subscription: any = [];
  //console.log("-------" + user);
  try {
    subscription = await getData(userId);
    // Step 1: Parse createdAt date string into a Date object
    const createdAtDate = new Date(subscription[0].createdAt);
    planpackage = subscription[0].plan;
    // Step 2: Extract the number of days from the period string
    const periodDays = parseInt(subscription[0].period);

    // Step 3: Calculate expiration date by adding period days to createdAt date
    const expirationDate = new Date(
      createdAtDate.getTime() + periodDays * 24 * 60 * 60 * 1000
    );
    // Step 4: Calculate the number of days remaining until the expiration date
    const currentDate = new Date();
    daysRemaining = Math.ceil(
      (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  } catch {}
  if (!subscription && !user && !packagesList) {
    return (
      <div className="flex-center h-screen w-full bg-[#ebf2f7] bg-dotted-pattern bg-cover bg-fixed bg-center">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 top-0 z-10 fixed w-full">
          <div className="p-3">
            <Navbar userstatus="User" userId={userId || ""} />
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20">
          <div className="flex gap-1 items-center">
            <Image
              src="/assets/icons/loading.gif"
              alt="edit"
              width={60}
              height={60}
            />
            Loading...
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 top-0 fixed w-full">
        <div className="p-3">
          <Navbar userstatus="User" userId={userId} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex mt-20 mb-20 p-1">
        {/*  <div className="hidden lg:inline mr-5">
          <div className="bg-white w-full rounded-lg p-3">
            <NavItems userstatus={"user"} userId={userId} />
          </div>
        </div>
*/}
        <div className="flex-1">
          {/*<div className="bg-white rounded-lg lg:hidden">
            <div className="">
              <NavItemsMobile userstatus={"user"} userId={userId} />
            </div>
          </div>
          */}
          <div className="rounded-lg border bg-white max-w-6xl mx-auto flex flex-col lg:flex-row mt-3">
            <div className="lg:flex-1 bg-white p-5 ml-2 mr-5">
              <section className="bg-grey-50 bg-dotted-pattern bg-cover bg-center py-0 md:py-0 rounded-sm">
                <p className="text-[25px] font-bold">Plan</p>
                <div className="wrapper flex">
                  <div className="text-center sm:text-left">
                    {daysRemaining > 0 ? (
                      <>
                        <div className="flex flex-col">
                          <div className="font-bold">
                            Subscription: {planpackage}
                          </div>
                          <div>Days remaining: {daysRemaining}</div>
                        </div>
                      </>
                    ) : (
                      <>Choose the plan that will work for you</>
                    )}
                  </div>
                </div>
              </section>
              <Listpackages
                packagesList={packagesList}
                userId={userId}
                daysRemaining={daysRemaining}
                packname={planpackage}
                user={user}
              />
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;
