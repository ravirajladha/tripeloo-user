'use client'

import React, { FC, useEffect, useState } from "react";
import Pagination from "@/shared/Pagination";
import TabFilters from "../TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "./stayCard";
import { fetchAllStays } from "@/actions/getAllStays";
import { StayDataType } from "@/data/types";

const ListingStay: FC = () => {
  const [stays, setStays] = useState<StayDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterParams, setFilterParams] = useState<any>({ stayTypes: [] });

  const onFilterChange = (filters: any) => {
    setFilterParams(filters); // Update the filter params
  };

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await fetchAllStays(filterParams);
        const formattedData = data.map((stay: any) => ({
          ...stay,
          id: stay._id, // Map _id to id
        }));

        setStays(formattedData);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching stays:", error);
        setError(error.message || "Failed to load stays");
        setLoading(false);
      }
    };

    fetchStays();
  }, [filterParams]); // Refetch stays when filterParams change

  if (loading) {
    return <div className="text-center mt-10">Loading stays...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="nc-SectionGridFilterCard container pb-24 lg:pb-28" data-nc-id="SectionGridFilterCard">
      <Heading2 />

      {/* TabFilters will always render */}
      <div className="mb-8 lg:mb-11">
        <TabFilters onFilterChange={onFilterChange} filterParams={filterParams} />
      </div>

      {/* Show stays if available, else show no message */}
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

      {/* Pagination */}
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default ListingStay;
