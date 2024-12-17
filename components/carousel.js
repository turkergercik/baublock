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


export default function Carousel({images}){
    
    const swiperRef  = useRef(null)
    if(images){

    
      return (
        <div className="h-full w-full">
          {images?.length > 0 && (
            <div className="bg-gray-900 w-full flex justify-center h-full py-2 items-center">
              {/* Navigation Buttons */}
              <button className="p-1" onClick={() => swiperRef.current.slidePrev()}>
                <GrPrevious size={30} />
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
                    slidesPerView: 1.1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 1.5,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 2,
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
                    <div className="relative aspect-video  w-full rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                      {image.type === "image" ? (
                        <Image
                          src={image.transformedUrl}
                          alt={`Image ${index + 1}`}
                          fill
                          className="object-contain bg-slate-700"
                        />
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
                <GrNext size={30} />
              </button>
            </div>
          )}
        </div>
      )
        }
}