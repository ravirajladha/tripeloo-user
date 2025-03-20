"use client";

import React, { FC } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
// Removed other imports as they are no longer necessary

export type SearchTab = "Stays"; // Only keeping the "Stays" tab available

export interface HeroSearchFormProps {
  className?: string;
  currentPage?: "Stays"; // Only keeping "Stays" as the available page
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentPage = "Stays",
}) => {
  // No need for dynamic tabs, always showing the "Stays" tab
  const renderForm = () => {
    return <StaySearchForm />;
  };

  return (
    <div className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}>
      {/* Always render the "Stays" form */}
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
