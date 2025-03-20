"use client";

import React, { Fragment, useState, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "./ClearDataButton";

export interface GuestsInputProps {
  fieldClassName?: string;
  className?: string;
  setRooms: React.Dispatch<React.SetStateAction<number>>; // Pass setter for rooms
  setAdults: React.Dispatch<React.SetStateAction<number>>; // Pass setter for adults
  setChildren: React.Dispatch<React.SetStateAction<number>>; // Pass setter for children
}

const GuestsInput: FC<GuestsInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  setRooms,
  setAdults,
  setChildren,
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1);
  const [guestRoomsInputValue, setGuestRoomsInputValue] = useState(1);

  const handleChangeData = (value: number, type: string) => {
    if (type === "guestRooms") {
      setGuestRoomsInputValue(value);
      setRooms(value); // Update the parent state
    }
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      setAdults(value); // Update the parent state
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      setChildren(value); // Update the parent state
    }
  };

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div className={`flex-1 z-10 flex items-center focus:outline-none ${open ? "nc-hero-field-focused" : ""}`}>
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {totalGuests || ""} Guests
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {totalGuests ? "Guests" : "Add guests"}
                </span>
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestAdultsInputValue(0);
                    setGuestChildrenInputValue(0);
                    setGuestInfantsInputValue(0);
                    setGuestRoomsInputValue(1); // Reset rooms count to default (1)
                    setRooms(1); // Reset rooms in the parent component
                    setAdults(0); // Reset adults in the parent component
                    setChildren(0); // Reset children in the parent component
                  }}
                />
              )}
            </Popover.Button>
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={guestRoomsInputValue}
                onChange={(value) => handleChangeData(value, "guestRooms")}
                max={10}
                min={1}
                label="Rooms"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestAdultsInputValue}
                onChange={(value) => handleChangeData(value, "guestAdults")}
                max={10}
                min={1}
                label="Adults"
                desc="Ages 13 or above"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestChildrenInputValue}
                onChange={(value) => handleChangeData(value, "guestChildren")}
                max={4}
                min={0}
                label="Children"
                desc="Ages 2–12"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
