// import React, { FC } from "react";
// import SectionGridFilterCard from "../SectionGridFilterCard";
// import SectionGridHasMap from "../SectionGridHasMap";
// export interface ListingStayPageProps {}

// const ListingStayPage: FC<ListingStayPageProps> = () => {
//   return <SectionGridFilterCard />;
// };

// export default ListingStayPage;



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

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await fetchAllStays();
        
        const formattedData = data.map((stay: any) => ({
          ...stay,
          id: stay._id, // Map _id to id
        }));// Call the backend API
        setStays(formattedData); // Set stays data
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching stays:", error);
        setError(error.message || "Failed to load stays");
        setLoading(false);
      }
    };

    fetchStays();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading stays...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (stays.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No stays available at the moment.
      </div>
    );
  }

  return (
    <div
      className="nc-SectionGridFilterCard container pb-24 lg:pb-28"
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stays.map((stay) => (
          <StayCard2 key={stay.id} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default ListingStay;
