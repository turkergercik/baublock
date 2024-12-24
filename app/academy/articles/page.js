
"use client"
import React, { useEffect, useState } from 'react'
import { createClient } from 'contentful'

import { useRouter } from 'next/navigation';
import { FaRegClock } from "react-icons/fa";
const contenfulspaceid= process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const contenfulaccesstoken =process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
function Page() {
    const router = useRouter()
    const [data,setdata]=useState([])
    useEffect(()=>{
        const rt = async()=>{
            try {
                const res = createClient({
                     space:contenfulspaceid,
                     accessToken:contenfulaccesstoken
                  })
               const res1= await res.getEntries({content_type:"blog"})
               console.log(res1.items[0])
               setdata(res1.items)
             } catch (error) {
                 console.log(error)
             }

        }
        rt()

    },[])
  
   
   
    

   

  return (
    <div className='w-full min-h-full flex pt-20  justify-center'>
      <div className='grid grid-cols-3 justify-center items-center bg-gray-900 flex-row gap-3 p-3 h-full w-full lg:w-5/6 '>
    {
        data.map((item,index)=>{
              return  <button
                                    onClick={() => { router.push(`/academy/articles/${item.sys.id}`); } }
                                    key={index}
                                    className='bg-gray-700 px-2 sm:w-full w-full rounded-xl  flex flex-col items-center justify-start h-full'>
              
                                    {/* Image container */}
                                    <div className=' h-20 sm:h-[200px] w-full items-center justify-center flex  bg-white rounded-xl my-2'>
                                        <img
                                            className=' h-full   p-3  object-contain rounded-l-xl'
                                            src={item.fields.thumbnail.fields.file.url}
                                            alt={item.fields.title} />
                                    </div>
              
                                    {/* Text container */}
                                    <div className='w-full flex  flex-col  justify-evenly items-center  '>
                                      <div className='flex flex-row h-full w-full justify-between items-center border-b-2 '>
                                      <div className='flex flex-row justify-center items-center'>
                                      <div className=' text-sm  line-clamp-2   text-white px-2 '>
                                      <FaRegClock />
                                      
                                       
                                    </div>
                                    <div>
                                    {"1min"}
                                    </div>
                                      </div>
                                    <div className=' text-sm  text-white'>
                                    {new Date(item.fields.publishdate).toLocaleDateString("en-TR",{day:"numeric",month:"numeric",year:"numeric"})}
                                    </div>
                                      </div>
                                    
                                    <div className=' w-full text-xl text-white px-2'>
                                    {item.fields.title}
                                    </div>
                                    <div className=' w-full  text-white px-2'>
                                    {"Description"}
                                    </div>
                                    </div>
                                    
                                </button>
        })
    }
    {
        data.map((item,index)=>{
              return  <button
                                    onClick={() => { router.push(`/academy/articles/${item.sys.id}`); } }
                                    key={index}
                                    className='bg-gray-700 px-2 sm:w-full w-full rounded-xl  flex flex-col items-center justify-start h-full'>
              
                                    {/* Image container */}
                                    <div className=' h-20 sm:h-[200px] w-full items-center justify-center flex  bg-white rounded-xl my-2'>
                                        <img
                                            className=' h-full   p-3  object-contain rounded-l-xl'
                                            src={item.fields.thumbnail.fields.file.url}
                                            alt={item.fields.title} />
                                    </div>
              
                                    {/* Text container */}
                                    <div className='w-full flex  flex-col  justify-evenly items-center  '>
                                      <div className='flex flex-row h-full w-full justify-between items-center border-b-2 '>
                                      <div className='flex flex-row justify-center items-center'>
                                      <div className=' text-sm  line-clamp-2   text-white px-2 '>
                                      <FaRegClock />
                                      
                                       
                                    </div>
                                    <div>
                                    {"1min"}
                                    </div>
                                      </div>
                                    <div className=' text-sm  text-white'>
                                    {new Date(item.fields.publishdate).toLocaleDateString("en-TR",{day:"numeric",month:"numeric",year:"numeric"})}
                                    </div>
                                      </div>
                                    
                                    <div className=' w-full text-xl text-white px-2'>
                                    {item.fields.title}
                                    </div>
                                    <div className=' w-full  text-white px-2'>
                                    {"Description"}
                                    </div>
                                    </div>
                                    
                                </button>
        })
    }
   </div>
    </div>
  )
}

export default Page