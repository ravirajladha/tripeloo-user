'use client'

import BackgroundSection from '@/components/BackgroundSection'
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import { usePathname } from 'next/navigation'
import { ReactNode, Suspense } from 'react'
import MobileFooterSticky from './(components)/MobileFooterSticky'
import { imageGallery as listingStayImageGallery } from './[id]/constant'


const DetailtLayout = ({ children }: { children: ReactNode }) => {
	const thisPathname = usePathname()

	const getImageGalleryListing = () => {
		if (thisPathname?.includes('/listing-stay')) {
			return listingStayImageGallery
		}
		// if (thisPathname?.includes('/listing-car-detail')) {
		// 	return listingCarImageGallery
		// }
		// if (thisPathname?.includes('/listing-experiences-detail')) {
		// 	return listingExperienceImageGallery
		// }

		return []
	}

	return (
		<div className="ListingDetailPage">
			<Suspense>
				<ListingImageGallery images={getImageGalleryListing()} />
			</Suspense>

			<div className="ListingDetailPage__content container">{children}</div>

			{/* OTHER SECTION */}
			{/* <div className="container py-24 lg:py-32">
				<div className="relative py-16">
					<BackgroundSection />
					<SectionSliderNewCategories
						heading="Explore by types of stays"
						subHeading="Explore houses based on 10 types of stays"
						categoryCardType="card5"
						itemPerRow={5}
						sliderStyle="style2"
					/>
				</div>
				<SectionSubscribe2 className="pt-24 lg:pt-32" />
			</div> */}

			{/* STICKY FOOTER MOBILE */}
			{/* <MobileFooterSticky /> */}
		</div>
	)
}

export default DetailtLayout
