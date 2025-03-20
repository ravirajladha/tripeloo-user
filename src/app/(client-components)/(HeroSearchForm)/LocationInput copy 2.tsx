import React, { useState, useEffect, useRef } from "react";
import { fetchStatesAndCities } from "@/actions/fetchStatesCities"; // Make sure this function calls the backend API
import { MapPinIcon } from "@heroicons/react/24/solid";

interface LocationInputProps {
  autoFocus?: boolean;
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [stateCityPairs, setStateCityPairs] = useState<any[]>([]); // Now an array of state-city pairs

  // Fetch states and cities on component mount
  useEffect(() => {
    const getStatesAndCities = async () => {
      try {
        const data = await fetchStatesAndCities(); // Assuming the structure is { state: "name", city: "city_name" }
        setStateCityPairs(data.stateCityPairs); // This will be an array of state-city pairs
      } catch (error) {
        console.error("Error fetching states and cities:", error);
      }
    };

    getStatesAndCities();
  }, []);

  const handleSelectLocation = (state: string, city: string) => {
    setValue(`${city}, ${state}`);
    setShowPopover(false);
  };

  const renderStateCityPairs = () => {
    return stateCityPairs.map((pair, index) => (
      <div
        key={index}
        className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
        onClick={() => handleSelectLocation(pair.state, pair.city)}
      >
        <span className="block font-medium text-neutral-700 dark:text-neutral-200">
          {pair.city}, {pair.state}
        </span>
      </div>
    ));
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {renderStateCityPairs()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
