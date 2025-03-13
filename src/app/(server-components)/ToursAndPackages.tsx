import React, { FC } from "react";
import imagePng from "@/images/hero-right-3.png";
import Image from "next/image";
import HeroTourAndPackageSearchForm from "../(client-components)/(HeroSearchForm)/(tour-and-package-search-form)/HeroTourAndPackageSearchForm";
import HeroSearchForm from "../(client-components)/(HeroSearchForm)/HeroSearchForm";

export interface SectionHero2ArchivePageProps {
  className?: string;
}

const SectionHero2ArchivePage: FC<SectionHero2ArchivePageProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-SectionHero2ArchivePage relative ${className}`}
      data-nc-id="SectionHero2ArchivePage"
    >
      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow">
        <Image fill className="object-cover" src={imagePng} alt="hero" />
      </div>
      <div className="relative py-14 ">
        <div className="relative inline-flex">
          <div className="w-screen right-10 md:right-32 inset-y-0 absolute bg-primary-500"></div>
          <div className="relative max-w-3xl inline-flex flex-shrink-0 flex-col items-start py-16 sm:py-20 space-y-8 sm:space-y-10 text-white">
            <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            Tours and Packages
             {/* <span className="ml-12"></span><span className="ml-12"></span><span className="ml-12"></span><span className="ml-12"></span> */}
            </h2>
            <div className="flex items-center text-base md:text-lg ">
              {/* <i className="text-2xl las la-map-marked"></i>
              <span className="ml-2.5">Jappan </span> */}
              <span className="mx-5"></span>
              <i className="text-2xl las la-home"></i>
              <span className="ml-2.5">112 activites</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:block mt-10 w-full">
          {/* <HeroTourAndPackageSearchForm /> */}
          <HeroSearchForm/>
        </div>
      </div>
    </div>
  );
};

export default SectionHero2ArchivePage;
