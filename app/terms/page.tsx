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
            <div className="terms-and-conditions p-6 bg-gray-50 text-gray-800">
              <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>

              <p className="mb-4">
                Welcome to WheelMart.co.ke! By using our website, you agree to
                comply with and be bound by the following terms and conditions.
                Please review them carefully. If you do not agree to these
                terms, you should not use this website.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using WheelMart.co.ke, you accept and agree to
                be bound by the terms and provision of this agreement. In
                addition, when using WheelMart.co.ke&apos;s services, you shall
                be subject to any posted guidelines or rules applicable to such
                services, which may be posted and modified from time to time.
                All such guidelines or rules are hereby incorporated by
                reference into the Terms of Service.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                2. User Obligations
              </h2>
              <p className="mb-4">
                Users agree to provide accurate and complete information when
                listing vehicles for sale. You must not post any misleading or
                false information, and you are responsible for ensuring that the
                vehicle you are listing complies with all applicable laws and
                regulations. You must not use WheelMart.co.ke to engage in any
                illegal activities.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                3. Listing Guidelines
              </h2>
              <p className="mb-4">
                Users must list vehicles in the appropriate category and ensure
                that all descriptions, prices, and images are accurate. Any
                listings that violate our guidelines, are deemed inappropriate,
                or are fraudulent will be removed without notice.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                4. Payment and Fees
              </h2>
              <p className="mb-4">
                WheelMart.co.ke may charge fees for listing vehicles or for
                other premium services. These fees will be clearly outlined on
                the website, and users will be notified of any applicable
                charges before using a paid service.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                5. No Guarantee of Sale
              </h2>
              <p className="mb-4">
                WheelMart.co.ke does not guarantee that your vehicle will be
                sold within a certain time frame or at all. We are not
                responsible for any transactions that occur between buyers and
                sellers and do not act as a mediator in any disputes.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                6. User Conduct
              </h2>
              <p className="mb-4">
                Users are prohibited from:
                <ul className="list-disc list-inside ml-6">
                  <li>Posting any illegal or fraudulent content.</li>
                  <li>
                    Engaging in harassment, abusive behavior, or spamming other
                    users.
                  </li>
                  <li>
                    Attempting to hack, disrupt, or interfere with the website’s
                    operation.
                  </li>
                  <li>Violating any intellectual property rights.</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                7. Intellectual Property
              </h2>
              <p className="mb-4">
                All content on WheelMart.co.ke, including text, images, logos,
                and design, is the property of WheelMart.co.ke or its content
                suppliers and is protected by intellectual property laws. Users
                may not copy, reproduce, distribute, or create derivative works
                from any part of this site without express permission.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                8. Limitation of Liability
              </h2>
              <p className="mb-4">
                WheelMart.co.ke is not responsible for any damages that may
                arise from your use of this website. This includes direct,
                indirect, incidental, consequential, or punitive damages, even
                if WheelMart.co.ke has been advised of the possibility of such
                damages.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                9. Modifications to Terms
              </h2>
              <p className="mb-4">
                WheelMart.co.ke reserves the right to change these terms and
                conditions at any time. Any changes will be posted on this page,
                and it is the responsibility of users to review these terms
                regularly. Continued use of the site after any such changes
                constitutes your acceptance of the new terms.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                10. Termination of Use
              </h2>
              <p className="mb-4">
                WheelMart.co.ke reserves the right to terminate or suspend your
                access to the website, without notice, for conduct that
                WheelMart.co.ke believes violates these Terms and Conditions or
                is harmful to other users, WheelMart.co.ke, or third parties, or
                for any other reason.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                11. Governing Law
              </h2>
              <p className="mb-4">
                These terms and conditions are governed by and construed in
                accordance with the laws of Kenya. You agree to submit to the
                exclusive jurisdiction of the courts located within Kenya for
                the resolution of any disputes arising from these terms and
                conditions or your use of WheelMart.co.ke.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                12. Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about these terms and conditions,
                please contact us at:
                <a
                  href="mailto:support@wheelmart.co.ke"
                  className="text-blue-600 hover:underline"
                >
                  support@wheelmart.co.ke
                </a>
              </p>
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
