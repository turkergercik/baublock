"use client"
import React, { useEffect, useState } from 'react'
import Carousel from '@/components/carousel'

function Page() {
    const [images, setImages] = useState([])

    useEffect(() => {
        const rt = async() => {
            try {
                const res = await fetch("/api/folders", {
                    cache: "force-cache",
                    method: "GET"
                })
                let foldersresponse = await res.json()
                foldersresponse = foldersresponse.reverse()
                setImages(foldersresponse)
            } catch (error) {
                console.log(error)
            }
        }
        rt()
    }, []);

    return (
        <div className='flex-1 w-full h-screen flex border-0 -mt-[100px]  items-center justify-center '>
            <div className='w-full h-full flex items-center justify-center pt-[100px]'>
                <Carousel images={images} />
            </div>
        </div>
    )
}

export default Page
