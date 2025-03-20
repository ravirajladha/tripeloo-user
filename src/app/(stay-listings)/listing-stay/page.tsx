// ListingStay.tsx
"use client";
import React, { FC, useEffect, useState, useMemo } from "react";
import Pagination from "@/shared/Pagination";
import StayCard2 from "./stayCard";
import { fetchAllStays } from "@/actions/getAllStays";
import { StayDataType } from "@/data/types";
import { useFilter } from "../../../../src/context/LocationContext";
import SectionHeroArchivePage from "../../(server-components)/Stays";
import TabFilters from "../TabFilters";

const ListingStay: FC = () => {

  console.log("ListingStay render triggered");

  const [stays, setStays] = useState<StayDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Grab the entire context
  const { location, filters, setFilters, setLocation } = useFilter();

  // We'll do a useEffect any time location or filters changes
  const mergedParams = useMemo(() => {
    return {
      state: location.state,
      city: location.city,
      ...filters,
    };
  }, [location, filters]); // Only re-run when location or filters change

  // Fetch stays whenever mergedParams changes
  useEffect(() => {

    console.log('useEffect triggered');
    console.log('Location:', location);
    console.log('Filters:', filters);

    const doFetch = async () => {
      console.log("API Params from ListingStay:", mergedParams);

      setLoading(true);
      try {
        const data = await fetchAllStays(mergedParams);
        const formattedData = data.map((stay: any) => ({
          ...stay,
          id: stay._id,
        }));
        setStays(formattedData);
      } catch (e: any) {
        console.error("Error fetching stays:", e);
        setError(e.message || "Failed to load stays");
      } finally {
        setLoading(false);
      }
    };
    doFetch();
  }, [mergedParams]); // re-fetch whenever location or filters changes

  function handleClearAll() {
    // clearing filters in context
    setFilters({
      stayTypes: [],
      priceRange: [0, 20000],
      amenities: [],
    });
    setLocation({ state: "", city: "" });

  }

  function onFilterChange(newFilterPart: any) {
    // Merge new filter data into context filters
    setFilters(newFilterPart);
  }

  // For display
  const selectedStayTypes = filters.stayTypes?.join(", ") || "None";
  const selectedPriceRange = `Rs ${filters.priceRange?.[0] || 0} - Rs ${filters.priceRange?.[1] || 20000}`;
  const selectedAmenities = filters.amenities?.join(", ") || "None";

  if (loading) {
    return <div className="text-center mt-10">Loading stays...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <>
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        <SectionHeroArchivePage currentPage="Stays" currentTab="Stays" />
      </div>

      <div className="lg:block hidden container pb-24 lg:pb-28">
        {/* Show the selected filters */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">Selected Filters</h3>
          <div className="mt-4 space-y-2">
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              <strong>Stay Types:</strong> {selectedStayTypes}
            </p>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              <strong>Price Range:</strong> {selectedPriceRange}
            </p>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              <strong>Amenities:</strong> {selectedAmenities}
            </p>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              <strong>Location:</strong>{" "}
              {location.state && location.city
                ? `${location.city}, ${location.state}`
                : location.city || location.state
                  ? location.city || location.state
                  : "None selected"}
            </p>


          </div>
        </div>

        <button className="mb-4 px-6 py-2 bg-red-500 text-white rounded-full" onClick={handleClearAll}>
          Clear All Filters
        </button>

        {/* TabFilters */}
        <div className="mb-8 lg:mb-11">
          <TabFilters
            onFilterChange={onFilterChange}
            filterParams={{
              stayTypes: filters.stayTypes,
              priceRange: filters.priceRange,
              amenities: filters.amenities,
            }}
          />
        </div>
      </div>

      <div className="nc-SectionGridFilterCard container pb-24 lg:pb-28 ">

        {stays.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stays.map((stay) => (
              <StayCard2 key={stay.id} data={stay} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 text-gray-500">
            No stays available for the selected filters.
          </div>
        )}
      </div>
    </>
  );
};

export default ListingStay;
