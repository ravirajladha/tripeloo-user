import React from "react";
import logoImg from "@/images/logo_new.jpeg";
import logoLightImg from "@/images/logo_new.jpeg";
import Link from "next/link";
import { StaticImageData } from "next/image";
import Image from 'next/image'

export interface LogoProps {
  img?: StaticImageData;
  imgLight?: StaticImageData;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "w-24",
}) => {
  return (
    <Link href="/" passHref className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}>
      {/* Conditional rendering of images based on dark mode */}
      {img ? (
        <Image
          className={`block max-h-12 ${imgLight ? "dark:hidden" : ""}`}
          src={img.src} // Accessing the src property from StaticImageData
          alt="Logo"
          width={120} // Define the width of the image
          height={50} // Define the height of the image
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <Image
          className="hidden max-h-12 dark:block"
          src={imgLight.src} // Accessing the src property from StaticImageData
          alt="Logo-Light"
          width={120} // Define the width of the image
          height={50} // Define the height of the image
        />
      )}
    </Link>
  );
};

export default Logo;
