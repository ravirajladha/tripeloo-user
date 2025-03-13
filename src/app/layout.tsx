import { Poppins } from "next/font/google";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import { Metadata } from "next";
import ThemeProvider from "./theme-provider";
import StoreProvider from "../store/StoreProvider";
import ReduxWrapper from "@/components/ReduxWrapper"; // ✅ New Wrapper for Redux State

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tripeloo",
  description: "Booking online for Stays, Tours and Activities",
  keywords: "Stays, Tours and Activities",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        <StoreProvider>
          <ThemeProvider>
            <ReduxWrapper> {/* ✅ Move Redux logic here */}
              <SiteHeader />
              {children}
              <FooterNav />
              <Footer />
              <ClientCommons />
            </ReduxWrapper>{/* ✅ this helps open the login modal where the link should not open wihth=out authenticated. */}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
