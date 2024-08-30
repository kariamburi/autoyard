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
            <div className="max-w-3xl mx-auto p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                    1. How do I post a vehicle for sale on AutoYard.co.ke?
                  </h3>
                  <p className="text-gray-700">
                    To post a vehicle, simply create an account, navigate to the
                    &quot;Sell &quot; section, and fill out the required
                    details. Upload photos, set your price, and submit your
                    listing.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                    2. Is there a fee for posting a vehicle?
                  </h3>
                  <p className="text-gray-700">
                    Posting a basic vehicle listing on AutoYard.co.ke is free.
                    However, we offer premium listing options for increased
                    visibility, which come with a small fee.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                    3. How can I contact a seller?
                  </h3>
                  <p className="text-gray-700">
                    You can contact a seller directly via the chat function on
                    the website, or by using the provided email or phone number
                    listed in the vehicle details.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                    4. What should I do if I suspect a fraudulent listing?
                  </h3>
                  <p className="text-gray-700">
                    If you suspect a fraudulent listing, please report it
                    immediately using the &quot;Report &quot; button on the
                    listing page. Our team will review and take appropriate
                    action.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                    5. How do I edit or delete my vehicle listing?
                  </h3>
                  <p className="text-gray-700">
                    You can edit or delete your listing by logging into your
                    account, navigating to &quot;My Listings, &quot; and
                    selecting the option to edit or delete the desired vehicle
                    listing.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                    6. Can I get a refund for a premium listing?
                  </h3>
                  <p className="text-gray-700">
                    Refunds for premium listings are subject to our refund
                    policy. Please review the policy or contact our support team
                    for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div>
          <Footersub />
        </div>
      </footer>
    </>
  );
};
export default Settings;
