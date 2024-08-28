import Navbar from "@/components/shared/navbar";
import SettingsEdit from "@/components/shared/SettingsEdit";
import { getUserById } from "@/lib/actions/user.actions";
import { Toaster } from "@/components/ui/toaster";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { auth } from "@clerk/nextjs/server";
import Verification from "@/components/shared/Verification";
import Image from "next/image";
import BottomNavigation from "@/components/shared/BottomNavigation";
import Footersub from "@/components/shared/Footersub";
const Settings = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const user = await getUserById(userId);
  const isAdCreator = true;
  if (!user) {
    return (
      <div className="flex-center h-screen w-full bg-[#ebf2f7] bg-dotted-pattern bg-cover bg-fixed bg-center">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 top-0 z-10 fixed w-full">
          <div className="p-2">
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
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 z-10 top-0 fixed w-full">
        <div className="p-2">
          <Navbar userstatus="User" userId={userId} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto flex mt-20 p-1">
        <div className="hidden lg:inline mr-5"></div>

        <div className="flex-1">
          <div className="rounded-lg border bg-white max-w-6xl mx-auto lg:flex-row mt-0 p-1 justify-center">
            <section className="w-full bg-grey-50 bg-dotted-pattern bg-cover bg-center py-0 md:py-0 rounded-sm">
              <div className="w-full flex items-center justify-center lg:justify-between">
                <div className="flex text-lg gap-1 font-bold w-full">
                  <SettingsOutlinedIcon />
                  <h3 className="font-bold text-[25px]">Settings</h3>
                </div>

                <Verification
                  user={user}
                  userId={userId}
                  isAdCreator={isAdCreator}
                />
              </div>
            </section>

            <div className="p-1 bg-white text-lg font-bold breadcrumbs mx-auto text-center relative rounded-md"></div>

            <SettingsEdit user={user} type="Update" userId={userId} />
            <Toaster />
          </div>
        </div>
      </div>
      <footer>
        <div className="hidden lg:inline">
          <Footersub />
        </div>
        <div className="lg:hidden">
          <BottomNavigation userId={userId} />
        </div>
      </footer>
    </>
  );
};
export default Settings;
