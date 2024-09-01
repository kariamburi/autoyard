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
const Safety = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

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
            <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Safety Tips for AutoYard.co.ke
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-orange-600 mb-2">
                    For Sellers:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      Verify Buyer Information: Always verify the buyer&apos;s
                      identity before sharing personal details or arranging
                      meetings. Request a phone number and confirm it.
                    </li>
                    <li>
                      Meet in Public Places: Arrange to meet potential buyers in
                      well-populated, public places, preferably during daylight
                      hours.
                    </li>
                    <li>
                      Bring a Friend: If possible, bring a friend or family
                      member to any meetings with buyers. Never go alone to a
                      meeting, especially if it&apos;s in a less familiar
                      location.
                    </li>
                    <li>
                      Avoid Sharing Personal Information: Do not share personal
                      details like your home address or financial information.
                      Communicate through the platform&apos;s chat or email
                      features.
                    </li>
                    <li>
                      Secure Payment: Be cautious of accepting checks or money
                      orders. Prefer cash or verified electronic transfers. Make
                      sure the payment is completed and verified before handing
                      over the vehicle or its documents.
                    </li>
                    <li>
                      Document Everything: Keep a record of all communication
                      with the buyer, including emails, messages, and call logs.
                      Document the transaction details and any agreements made.
                    </li>
                    <li>
                      Trust Your Instincts: If something feels off or too good
                      to be true, trust your instincts and reconsider the deal.
                      It&apos;s better to be safe than sorry.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">
                    For Buyers:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      Research the Seller: Before contacting a seller, research
                      their profile and reviews if available. Be cautious of
                      sellers with little to no history on the platform.
                    </li>
                    <li>
                      Inspect the Vehicle: Always inspect the vehicle in person
                      before making a purchase. Ensure that the vehicle is in
                      the condition described in the listing.
                    </li>
                    <li>
                      Meet in Safe Locations: Arrange to meet the seller in a
                      public place. Avoid secluded areas and always choose a
                      location where you feel safe.
                    </li>
                    <li>
                      Avoid Sending Money in Advance: Never send money or make a
                      payment before seeing the vehicle in person. Scammers
                      often ask for payments upfront and then disappear.
                    </li>
                    <li>
                      Check the Vehicle Documents: Verify that the seller has
                      the proper ownership documents and that they are
                      legitimate. Check the vehicle&apos;s history for any
                      outstanding issues like liens or accidents.
                    </li>
                    <li>
                      Bring a Mechanic: If possible, bring a trusted mechanic to
                      inspect the vehicle. They can help identify any potential
                      issues that may not be obvious during a casual inspection.
                    </li>
                    <li>
                      Use Secure Payment Methods: Use secure payment methods
                      like escrow services or bank transfers. Avoid cash
                      transactions if possible, and ensure the payment is secure
                      before completing the purchase.
                    </li>
                    <li>
                      Stay Vigilant: Be aware of red flags such as unusually low
                      prices, rushed sales, or requests for payments through
                      non-traditional methods. If something seems suspicious, it
                      probably is.
                    </li>
                  </ul>
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
export default Safety;
