// components/StayCard.tsx

import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { StayDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { Route } from "next"; // Ensure this import matches your project's setup

export interface StayCardProps {
  className?: string;
  data?: StayDataType;
  size?: "default" | "small";
}

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data,
}) => {
  console.log(data, "inside main stay card");

  // Ensure data is not undefined or null
  const {
    images = [{ url: "/placeholder-image.jpg" }], // Provide default placeholder image
    title = "Untitled Stay",
    state_name = "Unknown State",
    city_name = "Unknown City",
    price = 0,
    adults = 0,
    children = 0,
    average_rating = 0, // Use average_rating from data
    total_reviews = 0, // Use total_reviews from data
    stayType = "Unknown Stay Type", // Use stayType from data
    amenities = [], // Use amenities from data
    standoutAmenities = [], // Use standoutAmenities from data
    checkin_time = "N/A",
    checkout_time = "N/A",
    like = false, // Default to not liked
    saleOff = null, // Default to no sale
    isAds = null,
    id,
  } = data || {};

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={images.map((img) => img.url)}
          imageClass="rounded-lg"
          href={`/listing-stay-detail/${id}` as Route<string>} // Explicitly cast the string to Route<string>
        />
        <BtnLikeIcon isLiked={like || false} className="absolute right-3 top-3 z-[1]" />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "mt-3 space-y-3" : "mt-2 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === "default" && (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{`${city_name}, ${state_name}`}</span>
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>{stayType}</span>
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              Guests: {adults} Adults, {children} Children
            </span>
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              Check-in: {checkin_time} | Check-out: {checkout_time}
            </span>
          </div>
          {amenities.length > 0 && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              <span>Amenities: {amenities.join(", ")}</span>
            </div>
          )}
          {standoutAmenities.length > 0 && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              <span>Standout Amenities: {standoutAmenities.join(", ")}</span>
            </div>
          )}
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            ₹{price}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span>
            )}
          </span>
          <StartRating
            point={average_rating}
            reviewCount={total_reviews}
            className="text-sm"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-StayCard group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={`/listing-stay-detail/${id}`}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard;