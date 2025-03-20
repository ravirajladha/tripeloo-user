'use client'
import { FC } from 'react'; // Import FC (FunctionComponent) from React

import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import Slider from 'rc-slider'
import convertNumbThousand from '@/utils/convertNumbThousand'

// DEMO DATA
const typeOfPlaces = [
	{
		name: 'Standard rooms',
		description: 'A comfortable room with basic amenities.',
	},
	{
		name: 'Suites',
		description: 'A luxurious room with additional space and premium features.',
	},
	{
		name: 'Deluxe rooms',
		description: 'A higher-end room with more space and better amenities.',
	},
	{
		name: 'Villas',
		description: 'Private and spacious homes for a more exclusive experience.',
	},
	{
		name: 'Bungalows',
		description: 'Standalone homes often in picturesque locations for more privacy.',
	},
	{
		name: 'Overwater Bungalows',
		description: 'A luxurious stay on the water with stunning views.',
	},
	{
		name: 'Homestay',
		description: 'A room or house where the host lives on the property, offering a more personal experience.',
	},
	{
		name: 'Cottage',
		description: 'A small and cozy home typically in rural or natural settings.',
	},
	{
		name: 'Apartment',
		description: 'A self-contained unit offering a home-like stay with all the comforts.',
	},
	{
		name: 'Farmhouse',
		description: 'A stay in a traditional farmhouse, ideal for nature lovers.',
	},
	{
		name: 'Camp',
		description: 'A camping experience often in tents or cabins, close to nature.',
	},
	{
		name: 'Beach hut',
		description: 'A small, rustic dwelling near the beach, often with simple amenities.',
	},
];


const standardAmenities = [
	'WiFi',
	'TV',
	'Kitchen',
	'Washing machine',
	'Free parking on premises',
	'Paid parking on premises',
	'Air conditioning',
	'Dedicated workspace',
  ];
  
  const standoutAmenities = [
	'Pool',
	'Hot tub',
	'Patio',
	'BBQ grill',
	'Outdoor dining area',
	'Firepit',
	'Pool table',
	'Indoor fireplace',
	'Piano',
	'Exercise equipment',
	'Lake access',
	'Beach access',
	'Ski-in/out',
	'Outdoor shower',
  ];
  
  const safetyItems = [
	'Smoke alarm',
	'First aid kit',
	'Fire extinguisher',
	'Carbon monoxide alarm',
];


interface TabFiltersProps {
	onFilterChange: (filters: any) => void;
	filterParams: any;
  }
  
  const TabFilters: FC<TabFiltersProps> = ({ onFilterChange, filterParams }) => {
	const [selectedStayTypes, setSelectedStayTypes] = useState<string[]>(filterParams.stayTypes || []);
	const [rangePrices, setRangePrices] = useState([0, 20000]);
	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
	const [isOpenMoreFilter, setIsOpenMoreFilter] = useState(false);
  
	const handleStayTypeChange = (stayType: string, checked: boolean) => {
	  if (checked) {
		setSelectedStayTypes([...selectedStayTypes, stayType]);
	  } else {
		setSelectedStayTypes(selectedStayTypes.filter((type) => type !== stayType));
	  }
	};
  
	const handleAmenitiesChange = (amenity: string, checked: boolean) => {
	  if (checked) {
		setSelectedAmenities([...selectedAmenities, amenity]);
	  } else {
		setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
	  }
	};
  
	const handlePriceChange = (price: number[]) => {
	  setRangePrices(price);
	};
  
	// Handle Apply for StayType
	const handleApplyStayType = () => {
		onFilterChange({
		  ...filterParams, // Retain the existing filters
		  stayTypes: selectedStayTypes,
		});
	  };
	  
	  const handleApplyPriceRange = () => {
		onFilterChange({
		  ...filterParams, // Retain the existing filters
		  priceRange: rangePrices,
		});
	  };
	  
	  const handleApplyAmenities = () => {
		onFilterChange({
		  ...filterParams, // Retain the existing filters
		  amenities: selectedAmenities,
		});
	  };
  
	const handleClearStayType = () => {
	  setSelectedStayTypes([]);
	  onFilterChange({ stayTypes: [] });
	};
  
	const handleClearPriceRange = () => {
	  setRangePrices([0, 20000]);
	  onFilterChange({ priceRange: [0, 20000] });
	};
  
	const handleClearAmenities = () => {
	  setSelectedAmenities([]);
	  onFilterChange({ amenities: [] });
	};

	
	const renderTabsTypeOfPlace = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-6000 ${open ? '!border-primary-500' : ''
								}`}
						>
							<span>Type of Stay</span>
							<i className="las la-angle-down ml-2"></i>
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{typeOfPlaces.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													subLabel={item.description}
													onChange={(checked: boolean) => handleStayTypeChange(item.name, checked)} // Use the boolean directly
													defaultChecked={selectedStayTypes.includes(item.name)} // Mark as checked if already selected
												/>

											</div>
										))}



									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird onClick={handleClearStayType} sizeClass="px-4 py-2 sm:px-5">
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={() => { handleApplyStayType(); close(); }}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}
	const renderPriceRange = () => (
		<Popover className="relative">
		  {({ open, close }) => (
			<>
			  <PopoverButton
				className="flex items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700"
			  >
				<span>{`Rs${convertNumbThousand(rangePrices[0])} - Rs${convertNumbThousand(rangePrices[1])}`}</span>
			  </PopoverButton>
			  <Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			  >
				<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
				  <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
					<div className="relative flex flex-col space-y-8 px-5 py-6">
					  <Slider
						range
						className="text-red-400"
						min={0}
						max={20000}
						defaultValue={[rangePrices[0], rangePrices[1]]}
						onChange={(e) => handlePriceChange(e as number[])}
					  />
					</div>
					<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
					  <ButtonThird onClick={handleClearPriceRange} sizeClass="px-4 py-2 sm:px-5">Clear</ButtonThird>
					  <ButtonPrimary onClick={() => { handleApplyPriceRange(); close(); }} sizeClass="px-4 py-2 sm:px-5">Apply</ButtonPrimary>
					</div>
				  </div>
				</PopoverPanel>
			  </Transition>
			</>
		  )}
		</Popover>
	  );
	
	  const renderAmenitiesFilter = () => (
		<Popover className="relative">
		  {({ open, close }) => (
			<>
			  <PopoverButton className="flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm">
				<span>Amenities</span>
			  </PopoverButton>
			  <Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			  >
				<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
				  <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
					<div className="relative flex flex-col space-y-5 px-5 py-6">
					  {standardAmenities.map((item) => (
						<div key={item}>
						  <Checkbox
							name={item}
							label={item}
							onChange={(checked: boolean) => handleAmenitiesChange(item, checked)}
							defaultChecked={selectedAmenities.includes(item)}
						  />
						</div>
					  ))}
					  {standoutAmenities.map((item) => (
						<div key={item}>
						  <Checkbox
							name={item}
							label={item}
							onChange={(checked: boolean) => handleAmenitiesChange(item, checked)}
							defaultChecked={selectedAmenities.includes(item)}
						  />
						</div>
					  ))}
					  {safetyItems.map((item) => (
						<div key={item}>
						  <Checkbox
							name={item}
							label={item}
							onChange={(checked: boolean) => handleAmenitiesChange(item, checked)}
							defaultChecked={selectedAmenities.includes(item)}
						  />
						</div>
					  ))}
					</div>
					<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
					  <ButtonThird onClick={handleClearAmenities} sizeClass="px-4 py-2 sm:px-5">Clear</ButtonThird>
					  <ButtonPrimary onClick={() => { handleApplyAmenities(); close(); }} sizeClass="px-4 py-2 sm:px-5">Apply</ButtonPrimary>
					</div>
				  </div>
				</PopoverPanel>
			  </Transition>
			</>
		  )}
		</Popover>
	  );
	


	return (
		<div className="flex lg:space-x-4">
			<div className="hidden space-x-4 lg:flex">
				{renderTabsTypeOfPlace()}
				{/* {renderTabsPriceRage()} */}
				{renderPriceRange()}
				{renderAmenitiesFilter()}

			</div>

		</div>
	)
}

export default TabFilters
