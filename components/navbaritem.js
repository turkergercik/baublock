
import Link from 'next/link';
import navbarRoutes from '../routes';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function NavbarItem({ route, isOpen, onClick, closeDropdown }) {
  if (route.children) {
    // Dropdown logic
    return (
      <div className="relative">
        <button
          onClick={onClick}
          className="hover:bg-gray-700 hover:scale-110 transition-transform whitespace-nowrap p-2 rounded flex-row flex justify-center items-center gap-2 text-gray-200"
        >
          {route.label}
          {isOpen === true ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropdown />}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 z-10 whitespace-nowrap bg-gray-900 text-white rounded-md border-gray-200 border-2 shadow-lg">
            {route.children.map((child, index) => (
              <Link
                key={index}
                href={child.path}
                className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                onClick={closeDropdown} // Close dropdown when a link is clicked
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    // Single link logic
    return (
      <Link
        href={route.path}
        onClick={closeDropdown}
        className="hover:bg-gray-700 p-2 whitespace-nowrap w-full rounded hover:scale-110 transition-transform text-gray-200"
      >
        {route.label}
      </Link>
    );
  }
  
}


