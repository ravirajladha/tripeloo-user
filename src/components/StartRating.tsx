// components/StartRating.tsx

import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import React, { FC } from "react";

export interface StartRatingProps {
  className?: string;
  point?: number; // The average rating (e.g., 4.5)
  reviewCount?: number; // The total number of reviews
}

const StartRating: FC<StartRatingProps> = ({
  className = "",
  point = 0, // Default to 0 if no rating is provided
  reviewCount = 0, // Default to 0 if no reviews
}) => {
  // Calculate the number of filled, half-filled, and empty stars
  const fullStars = Math.floor(point); // Number of fully filled stars
  const hasHalfStar = point % 1 >= 0.5; // Check if there's a half star (e.g., 4.5 -> true)
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Number of empty stars

  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm ${className}`}
      data-nc-id="StartRating"
    >
      {/* Render the stars */}
      <div className="flex items-center">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <StarIconSolid
            key={`full-${index}`}
            className="w-[18px] h-[18px] text-orange-500"
          />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative w-[18px] h-[18px]">
            <StarIconOutline className="w-[18px] h-[18px] text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-[9px]">
              <StarIconSolid className="w-[18px] h-[18px] text-orange-500" />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <StarIconOutline
            key={`empty-${index}`}
            className="w-[18px] h-[18px] text-gray-300"
          />
        ))}
      </div>

      {/* Rating and review count */}
      <span className="font-medium">{point.toFixed(1)}</span>
      <span className="text-neutral-500 dark:text-neutral-400">
        ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
};

export default StartRating;