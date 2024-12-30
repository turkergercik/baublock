'use client';

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Context from "./contexts/authcontext";
import ScrollRestorationProvider from "@/components/scroller";
import { ThemeProvider } from './contexts/themecontext';
import { useTheme } from './contexts/themecontext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function ThemedBody({ children, className }) {
  const theme = useTheme();
  return (
    <body className={`${className} ${theme.bgColor} transition-all min-h-screen duration-500 ease-in-out`}>
      <div className="h-full w-full ">
        <ScrollRestorationProvider>
          <Navbar />
          <div className="w-full h-full pt-[100px]">
            {children}
          </div>
        </ScrollRestorationProvider>
      </div>
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <Context>
          <ThemedBody className={`${geistSans.variable} ${geistMono.variable} `}>
            {children}
          </ThemedBody>
        </Context>
      </ThemeProvider>
    </html>
  );
}
