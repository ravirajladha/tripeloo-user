import React, { FC, ReactNode } from "react";
import Image from "next/image";
import imagePng from "@/images/hero-right-3.png";

export interface SectionHero2Props {
  className?: string;
  currentPage?: string;
  heading?: string;
currentTab?:string,
  subheading?: string;
    listingType?: ReactNode;
  
  children?: React.ReactNode;
}

const SectionHero2: FC<SectionHero2Props> = ({
  className = "",
  currentPage="",
  currentTab="",
  heading = "Find Exciting Activities",
  subheading = "",
  children,
}) => {
  return (
    <div className={`nc-SectionHero2 relative ${className}`}>
      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow">
        <Image fill className="object-cover" src={imagePng} alt="hero" />
      </div>
      <div className="relative py-14 lg:py-20">
        <div className="relative inline-flex">
          <div className="w-screen right-20 md:right-52 inset-y-0 absolute bg-primary-500"></div>
          <div className="relative max-w-3xl inline-flex flex-shrink-0 flex-col items-start py-16 sm:py-20 lg:py-24 space-y-8 sm:space-y-10 text-white">
            <h2 className="font-semibold text-red-700 text-4xl md:text-5xl xl:text-7xl !leading-[110%]">
              {heading}
            </h2>
            {subheading && (
              <p className="text-lg md:text-xl text-white">{subheading}</p>
            )}
            {children}
          </div>
        </div>
        <div className="hidden lg:block lg:mt-20 w-full">
          Filter coming soon
          {/* Placeholder for a future filter */}
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;
