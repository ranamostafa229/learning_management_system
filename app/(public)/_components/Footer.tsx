import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandLinkedinFilled,
  IconBrandTwitterFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const LinkIcon = ({
  Icon,
  href,
  className,
}: {
  Icon: React.ComponentType<{ size: number; className: string }>;
  href: string;
  className?: string;
}) => {
  return (
    <Link href={href}>
      <Icon
        size={20}
        className={`hover:scale-110 hover:text-white delay-75 ease-in transition-all cursor-pointer ${
          className ?? ""
        }`}
      />
    </Link>
  );
};

const Footer = () => {
  const time = new Date().getFullYear();
  return (
    <footer className=" bg-[#292a2d] dark:bg-card py-6 mt-10 text-white dark:text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 xl:px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <Image
              src="/logo1.svg"
              alt="logo"
              width={30}
              height={50}
              priority
            />
            <p className="text-sm lg:text-base">
              &copy; {time} <span className="font-bold">Cursus.</span>All Rights
              Reserved.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <LinkIcon Icon={IconBrandFacebookFilled} href="/" />
            <LinkIcon Icon={IconBrandTwitterFilled} href="/" />
            <LinkIcon Icon={IconBrandLinkedinFilled} href="/" />
            <LinkIcon Icon={IconBrandInstagram} href="/" />
            <LinkIcon Icon={IconBrandYoutubeFilled} href="/" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
