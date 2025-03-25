'use client'

import { FC, Fragment, useState } from 'react'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { ArrowRightIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating';
import ReviewModal from '@/components/ReviewModal'; // Import the new Modal component
import StarRatingInput from '@/components/StartRatingInput'; // Import the new component
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import { useCallback } from "react";
import axios from 'axios';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Adjust based on your Redux store setup
import { handleProtectedNavigation } from "@/utils/handleProtectedNavigation";

import { Route } from 'next'



import React, { useEffect } from 'react';
import { getStayById } from '@/actions/singleStays';

export interface ListingStayDetailPageProps {
	id: string;
}

const amenityIcons: { [key: string]: string } = {
	// Standard Amenities
	WiFi: "las la-wifi",
	TV: "las la-tv",
	Kitchen: "las la-utensils",
	"Washing machine": "las la-water",
	"Free parking on premises": "las la-parking",
	"Paid parking on premises": "las la-parking",
	"Air conditioning": "las la-snowflake",
	"Dedicated workspace": "las la-briefcase",

	// Standout Amenities
	Pool: "las la-swimming-pool",
	"Hot tub": "las la-hot-tub",
	Patio: "las la-chair",
	"BBQ grill": "las la-fire",
	"Outdoor dining area": "las la-utensils",
	Firepit: "las la-fire",
	"Pool table": "las la-gamepad",
	"Indoor fireplace": "las la-fire",
	Piano: "las la-music",
	"Exercise equipment": "las la-dumbbell",
	"Lake access": "las la-water",
	"Beach access": "las la-umbrella-beach",
	"Ski-in/out": "las la-skiing",
	"Outdoor shower": "las la-shower",

	// Safety Items
	"Smoke alarm": "las la-bell",
	"First aid kit": "las la-first-aid",
	"Fire extinguisher": "las la-fire-extinguisher",
	"Carbon monoxide alarm": "las la-bell",
};

const fallbackIcon = "las la-check-circle";

const ListingStayDetailPage: FC = () => {
	const params = useParams();
	const id = Array.isArray(params?.id) ? params.id[0] : params.id; // Ensure `id` is a string
	const router = useRouter();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const user = useSelector((state: RootState) => state.auth.user);
	console.log(user, "user details from the page/id , single stay");
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
	const [reviewText, setReviewText] = useState<string>("");
	const [reviewRating, setReviewRating] = useState<number>(0);
	const [reviews, setReviews] = useState<any[]>([]);
	const [pagination, setPagination] = useState<any>({});
	const [overallRating, setOverallRating] = useState<{ average_rating: number; total_reviews: number }>({ average_rating: 0, total_reviews: 0 });
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
	const [modalTitle, setModalTitle] = useState(""); // State for modal title
	const [modalMessage, setModalMessage] = useState("");

	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
	const thisPathname = usePathname();

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
		const fetchStayDetails = async (page = 1) => {
			try {
				setLoading(true);
				const data = await getStayById(id, { page }); // Pass the page parameter				console.log(data, "data inside single card");

				setStay(data.stay); // Set stay details
				const fetchedRoomTypes = data.roomTypes || []; // Fallback to empty array
				setRoomTypes(fetchedRoomTypes); // Set room types

				if (fetchedRoomTypes.length > 0) {
					setSelectedRoomType(fetchedRoomTypes[0]);
					setAvailability(fetchedRoomTypes[0].availability || []);

					// Default to the first room type
				}

				setReviews(data.reviews.data || []);
				setPagination(data.reviews.pagination || {});
				setOverallRating(data.overallRating || { average_rating: 0, total_reviews: 0 });

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

				const priceData = selectedRoomType.availability.find((avail: any) =>
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


	const handleSubmitReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!isAuthenticated) {
			handleProtectedNavigation(null, isAuthenticated, router, "/login", dispatch);
			return;
		}

		if (!reviewText.trim()) {
			alert("Please enter a review comment before submitting.");
			return;
		}

		if (reviewRating < 1 || reviewRating > 5) {
			alert("Please select a rating between 1 and 5 stars.");
			return;
		}
		const token = localStorage.getItem("accessToken");
		try {
			const response = await axios.post(
				`${BACKEND_URL}/api/v1/stay/createReview`,
				{
					stay_id: id,
					comment: reviewText,
					rating: reviewRating,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`, // Assuming the token is stored in the user object
					},
				}
			);

			if (response.data.success) {
				// Refresh the reviews and overall rating
				const data = await getStayById(id, { page: 1 });
				setReviews(data.reviews.data || []);
				setPagination(data.reviews.pagination || {});
				setOverallRating(data.overallRating || { average_rating: 0, total_reviews: 0 });

				// Reset the form
				setReviewText("");
				setReviewRating(0);
				setCurrentPage(1);

				// Show success modal
				setModalTitle("Success");
				setModalMessage("Review submitted successfully!");
				setIsModalOpen(true);
			} else {
				throw new Error(response.data.message || "Failed to submit review");
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.message || // Check for backend message
				error.message || // Fallback to generic axios error message
				"Failed to submit review"; // Fallback to default message

			setModalTitle("Review Submission Error");
			setModalMessage(errorMessage);
			setIsModalOpen(true);
		}
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				<div className="flex items-center justify-between">
					<Badge name=	{stay.stayType} />
					{/* <LikeSaveBtns /> */}
				</div>

				{/* 2 */}
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					{stay.title}
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
				<StartRating
          point={overallRating.average_rating}
          reviewCount={overallRating.total_reviews}
        />        <span>·</span>
        <span>
          {overallRating.total_reviews} {overallRating.total_reviews === 1 ? "review" : "reviews"}
        </span>
        <span>·</span>
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1">{stay.city_name}</span> {/* Use city_name instead of city */}
        </span>
      </div>
				{/* 4 */}
				<div className="flex items-center">
        <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
          Hosted by{' '}
          <span className="font-medium text-neutral-900 dark:text-neutral-200">
            {stay.host_information.vendor_id.fullName}
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
            {selectedRoomType?.guests || 0}{' '}
            <span className="hidden sm:inline-block">guests</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-bed text-2xl"></i>
          <span className="">
            {selectedRoomType?.beds || 0}{' '}
            <span className="hidden sm:inline-block">beds</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-bath text-2xl"></i>
          <span className="">
            {selectedRoomType?.baths || 0}{' '}
            <span className="hidden sm:inline-block">baths</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-door-open text-2xl"></i>
          <span className="">
            {selectedRoomType?.bedrooms || 0}{' '}
            <span className="hidden sm:inline-block">bedrooms</span>
          </span>
        </div>
      </div>
    {/* </div> */}
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
		// Combine all amenities into a single array with their category for display
		const allAmenities = [
			...stay.amenities.map((item: string) => ({ name: item, category: "Standard Amenities" })),
			...stay.standoutAmenities.map((item: string) => ({ name: item, category: "Standout Amenities" })),
			...stay.safetyItems.map((item: string) => ({ name: item, category: "Safety Items" })),
		];

		// Limit the number of amenities shown initially
		const visibleAmenities = allAmenities.slice(0, 12);
		const hasMoreAmenities = allAmenities.length > 12;

		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Amenities</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{`About the property's amenities and services`}
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* Display Amenities */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
					{visibleAmenities.map((item, index) => (
						<div key={index} className="flex items-center space-x-3">
							<i className={`${amenityIcons[item.name] || fallbackIcon} text-3xl`}></i>
							<span>{item.name}</span>
						</div>
					))}
				</div>

				{/* Show "View more" button if there are more amenities */}
				{hasMoreAmenities && (
					<>
						<div className="w-14 border-b border-neutral-200"></div>
						<div>
							<ButtonSecondary onClick={openModalAmenities}>
								View more {allAmenities.length - 12} amenities
							</ButtonSecondary>
						</div>
					</>
				)}
				{renderMotalAmenities(allAmenities)}
			</div>
		);
	};

	const renderMotalAmenities = (allAmenities: { name: string; category: string }[]) => {
		return (
			<Transition appear show={isOpenModalAmenities} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModalAmenities}>
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

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-900">
									<div className="relative flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-700">
										<h3 className="text-lg font-semibold">All Amenities</h3>
										<ButtonClose onClick={closeModalAmenities} />
									</div>
									<div className="mt-6 grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 sm:grid-cols-2 lg:grid-cols-3">
										{allAmenities.map((item, index) => (
											<div key={index} className="flex items-center space-x-3">
												<i className={`${amenityIcons[item.name] || fallbackIcon} text-3xl`}></i>
												<div>
													<span>{item.name}</span>
													<p className="text-xs text-neutral-500 dark:text-neutral-400">
														{item.category}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		);
	};

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
						<div className="flex items-center">
        {/* <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" /> */}
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
          Hosted by{' '}
          <span className="font-medium text-neutral-900 dark:text-neutral-200">
            {stay.host_information.vendor_id.fullName}
          </span>
        </span>
      </div>
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							{/* <StartRating /> */}
							<span className="mx-2">·</span>
							<span> More than 3 places</span>
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
				<h2 className="text-2xl font-semibold">
					Reviews ({overallRating.total_reviews} {overallRating.total_reviews === 1 ? "review" : "reviews"})
				</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5">
					{/* <FiveStartIconForRate
				iconClass="w-6 h-6"
				className="space-x-0.5"
				rating={overallRating.average_rating}
			  /> */}
					<div className="space-y-3">
						{isAuthenticated && (
							<>
								<StarRatingInput
									onChange={(value) => setReviewRating(value)}
									initialRating={reviewRating}
								/>
								<div className="relative">
									<Input
										fontClass=""
										sizeClass="h-16 px-4 py-3"
										rounded="rounded-3xl"
										placeholder="Share your thoughts ..."
										value={reviewText}
										onChange={(e) => setReviewText(e.target.value)}
									/>
									<ButtonCircle
										className="absolute right-2 top-1/2 -translate-y-1/2 transform"
										size=" w-12 h-12 "
										onClick={handleSubmitReview}
									>
										<ArrowRightIcon className="h-5 w-5" />
									</ButtonCircle>
								</div>
							</>
						)}
						{!isAuthenticated && (
							<p className="text-sm text-neutral-500 dark:text-neutral-400">
								<a
									href="/login"
									className="text-blue-600 hover:underline"
									onClick={(e) => {
										handleProtectedNavigation(e, isAuthenticated, router, "/login", dispatch);
									}}
								>
									Log in
								</a>{" "}
								to share your thoughts about this stay.
							</p>
						)}
					</div>
				</div>

				{/* Comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					{reviews.length === 0 ? (
						<p className="py-8 text-neutral-500 dark:text-neutral-400">
							No reviews yet. Be the first to share your experience!
						</p>
					) : (
						reviews.map((review) => (
							<CommentListing
								key={review._id}
								className="py-8"
								data={{
									name: review.user_name,
									date: new Date(review.createdAt).toLocaleDateString(),
									comment: review.comment,
									starPoint: review.rating,
								}}
							/>
						))
					)}
					{pagination.totalPages > 1 && (
						<div className="pt-8 flex justify-center space-x-2">
							{Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
								<ButtonSecondary
									key={page}
									onClick={() => handlePageChange(page)}
									className={currentPage === page ? "bg-neutral-200 dark:bg-neutral-700" : ""}
								>
									{page}
								</ButtonSecondary>
							))}
						</div>
					)}
				</div>
			</div>
		);
	};
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
					<StartRating
          point={overallRating.average_rating}
          reviewCount={overallRating.total_reviews}
        />   
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

					<GuestsInput className="flex-1" onChange={handleGuestsChange} />
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
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2 mt-8">
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

					<ReviewModal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						title={modalTitle}
						message={modalMessage}
					/>


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
