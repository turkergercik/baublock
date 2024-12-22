"use client"
import React, { useEffect, useState,useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
//import { Autoplay, Pagination, Navigation,Controller,FreeMode ,EffectCoverflow,EffectCards} from "swiper/modules";
import { Autoplay,Pagination,Navigation,Controller,EffectCoverflow,EffectCards,Zoom } from "swiper";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/controller";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { useRouter } from "next/navigation";



export default function Carousel({images}){
    const router = useRouter()
    const swiperRef = useRef(null)
    if(images){

    
      return (
        <div className="h-full w-full">
          {images?.length > 0 && (
            <div className="bg-gray-900 w-full flex justify-center h-full py-2 items-center">
              {/* Navigation Buttons */}
              <button className="p-1" onClick={() => swiperRef.current.slidePrev()}>
                <GrPrevious color="white" size={30} />
              </button>
              <Swiper
                initialSlide={1}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                draggable={false}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 150,
                  scale: 0.6,
                  modifier: 1,
                  slideShadows: false,
                }}
                zoom
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                slidesPerView={1.5}
                navigation={false}
                centeredSlides
                loop
                breakpoints={{
                  250: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                }}
                spaceBetween={0}
                className="w-full h-full"
                modules={[Zoom, EffectCoverflow]}
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center h-full items-center w-full"
                  >
                    <div onClick={()=>{
                      if(image.iscover){
                        router.push(`events/${image.folderPath}`)

                      }
                      }} className="relative aspect-video  w-full  overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                      {image.type === "image" ? (
                        <><Image
                          src={image.transformedUrl}
                          alt={`Image ${index + 1}`}
                          fill
                          className="object-contain bg-gray-900 rounded-lg" />
                          {image.iscover && <span className="absolute text-center w-full bg-gray-800 bg-opacity-70 bottom-0 p-3 sm:p-5 md:p-6 lg:p-7 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white">
                            {image.folderName}
                          </span>}
                          </>
                      ) : (
                        <video
                          muted
                          controls
                          className="w-full h-full object-cover bg-gray-900 rounded-2xl"
                        >
                          <source src={image.transformedUrl} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="p-1" onClick={() => swiperRef.current.slideNext()}>
                <GrNext color="white" size={30} />
              </button>
            </div>
          )}
        </div>
      )
        }
}