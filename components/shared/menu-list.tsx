import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import Image from "next/image";
interface MenuListProps {
  logo: string;
  href: string;
  title: string;
  keyword: string;
}

export default function MenuList({
  logo,
  href,
  title,
  keyword,
}: MenuListProps) {
  return (
    <>
      <div className="flex hover:bg-[#ebf2f7] p-1 hover:cursor-pointer">
        <span>
          <Image
            src={"/" + logo}
            alt="category"
            className="p-1"
            width={30}
            height={30}
          />
        </span>
        <span className="flex-1 text-sm hover:no-underline my-auto">
          <Link href={href}>
            <b>{title}</b>
          </Link>
        </span>
        <span className="text-right my-auto">
          <ArrowForwardIosIcon />
        </span>
      </div>
    </>
  );
}
