'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import navbarRoutes from '../routes';
import NavbarItem from './navbaritem';
import Image from 'next/image';
import { useAuthorization } from '@/app/contexts/authcontext';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import isMobile from 'is-mobile';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/app/contexts/themecontext';
//import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
export default function Navbar() {
  const {open,setopen} = useAuthorization()
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the mobile menu
  const [isExiting, setIsExiting] = useState(false); // State to track exit animation
  const [ismobile, setismobile] = useState(); // State to track exit animation
  const pathname = usePathname()
  const theme = useTheme();
 useEffect(()=>{
  const ismobiled = isMobile({tablet:true,featureDetect:true})
  setismobile(ismobiled)

 },[])
  const handleDropdownClick = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsExiting(true); // Trigger exit animation
     
      setTimeout(() => {
        setIsMenuOpen(false); // Close menu after exit animation completes
        //setIsExiting(false); // Reset exit state
      }, 500); // Match this timeout to
    } else {
    
        setIsMenuOpen(true); // Open menu (with entry animation)
        
     
      setIsExiting(false); // Trigger exit animation
    }
    setOpenDropdown(null)
  };
  const recipient = "blockchainist@rc.bau.edu.tr"; // Replace with the provided email
  const subject = ""; // Optional
  const body = ""; // Optional

  return (
      <><nav className={`${theme.bgColor} ${theme.borderColor} ${open ? "animate-slide-in-top " : "animate-slide-out-top"} border-b-2 top-0   transition-all duration-500 ease-in-out ${theme.textColor}  fixed h-[70px] custom:h-24 flex z-10 w-full`}>
        <div className={`${theme.navbarBg} flex justify-between  w-full h-full items-center`}>
          {/* Logo */}
          <div className="text-lg  font-semibold  items-center p-1  h-full flex  custom:flex-row pl-2">
            <Link className='relative h-full aspect-square ' href="/">
              <Image
                className=' aspect-square p-2 '
                src={theme.logo}
                priority
                fill
                alt="logo" />
            </Link>
            <span className='px-2  custom:text-lg font-normal whitespace-nowrap'>
              {theme.title}
            </span>
          </div>


          {/* Hamburger button for small screens */}
          <div className="custom:hidden h-full flex  items-center">
            <button className="text-gray-200 focus:outline-none" onClick={toggleMenu}>
              {/* Hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navbar links - hidden on small screens */}
          <div className="hidden custom:flex items-center space-x-3">
            {navbarRoutes.map((route, index) => (
              <NavbarItem
                key={index}
                route={route}
                isOpen={openDropdown === route.label}
                onClick={() => handleDropdownClick(route.label)}
                closeDropdown={() => setOpenDropdown(null)} />
            ))}

          </div>
        </div>

        {/* Mobile menu - toggled by the hamburger button */}
        {isMenuOpen && (
          <div className={`custom:hidden fixed right-0 top-[70px]  ${isExiting
              ? 'animate-slide-out-right' // Apply exit animation when closing
              : 'animate-slide-in-right' // Apply entry animation when opening
            }`}>
            <div className="bg-gray-900 text-gray-200 w-fit right-0 flex flex-col space-y-3 p-3">
              {navbarRoutes.map((route, index) => (
                <NavbarItem
                  key={index}
                  route={route}
                  isOpen={openDropdown === route.label}
                  onClick={() => handleDropdownClick(route.label)}
                  closeDropdown={() => {
                    setOpenDropdown(null);
                    setIsMenuOpen(false); // Close mobile menu when a link is clicked
                  } } />
              ))}
              <button onClick={() => {
                localStorage.removeItem("scrollData");
                alert("ok");
              } }>
                787
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* floating icons */}
      <div className={`${open ? "animate-slide-in-down" : "animate-slide-out-down"} fixed inset-x-0 mx-auto bottom-4 border-2 border-white  w-fit flex flex-col-reverse backdrop-blur-xl z-20 rounded-xl `}>
          <div className="flex flex-row w-[220px] custom:w-[280px] h-full justify-center items-center p-0 shadow-2xl rounded-lg bg-black bg-opacity-50">
            <div className="h-full w-full aspect-square m-0">
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/blockchainist-center"
                className="p-0"
              >
                <FaLinkedin size={45} className="w-full h-full p-2 text-white" />
              </Link>
            </div>

            <div className="h-full w-full aspect-square m-0">
              {ismobile ? <Link
                target="_blank"
                href={` mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                className="p-0"
              >
                <MdEmail size={45} className="w-full h-full p-2 text-white" />
              </Link> : <Link
                target="_blank"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}`}
                className="p-0"
              >
                <MdEmail size={45} className="w-full h-full p-2 text-white" />
              </Link>}

            </div>

            <div className="h-full w-full aspect-square m-0">
              <Link
                target="_blank"
                href="https://www.youtube.com/@BlockchainISTCenter"
                className="p-0"
              >
                <FaYoutube size={45} className="w-full h-full p-2 text-white" />
              </Link>
            </div>

            <div className="h-full w-full aspect-square m-0">
              <Link
                target="_blank"
                href="https://www.instagram.com/bcistcenter/"
                className="p-0"
              >
                <FaInstagram size={45} className="w-full h-full p-2 text-white" />
              </Link>
            </div>

            <div className="h-full w-full aspect-square m-0">
              <Link
                target="_blank"
                href="https://medium.com/blockchainist-center"
                className="p-0"
              >
                <FaMedium size={45} className="w-full h-full p-2 text-white" />
              </Link>
            </div>
          </div>


        </div>
        
        </> 
  
  );
}
