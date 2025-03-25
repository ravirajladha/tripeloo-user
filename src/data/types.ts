import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route<string>;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route<string>;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  categories: TaxonomyType[];
  title: string;
  featuredImage: StaticImageData | string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//

export interface StayDataType {
  id: string; // Corresponds to `_id`
  title: string; // Corresponds to `title`
  state_name: string; // Corresponds to `state`
  city_name: string; // Corresponds to `city`
  address:string;
  href?: Route<string>;
  average_rating:number;
  total_reviews :number; // Use total_reviews from data
  stayType :string, // Use stayType from data
  standoutAmenities : [], // Use standoutAmenities from data
  checkin_time :string,
  checkout_time :string,


  pincode: number; // Corresponds to `pincode`
  locationUrl: string; // Corresponds to `locationUrl`
  amenities: string[]; // Corresponds to `amenities` array
  stayInformation: string; // Corresponds to `stay_information`
  cancellationPolicy: string; // Corresponds to `cancellation_policy`
  price: number; // Corresponds to `price`
  adults: number; // Corresponds to `adults`
  children: number; // Corresponds to `children`
  images: { url: string }[]; // Array of objects with a `url` property
 // Corresponds to `images[].url`
  checkinTime: string; // Corresponds to `checkin_time`
  checkoutTime: string; // Corresponds to `checkout_time`
  specialNotes: string; // Corresponds to `special_notes`
  vendorId: string; // Corresponds to `host_information.vendor_id`
  bedrooms: number | null; // Placeholder, will be updated later
  maxGuests: number | null; // Placeholder, will be updated later
  bathrooms: number | null; // Placeholder, will be updated later
    map: {
    lat: number | null ;
    lng: number  | null ;
  };
  like:boolean | null ;
  saleOff:boolean | null ;
url:string;
  reviewCount:number | null ;
  isAds:boolean | null ;
  reviewStart:boolean | null ;
}



//old stay interface, needs to add more schema according to it

// export interface StayDataType {
//   id: string | number;
//   author: AuthorType;
//   date: string;
//   href: Route<string>;
//   title: string;
//   featuredImage: StaticImageData | string;
//   commentCount: number;
//   viewCount: number;
//   address: string;
//   reviewStart: number;
//   reviewCount: number;
//   like: boolean;
//   galleryImgs: (StaticImageData | string)[];
//   price: string;
//   listingCategory: TaxonomyType;
//   maxGuests: number;
//   bedrooms: number;
//   bathrooms: number;
//   saleOff?: string | null;
//   isAds: boolean | null;
//   map: {
//     lat: number;
//     lng: number;
//   };
// }

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}
