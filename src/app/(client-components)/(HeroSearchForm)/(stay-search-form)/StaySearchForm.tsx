import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import SearchButtonSubmit from "../SearchButtonSubmit";
import { useFilter } from "../../../../../src/context/LocationContext";
import { fetchAllStays } from "@/actions/getAllStays";

const StaySearchForm: FC<{}> = ({ }) => {
  // const { location, filters } = useFilter();
  const { location, filters, setFilters } = useFilter();

  const [loading, setLoading] = useState(false);
  const [stays, setStays] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null); // State for start date
  const [endDate, setEndDate] = useState<Date | null>(null);

    // Default values for rooms, adults, and children
 // State for rooms, adults, and children
 const [rooms, setRooms] = useState(1);  // Default rooms
 const [adults, setAdults] = useState(2);  // Default adults
 const [children, setChildren] = useState(1);  // Default children

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("API Params from StaySearchForm:", { state: location.state, city: location.city, ...filters });
    const formattedStartDate = startDate
    ? startDate.toLocaleDateString("en-CA") // Canada format (yyyy-mm-dd)
    : null;
  const formattedEndDate = endDate
    ? endDate.toLocaleDateString("en-CA") // Canada format (yyyy-mm-dd)
    : null;

    console.log(formattedStartDate, "date sample")
    // Trigger the API call directly from the form
    setLoading(true); // Start loading
    try {
      const params = {
        state: location.state,
        city: location.city,
        ...filters,
        formattedStartDate,
        formattedEndDate,
        rooms,           // Use dynamic value for rooms
        adults,         // Use dynamic value for adults
        children,     // Default number of children
      };

      const data = await fetchAllStays(params);
      setStays(data);
      setLoading(false);

      setFilters(filters);

    } catch (err) {
      console.error("Error fetching stays:", err);
      setError("Failed to fetch stays.");
      setLoading(false);
    }
  };

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 " onSubmit={handleSubmit}>
        <LocationInput className="flex-[1.5]" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <StayDatesRangeInput
          className="flex-1"
          setStartDate={setStartDate}  // Pass the setter function for startDate
          setEndDate={setEndDate}      // Pass the setter function for endDate
        />        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
     <GuestsInput 
          className="flex-1" 
          setRooms={setRooms}         // Pass setter for rooms
          setAdults={setAdults}       // Pass setter for adults
          setChildren={setChildren}   // Pass setter for children
        />
        <div className="pr-2 mt-3">
          <SearchButtonSubmit onClick={handleSubmit} />

        </div>
      </form>
    );
  };

  return (
    <div>
      {renderForm()}
      {loading && <div>Loading stays...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {stays.length > 0 && (
        <div>
          {/* <h3>Found Stays:</h3> */}
          <div>
            {stays.map((stay, index) => (
              <div key={index}>
                <p>{stay.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaySearchForm;
