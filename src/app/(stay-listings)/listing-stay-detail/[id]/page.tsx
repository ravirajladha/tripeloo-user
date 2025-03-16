'use client'

import { FC, Fragment, useState } from 'react'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { ArrowRightIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import { useCallback } from "react";

import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonClose from '@/shared/ButtonClose'
import Input from '@/shared/Input'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import Image from 'next/image'
import { usePathname, useRouter, useParams } from 'next/navigation'
import { Amenities_demos, PHOTOS } from './constant'
import StayDatesRangeInput from './StayDatesRangeInput'
import GuestsInput from './GuestsInput'
import SectionDateRange from './SectionDateRange'
import RoomTypeCard from "./roomTypeCard";

import { Route } from 'next'



import React, { useEffect } from 'react';
import { getStayById } from '@/actions/singleStays';

export interface ListingStayDetailPageProps {
	id: string;
}

const ListingStayDetailPage: FC = () => {
	const params = useParams();
	const id = Array.isArray(params?.id) ? params.id[0] : params.id; // Ensure `id` is a string
	const router = useRouter();
	const [stay, setStay] = useState<any>(null); // State to store stay details
	// setRoomType
	const [roomTypes, setRoomTypes] = useState<any[]>([]);
	const [selectedRoomType, setSelectedRoomType] = useState<any | null>(null);
	const [availability, setAvailability] = useState([]);
	// Selected room type
	const [numRooms, setNumRooms] = useState(1);
	const [numAdults, setNumAdults] = useState(2);
	const [numChildren, setNumChildren] = useState(0);
	const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);

	// const [selectedRoomType, setSelectedRoomType] = useState(roomTypes[0]);

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false)

	const thisPathname = usePathname()

	function closeModalAmenities() {
		setIsOpenModalAmenities(false)
	}

	function openModalAmenities() {
		setIsOpenModalAmenities(true)
	}

	// function openModalAmenities(images: { url: string; key: string }[]) {
	// 	setIsOpenModalAmenities(true);
	// 	setGalleryImages(images); // Set the images in the state
	//   }


	const handleGuestsChange = useCallback((adults: number, children: number, rooms: number) => {
		console.log("Updated Guests:", { adults, children, rooms });
	  }, []);

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	useEffect(() => {
		if (!id) return;

		// Fetch stay details
		const fetchStayDetails = async () => {
			try {
				setLoading(true);
				const data = await getStayById(id); // Fetch data
				console.log(data, "data inside single card");

				setStay(data.stay); // Set stay details
				const fetchedRoomTypes = data.roomTypes || []; // Fallback to empty array
				setRoomTypes(fetchedRoomTypes); // Set room types

				if (fetchedRoomTypes.length > 0) {
					setSelectedRoomType(fetchedRoomTypes[0]);
					setAvailability(fetchedRoomTypes[0].availability || []);

					// Default to the first room type
				}

				console.log(fetchedRoomTypes, "room types details");
				setLoading(false);
			} catch (err: any) {
				console.error('Error fetching stay details:', err.message);
				setError(err.message || 'Failed to fetch stay details');
				setLoading(false);
			}
		};

		fetchStayDetails();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!stay) return <div>No Stay Found</div>;

	const handleRoomTypeSelection = (roomType: any) => {
		setSelectedRoomType(roomType);
		setAvailability(roomType.availability || []);
	};


	const nights = selectedDates[0] && selectedDates[1]
		? Math.ceil((selectedDates[1].getTime() - selectedDates[0].getTime()) / (1000 * 60 * 60 * 24))
		: 1;

		const getTotalPrice = () => {
			let total = 0;
			if (!selectedDates[0] || !selectedDates[1]) {
				return total; // Return 0 if dates are not selected
			}
		
			if (selectedRoomType.availability?.length) {
				for (let i = 0; i < nights; i++) {
					const date = selectedDates[0] ? new Date(selectedDates[0]) : new Date();
					date.setDate(date.getDate() + i);
					
					const priceData = selectedRoomType.availability.find((avail:any) =>
						new Date(avail.date).toDateString() === date.toDateString()
					);
		
					total += (priceData ? priceData.price : selectedRoomType.price_per_night) * numRooms;
				}
			} else {
				total = selectedRoomType.price_per_night * numRooms * nights;
			}
			return total;
		};
		

		const handleReserve = () => {
			if (!selectedDates[0] || !selectedDates[1]) {
				alert("Please select valid dates before proceeding.");
				return;
			}
		
			const formattedStartDate = selectedDates[0]?.toISOString() || new Date().toISOString();
			const formattedEndDate = selectedDates[1]?.toISOString() || new Date().toISOString();
		
			router.push(
				`/checkout?roomTypeId=${selectedRoomType._id}&numRooms=${numRooms}&numAdults=${numAdults}&numChildren=${numChildren}&startDate=${encodeURIComponent(formattedStartDate)}&endDate=${encodeURIComponent(formattedEndDate)}&totalPrice=${getTotalPrice()}`
			);
		};
		

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				<div className="flex items-center justify-between">
					<Badge name="Wooden house" />
					<LikeSaveBtns />
				</div>

				{/* 2 */}
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					{stay.title}
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
					<StartRating />
					<span>·</span>
					<span>
						<i className="las la-map-marker-alt"></i>
						<span className="ml-1">{stay.city}</span>
					</span>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
						Hosted by{' '}
						<span className="font-medium text-neutral-900 dark:text-neutral-200">
							fake
						</span>
					</span>
				</div>

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
					<div className="flex items-center space-x-3">
						<i className="las la-user text-2xl"></i>
						<span className="">
							6 <span className="hidden sm:inline-block">guests</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-bed text-2xl"></i>
						<span className=" ">
							6 <span className="hidden sm:inline-block">beds</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-bath text-2xl"></i>
						<span className=" ">
							3 <span className="hidden sm:inline-block">baths</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-door-open text-2xl"></i>
						<span className=" ">
							2 <span className="hidden sm:inline-block">bedrooms</span>
						</span>
					</div>
				</div>
			</div>
		)
	}

	const renderSectionA = () => {
		if (!roomTypes || roomTypes.length === 0) {
			return (
				<div className="listingSection__wrap !space-y-6">
					<h2 className="text-2xl font-semibold">Room Types</h2>
					<p className="text-gray-500">No room types available.</p>
				</div>
			);
		}

		return (
			<div className="listingSection__wrap !space-y-6">
				<h2 className="text-2xl font-semibold mb-4">Room Types</h2>
				<div className="flex flex-col space-y-4">
					{roomTypes.map((roomType) => (
						<div
							key={roomType._id}
							onClick={() => handleRoomTypeSelection(roomType)}
							className={`cursor-pointer ${selectedRoomType?._id === roomType._id
								? "border-2 border-blue-500 rounded-xl"
								: ""
								}`}
						>
							<RoomTypeCard
								data={{
									galleryImgs: roomType.images.map((img: any) => img.url), // Pass the images
									title: roomType.type,

									price: roomType.price_per_night,
									reviewStart: 4.5, // Placeholder for review start
									reviewCount: 12, // Placeholder for review count
									like: false, // Default to false
									saleOff: null, // Default to no sale
									isAds: false, // Default to no ads
									id: roomType._id,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		);
	};


	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Stay information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-6000 dark:text-neutral-300">
					<span>
						{stay.stay_information}
					</span>

				</div>
			</div>
		)
	}

	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Amenities </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{` About the property's amenities and services`}
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
					{Amenities_demos.filter((_, i) => i < 12).map((item) => (
						<div key={item.name} className="flex items-center space-x-3">
							<i className={`las text-3xl ${item.icon}`}></i>
							<span className=" ">{item.name}</span>
						</div>
					))}
				</div>

				{/* ----- */}
				<div className="w-14 border-b border-neutral-200"></div>
				<div>
					<ButtonSecondary onClick={openModalAmenities}>
						View more 20 amenities
					</ButtonSecondary>
				</div>
				{renderMotalAmenities()}
			</div>
		)
	}

	const renderMotalAmenities = () => {
		return (
			<Transition appear show={isOpenModalAmenities} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModalAmenities}
				>
					<div className="min-h-screen px-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-40" />
						</TransitionChild>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block h-screen w-full max-w-4xl py-8">
								<div className="inline-flex h-full w-full transform flex-col overflow-hidden rounded-2xl bg-white pb-2 text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
									<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
										<h3
											className="text-lg font-medium leading-6 text-gray-900"
											id="headlessui-dialog-title-70"
										>
											Amenities
										</h3>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalAmenities} />
										</span>
									</div>
									<div className="divide-y divide-neutral-200 overflow-auto px-8 text-neutral-700 dark:text-neutral-300">
										{Amenities_demos.filter((_, i) => i < 1212).map((item) => (
											<div
												key={item.name}
												className="flex items-center space-x-5 py-2.5 sm:py-4 lg:space-x-8 lg:py-5"
											>
												<i
													className={`las text-4xl text-neutral-6000 ${item.icon}`}
												></i>
												<span>{item.name}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		)
	}

	const renderSection4 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Room Rates </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Prices may increase on weekends or holidays
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* CONTENT */}
				<div className="flow-root">
					<div className="-mb-4 text-sm text-neutral-6000 dark:text-neutral-300 sm:text-base">
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Monday - Thursday</span>
							<span>$199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Monday - Thursday</span>
							<span>$199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Friday - Sunday</span>
							<span>$219</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Rent by month</span>
							<span>-8.34 %</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Minimum number of nights</span>
							<span>1 night</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Max number of nights</span>
							<span>90 nights</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderSection5 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Host Information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center space-x-4">
					<Avatar
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-14 w-14"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href="##">

						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							<span className="mx-2">·</span>
							<span> 12 places</span>
						</div>
					</div>
				</div>

				{/* desc */}
				<span className="block text-neutral-6000 dark:text-neutral-300">
					Providing lake views, The hotel 1, hotel 2 provides
					accommodation, an outdoor swimming pool, a bar, a shared lounge, a
					garden and barbecue facilities...
				</span>

				{/* info */}
				<div className="block space-y-2.5 text-neutral-500 dark:text-neutral-400">
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
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
						<span>Joined in March 2016</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
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
						<span>Response rate - 100%</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>

						<span>Fast response - within a few hours</span>
					</div>
				</div>

				{/* == */}
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<ButtonSecondary href="/booking">See host profile</ButtonSecondary>
				</div>
			</div>
		)
	}

	//review section
	const renderSection6 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5">
					<FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute right-2 top-1/2 -translate-y-1/2 transform"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
		)
	}
	//map location render
	const renderSection7 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Location</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Wayanad
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* MAP */}
				<div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3">
					<div className="z-0 overflow-hidden rounded-xl">
						<iframe
							width="100%"
							height="100%"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
						></iframe>
					</div>
				</div>
			</div>
		)
	}
	//cancellation policy sections
	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Things to know</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Cancellation policy</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						{stay.cancellation_policy}
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Check-in time</h4>
					<div className="mt-3 max-w-md text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
						<div className="flex justify-between space-x-10 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
							<span>Check-in</span>
							<span>	{stay.checkin_time}</span>
						</div>
						<div className="flex justify-between space-x-10 p-3">
							<span>Check-out</span>
							{/* <span>02:00 pm - 04:00 pm</span> */}
							<span>	{stay.checkout_time}</span>

						</div>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Special Note</h4>
					<div className="prose sm:prose">
						<ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
							<li>
								Ban and I will work together to keep the landscape and
								environment green and clean by not littering, not using
								stimulants and respecting people around.
							</li>
							<li>Do not sing karaoke past 11:30</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}

	// const renderSidebar = () => {
	// 	return (
	// 		<div className="listingSectionSidebar__wrap shadow-xl">
	// 			{/* PRICE */}
	// 			<div className="flex justify-between">
	// 				<span className="text-3xl font-semibold">
	// 					Rs 2253
	// 					<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
	// 						/night
	// 					</span>
	// 				</span>
	// 				<StartRating />
	// 			</div>

	// 			{/* FORM */}
	// 			<form className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700">
	// 				<StayDatesRangeInput className="z-[11] flex-1" />
	// 				<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
	// 				<GuestsInput className="flex-1" />
	// 			</form>

	// 			{/* SUM */}
	// 			<div className="flex flex-col space-y-4">
	// 				<div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
	// 					<span>Rs 2253 x 3 night</span>
	// 					<span>Rs 6759</span>
	// 				</div>
	// 				<div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
	// 					<span>Service charge</span>
	// 					<span>Rs 0</span>
	// 				</div>
	// 				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
	// 				<div className="flex justify-between font-semibold">
	// 					<span>Total</span>
	// 					<span>Rs 6759</span>
	// 				</div>
	// 			</div>

	// 			{/* SUBMIT */}
	// 			<ButtonPrimary href={'/checkout'}>Reserve</ButtonPrimary>
	// 		</div>
	// 	)
	// }
	const renderSidebar = () => {



		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
						₹{selectedRoomType.price_per_night}
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span>
					</span>
					<StartRating />
				</div>

				{/* FORM */}
				{/* FORM */}
				<form className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700">
					<StayDatesRangeInput className="z-[11] flex-1" onChange={setSelectedDates} />
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
					{/* <GuestsInput className="flex-1" onChange={(adults, children, rooms) => {
						setNumAdults(adults);
						setNumChildren(children);
						setNumRooms(rooms);
					}} /> */}



<GuestsInput className="flex-1"onChange={handleGuestsChange} />;
				</form>

				{/* TOTAL PRICE */}
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
						<span>₹{selectedRoomType.price_per_night} x {nights} nights x {numRooms} rooms</span>
						<span>₹{getTotalPrice()}</span>
					</div>
					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>₹{getTotalPrice()}</span>
					</div>
				</div>

				{/* SUBMIT */}
				<button onClick={handleReserve} className="bg-blue-500 text-white p-3 rounded-lg w-full">
					Reserve
				</button>
			</div>
		);
	};

	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md sm:rounded-xl">
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
					{/* Main image */}
					{stay.images && stay.images.length > 0 ? (
						<div
							className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl"
						>
							<Image
								fill
								className="rounded-md object-cover sm:rounded-xl"
								src={stay.images[0].url} // Use the URL of the first image
								alt={stay.title || 'Stay Image'}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
							/>
							<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
						</div>
					) : (
						<div className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl bg-gray-200">
							<p className="text-center text-gray-500">No image available</p>
						</div>
					)}

					{/* Additional images */}
					{stay.images &&
						stay.images.slice(1, 5).map((image: { url: string; key: string }, index: number) => (
							<div
								key={image.key} // Use the unique key from the image object
								className={`relative overflow-hidden rounded-md sm:rounded-xl ${index >= 3 ? 'hidden sm:block' : ''
									}`}
							>
								<div className="aspect-h-3 aspect-w-4 sm:aspect-h-5 sm:aspect-w-6">
									<Image
										fill
										className="rounded-md object-cover sm:rounded-xl"
										src={image.url} // Use the URL from the image object
										alt={`${stay.title || 'Stay Image'} ${index + 1}`}
										sizes="400px"
									/>
								</div>
								<div
									className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
									onClick={() => console.log(`Clicked image ${index + 1}`)}
								/>
							</div>
						))}



					<button
						className="absolute bottom-3 left-3 z-10 hidden rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="h-5 w-5" />
						<span className="ml-2 text-sm font-medium text-neutral-800">
							Show all photos
						</span>
					</button>
				</div>
			</header>

			{/* MAIN */}
			<main className="relative z-10 mt-11 flex flex-col lg:flex-row">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection1()}
					{renderSectionA()}
					{/* <SectionDateRange availability={availability} /> */}

					<SectionDateRange
						availability={availability}
						defaultPrice={selectedRoomType.price_per_night}
						defaultRooms={10} // You can replace 10 with a general default
					/>

					{renderSection2()}
					{renderSection3()}
					{/* {renderSection4()} */}

					{renderSection5()}
					{renderSection6()}
					{/* {renderSection7()} */}
					{renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	)
}

export default ListingStayDetailPage;
