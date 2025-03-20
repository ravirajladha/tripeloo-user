"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import FooterNav from "./FooterNav";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "/", label: "Home" },
      { href: "/listing-stay", label: "Stay Listings" },
   
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "#", label: "My Account" },
      { href: "#", label: "My Booking" },
      { href: "#", label: "My Post" },
      { href: "#", label: "My Profile" },


  
    ],
  },
  {
    id: "2",
    title: "About Us",
    menus: [
      { href: "/", label: "About Us" },
      { href: "/term-and-conditions", label: "Terms of Services" },
 
      { href: "/privacy-and-policy", label: "Privacy & Policy" },

      { href: "/contact", label: "Customer Support" },


    ],
  },
  {
    id: "4",
    title: "Business and Support",
    menus: [
      { href: "/contact", label: "Contact Us" },
      { href: "/subscription", label: "Become Travel Provider" },
 
    ],
  },
];





const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm text-white" >
        <h2 className="font-semibold text-white dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="textwhite dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <FooterNav />

      <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700 bg-[#D91C49]" >
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              {/* <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" /> */}
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </>
  );
};

export default Footer;
