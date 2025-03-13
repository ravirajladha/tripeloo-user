"use client";

import React, { Fragment, FC, useState,useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import { GuestsObject } from "@/app/(client-components)/type";

export interface GuestsInputProps {
  className?: string;
}

const GuestsInput: FC<{ className?: string, onChange: (adults: number, children: number, rooms: number) => void }> = ({ className = "flex-1", onChange }) => {
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);

  useEffect(() => {
    onChange(numAdults, numChildren, numRooms);
  }, [numAdults, numChildren, numRooms]);

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button className="relative z-10 flex-1 flex text-left items-center p-3 space-x-3">
            <span className="block xl:text-lg font-semibold">{numAdults + numChildren} Guests, {numRooms} Room</span>
          </Popover.Button>

          <Transition as={Fragment} enter="transition ease-out duration-200">
            <Popover.Panel className="absolute right-0 z-10 w-full max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 px-4 rounded-3xl shadow-xl ring-1">
              <NcInputNumber label="Rooms" defaultValue={numRooms} min={1} max={5} onChange={setNumRooms} />
              <NcInputNumber label="Adults" defaultValue={numAdults} min={1} max={10} onChange={setNumAdults} className="mt-4"/>
              <NcInputNumber label="Children" defaultValue={numChildren} min={0} max={5} onChange={setNumChildren} className="mt-4"/>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
