import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/comingSoon/Footer";
import LenisWrapper from "../ui/LenisWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Code Hive",
  description: "Where Every Small Skill Holds a Great Value",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-screen h-full  antialiased animate-gradient-x contrast-[1.2] brightness-110`}
      >
       
        <LenisWrapper>
       
          {children}

          <div className=" bottom-0 left-0 w-screen ">

         <Footer />
          </div>
        </LenisWrapper>
      </body>
    </html>
  );
}
