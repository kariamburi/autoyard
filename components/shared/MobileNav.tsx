import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
//import NavItems from "./NavItems";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import NavItems from "./NavItems";
type MobileProps = {
  userstatus: string;
  userId: string;
};
const MobileNav = ({ userstatus, userId }: MobileProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleclicklink = () => {
    setIsSheetOpen(false);
  };
  return (
    <nav className="">
      <Sheet open={isSheetOpen}>
        <SheetTrigger
          className="align-middle"
          onClick={() => {
            setIsSheetOpen(true);
          }}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full text-white tooltip tooltip-bottom hover:cursor-pointer">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent
          className="flex flex-col gap-6 bg-white"
          onClick={handleclicklink}
        >
          <SheetTitle>
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden">
                <Image
                  src="/assets/images/logo_2.jpg"
                  alt="logo"
                  width={26}
                  height={26}
                />
              </div>
              <span className="text-emerald-900">Wheels</span>
            </div>
          </SheetTitle>
          <Separator className="border border-gray-50" />
          <NavItems userstatus={userstatus} userId={userId} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
