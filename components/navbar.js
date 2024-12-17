'use client';

import { useState } from 'react';
import Link from 'next/link';
import navbarRoutes from '../routes';
import NavbarItem from './navbaritem';
import Image from 'next/image';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the mobile menu
  const [isExiting, setIsExiting] = useState(false); // State to track exit animation
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

  return (
    <nav className="bg-gray-900 border-b-white border-b-2 text-gray-200 p-2 fixed h-[70px] custom:h-24 flex z-10 w-full">
    <div className="flex justify-between w-full items-center ">
      {/* Logo */}
      <div className="text-lg font-semibold w-full items-center h-full flex pl-2">
        <Link href="/">
          <Image className='w-[60px] custom:w-[60px]' src={'/assets/logo2.png'} priority width={750} height={750} alt="logo" />
        </Link>
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
            closeDropdown={() => setOpenDropdown(null)}
          />
        ))}
      </div>
    </div>
    
    {/* Mobile menu - toggled by the hamburger button */}
    {isMenuOpen && (
      <div className={`custom:hidden fixed right-0 top-[70px]  ${
          isExiting
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
              }}
            />
          ))}
        </div>
      </div>
    )}
  </nav>
  
  );
}
