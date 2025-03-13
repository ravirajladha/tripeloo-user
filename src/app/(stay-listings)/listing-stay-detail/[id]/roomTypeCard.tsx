import React, { FC } from 'react';
import GallerySlider from '@/components/GallerySlider';
import StartRating from '@/components/StartRating';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import SaleOffBadge from '@/components/SaleOffBadge';
import Badge from '@/shared/Badge';
import { StayDataType } from '@/data/types';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';
import { Bathtub01Icon, BedSingle01Icon, CropIcon, Share07Icon } from '../../../../components/Icons';
// import { ChevronUpIcon } from '@heroicons/react/24/solid';
export interface roomTypeCardProps {
  className?: string;
  data: {
    galleryImgs: string[]; // Array of image URLs
    title: string; // Title of the property
    // href: string; // Link to property details
    like: boolean; // Whether the property is liked
    saleOff: boolean | null; // Sale indicator
    isAds: boolean | null; // Advertisement indicator
    price: number; // Price per night
    reviewStart: number | null; // Average review score
    reviewCount: number | null; // Total number of reviews
    id: string; // Unique ID
  };
}

const roomTypeCard: FC<roomTypeCardProps> = ({
  className = '',
  data,
}) => {
  const {
    galleryImgs,
    title,
    // href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="w-full flex-shrink-0 p-3 sm:w-64">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={galleryImgs}
          className="h-full w-full overflow-hidden rounded-2xl"
          uniqueID={`roomTypeCard_${id}`}
        
        />

        {saleOff && (
          <SaleOffBadge className="absolute start-5 top-5 !bg-orange-500" />
        )}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-2">
        <div className="flex items-center gap-x-2">
          <span className="hidden sm:inline-block">
            <BedSingle01Icon className="h-4 w-4" />
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            6 beds
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="hidden sm:inline-block">
            <Bathtub01Icon className="h-4 w-4" />
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            3 baths
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="hidden sm:inline-block">
            <CropIcon className="h-4 w-4" />
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            1200 Sq. Ft.
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex flex-grow flex-col items-start p-3 sm:pe-6">
        <div className="w-full space-y-4">
          <div className="inline-flex gap-x-3">
            <Badge
              name={
                <div className="flex items-center">
                  <Share07Icon className="h-3 w-3" />
                  <span className="ms-1">4 Network</span>
                </div>
              }
            />
            <Badge
              name={
                <div className="flex items-center">
                  <UserIcon className="h-3 w-3" />
                  <span className="ms-1">Family</span>
                </div>
              }
              color="yellow"
            />
          </div>
          <div className="flex items-center gap-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{title}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700"></div>
          <div className="flex w-full items-end justify-between">
            {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
            <span className="flex items-center justify-center rounded-lg border-2 border-secondary-500 px-2.5 py-1.5 text-sm font-medium leading-none text-secondary-500">
          Price:     {`₹${price}`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-roomTypeCard group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
    >
      {/* <Link href={href} className="absolute inset-0"></Link> */}
      <div className="flex h-full w-full flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>
      <BtnLikeIcon
        colorClass="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-600 dark:text-neutral-400"
        isLiked={like}
        className="absolute end-5 top-5 sm:end-3 sm:top-3"
      />
    </div>
  );
};

export default roomTypeCard;
