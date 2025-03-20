import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import SearchButtonSubmit from "../SearchButtonSubmit";
import { useFilter } from "../../../../../src/context/LocationContext"; 
import { fetchAllStays } from "@/actions/getAllStays"; 

const StaySearchForm: FC<{}> = ({ }) => {
  const { location, filters } = useFilter();
  const [loading, setLoading] = useState(false);
  const [stays, setStays] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("API Params from StaySearchForm:", { state: location.state, city: location.city, ...filters });

    // Trigger the API call directly from the form
    setLoading(true); // Start loading
    try {
      const params = {
        state: location.state,
        city: location.city,
        ...filters,
      };

      const data = await fetchAllStays(params);
      setStays(data);
      setLoading(false);
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
        <StayDatesRangeInput className="flex-1" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput className="flex-1" />
        <div className="pr-2 mt-3">
          <SearchButtonSubmit onClick={handleSubmit} />

          {/* <ButtonSubmit onClick={handleClick} /> */}
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
          <h3>Found Stays:</h3>
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
