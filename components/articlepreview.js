
"use client"
import React, { useEffect, useState } from 'react'
import { createClient } from 'contentful'

import { useRouter } from 'next/navigation';
import { FaRegClock } from "react-icons/fa";
const contenfulspaceid= process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const contenfulaccesstoken =process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
function Articlepreview({router}) {
    const [data,setdata]=useState([])
    useEffect(()=>{
        const rt = async()=>{
            try {
                const res = createClient({
                     space:contenfulspaceid,
                     accessToken:contenfulaccesstoken
                  })
               const res1= await res.getEntries({content_type:"blog",limit:3})
               console.log(res1.items[0])
               setdata(res1.items)
             } catch (error) {
                 console.log(error)
             }

        }
        rt()

    },[])
  
   
   
    

   

  return (
    <div className="flex flex-col h-full w-full  items-center">
    {/* Buttons Container */}
    <div className="flex justify-center h-full w-full xs:w-1/3  sm:w-2/3 custom:w-4/5 lg:w-4/5 items-center custom:items-stretch   flex-col custom:flex-row gap-3 p-2">
      {data.map((item, index) => (
        <button
          onClick={() => { router.push(`/academy/articles/${item.sys.id}`); }}
          key={index}
          className="bg-gray-700 w-full px-2 rounded-xl flex flex-col ">
          
          {/* Image container */}
          <div className="  bg-black   rounded-xl my-2">
            <img
              className=" w-full  object-contain aspect-auto rounded-xl"
              src={item.fields.thumbnail.fields.file.url}
              alt={item.fields.title} />
          </div>
  
          {/* Text container */}
            <div className="flex flex-row h-full w-full justify-between items-center border-b-2">
              <div className="flex flex-row justify-center items-center">
                <div className="text-sm line-clamp-2 text-white px-2">
                  <FaRegClock />
                </div>
                <div>1min</div>
              </div>
              <div className="text-sm text-white">
                {new Date(item.fields.publishdate).toLocaleDateString("en-TR", { day: "numeric", month: "numeric", year: "numeric" })}
              </div>
            </div>
            <div className="w-full text-xl text-white px-2">
              {item.fields.title}
            </div>
            <div className="w-full text-white px-2">
            {item.fields.summary}
            </div>
         
        </button>
      ))}
    </div>
  
    {/* Footer */}
    <div className="bg-gray-900 p-2 flex justify-center">
      <button
        onClick={() => { router.push("/academy/articles", { scroll: false }); }}
        className="bg-gray-700 text-white p-2 m-3 rounded-full">
        Read All Articles
      </button>
    </div>
  </div>
  
      


  )
}

export default Articlepreview