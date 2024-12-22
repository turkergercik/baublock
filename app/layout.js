// app/layout.js or wherever you define RootLayout

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Context from "./contexts/authcontext";
import ScrollRestorationProvider from "@/components/scroller";
import { useAuthorization} from "./contexts/authcontext";
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



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  h-screen max-w-screen bg-gray-900  flex flex-col`}
        >
          <Context>
          <div className="h-full w-full mt-0">
<ScrollRestorationProvider>
        <Navbar />
          <div className="w-full h-full pt-[70px]">
        
       
        

          {children}

        
          
</div>
        </ScrollRestorationProvider>
        </div>
        </Context>
      </body>
     
           
          
    </html>
  );
}
