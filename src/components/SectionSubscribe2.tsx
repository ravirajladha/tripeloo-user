"use client"
import React, { FC, useState } from "react";
import ButtonCircle from "@/shared/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/shared/Badge";
import Input from "@/shared/Input";
import Image from "next/image";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const [email, setEmail] = useState(""); // Email state
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate saving the email and show success message
    setSuccessMessage("Thank you for subscribing! You will receive our newsletter soon.");
    
    // Reset email input after submission
    setEmail("");
  };

  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Join our newsletter 🎉</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <ul className="space-y-4 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li>
        </ul>
        
        {/* Form */}
        <form className="mt-10 relative max-w-sm" onSubmit={handleSubmit}>
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rounded="rounded-full"
            sizeClass="h-12 px-5 py-3"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 right-1.5"
            size="w-10 h-10"
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
        </form>

        {/* Display the success message */}
        {successMessage && (
          <div className="mt-4 text-green-600 font-semibold">
            {successMessage}
          </div>
        )}
      </div>
      
      {/* Right image */}
      <div className="flex-grow">
        <Image alt="" src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
