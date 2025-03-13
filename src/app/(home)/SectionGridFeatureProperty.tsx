import React, { FC, ReactNode } from "react";
// import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
// import PropertyCardH from "@/components/PropertyCardH";
import HeaderFilter from "@/components/HeaderFilter";

// OTHER DEMO WILL PASS PROPS
// const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);
//
export interface SectionGridFeaturePropertyProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  // stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay1",
  subHeading = "Popular places to stay that Tripeloo recommends for you",
  headingIsCenter,
  tabs = ["Stays", "Tour & Packages", "Activities"],
}) => {
  // const renderCard = (stay: StayDataType, index: number) => {
  //   return <PropertyCardH key={index} className="h-full" data={stay} />;
  // };

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      <HeaderFilter
        tabActive={"Stays"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
      >
        {/* {stayListings.map(renderCard)} */}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureProperty;
