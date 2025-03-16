"use client";

import { Tab } from "@headlessui/react";
// import CarCard from "@/components/CarCard";
import CommentListing from "@/components/CommentListing";
// import ExperiencesCard from "@/components/ExperiencesCard";
import StartRating from "@/components/StartRating";
import StayCard from "@/components/StayCard2";
import { useSelector } from "react-redux";
import axios from "axios";
import BookingCard from "@/components/BookingCard";


interface Stay {
  _id: string;
  title: string;
  images: { url: string }[];
  location: string;
}

interface RoomType {
  _id: string;
  name: string;

}

interface Booking {
  _id: string;
  stay: Stay;
  roomType: RoomType;
  numRooms: number;
  numAdults: number;
  numChildren: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  createdAt: string;
  status:string;
}



// import {
//   DEMO_CAR_LISTINGS,
//   DEMO_EXPERIENCES_LISTINGS,
//   DEMO_STAY_LISTINGS,
// } from "@/data/listings";
import React, { FC, Fragment, useState, useEffect } from "react";
import Avatar from "@/shared/Avatar";
import ButtonSecondary from "@/shared/ButtonSecondary";
import SocialsList from "@/shared/SocialsList";

export interface AuthorPageProps { }
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const AuthorPage: FC<AuthorPageProps> = ({ }) => {
  // let [categories] = useState(["Stays", "Tours and Packages", "Activities"]);
  let [categories] = useState(["Stays"]);

  const { user } = useSelector((state: any) => state.auth); // Get user details from Redux
  const [bookings, setBookings] = useState<Booking[]>([]); // ✅ Ensure correct type

  useEffect(() => {
    if (!user?._id) return;

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/booking/user/${user._id}`, {
          withCredentials: true,
        });
        console.log(response.data.data, "bookings data")
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);
  const renderSidebar = () => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          {/* <h2 className="text-3xl font-semibold">Lorem, ipsum.</h2>
          <StartRating className="!text-base" /> */}
          <Avatar
            hasChecked
            hasCheckedClass="w-6 h-6 -top-0.5 right-2"
            sizeClass="w-28 h-28"
          />
          <h2 className="text-2xl font-semibold mt-3">{user?.fullName || "Guest User"}</h2>
          <p className="text-neutral-500">{user?.email}</p>
          {/* <StartRating className="mt-2" />
        <SocialsList className="mt-3" /> */}
        </div>

        {/* ---- */}
        {/* <p className="text-neutral-500 dark:text-neutral-400">
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, aperiam.
        </p> */}

        {/* ---- */}
        {/* <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
        /> */}

        {/* ---- */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* ---- */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {user?.gender || 'Male'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {(user?.dateofBirth || '2024-12-09T00:00:00.000Z')}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">

              <span className="text-sm">{user?.phoneNumber ?? 8986000099}</span>

            </span>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">



              <span className="text-sm">{user?.address || "bangalore"}</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        {/* <div>
          <h2 className="text-2xl font-semibold">{`Kevin Francis's listings`}</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {`Kevin Francis's listings is very rich, 5 star reviews help him to be
            more branded.`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
            <Tab.Panel className="mt-8">
  <section className="w-full lg:w-2/3 mx-auto">
    <h2 className="text-2xl font-semibold mb-4 text-center">Your Bookings</h2>

    {bookings.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    ) : (
      <p className="text-neutral-500 text-center">No bookings found.</p>
    )}
  </section>

  {/* Centered Button */}
  {bookings.length > 0 && (
    <div className="flex mt-11 justify-center items-center">
      <ButtonSecondary>Show me more</ButtonSecondary>
    </div>
  )}
</Tab.Panel>

              <Tab.Panel className="">
                {/* <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 4).map(
                    (stay) => (
                      <ExperiencesCard key={stay.id} data={stay} />
                    )
                  )}
                </div> */}

                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-1">
                  {/* {DEMO_STAY_LISTINGS.filter((_, i) => i < 4).map((stay) => (
                    <StayCard key={stay.id} data={stay} />
                  ))} */}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {/* {DEMO_STAY_LISTINGS.filter((_, i) => i < 4).map((stay) => (
                    <StayCard key={stay.id} data={stay} />
                  ))} */}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };
  // review sections
  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage `}>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {/* {renderSection2()} */}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;
