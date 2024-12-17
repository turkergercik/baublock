"use client";
import React, { useRef, useState } from "react";

const ScrollableButtonContainer = ({ folders, selectedfolders, setselectedFolders }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false); // New flag to track dragging

  // Handle the start of dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasDragged(false); // Reset dragging flag
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // Handle dragging movement for mouse
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;

    // Set the dragging flag to true only if the user actually moves
    if (Math.abs(walk) > 5) {
      setHasDragged(true); // User has dragged
    }
  };

  // Handle dragging movement for touch
  const handleTouchMove = (e) => {
    
    const x = e.touches[0].pageX - containerRef.current.offsetLeft; // Get touch position
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;

    // Set the dragging flag to true only if the user actually moves
    if (Math.abs(walk) > 5) {
      setHasDragged(true); // User has dragged
    }

    // Prevent default scrolling behavior on mobile
    e.preventDefault();
  };

  // Handle the end of dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle button click selection
  const handleButtonClick = (button) => {
    // Only allow selection when not dragging
    if (!hasDragged) {
      setselectedFolders(button);
    }
  };

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto no-scrollbar bg-gray-900"
      style={{
        whiteSpace: "nowrap",
        msOverflowStyle: "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
     /*  onTouchStart={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd} */
    >
      {folders.map((item, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(item.name)}
          className={`inline-block p-2 px-3 mx-1.5 bg-gray-500 text-white rounded-full ${
            selectedfolders === item.name || (selectedfolders === "" && index === 0) ? "bg-gray-700 border-2" : ""
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ScrollableButtonContainer;
