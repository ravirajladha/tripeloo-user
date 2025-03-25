// components/StarRatingInput.tsx

import React, { FC, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface StarRatingInputProps {
  onChange: (rating: number) => void;
  initialRating?: number;
  className?: string;
}

const StarRatingInput: FC<StarRatingInputProps> = ({
  onChange,
  initialRating = 0,
  className = "",
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            (hoverRating || rating) >= star ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
};

export default StarRatingInput;