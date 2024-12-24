
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
    <div className='h-full w-full'><div className='flex justify-center h-full  items-center flex-col custom:flex-row gap-2 p-2 '>
          {data.map((item, index) => {
              return (
                  <button
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
              );
          })}
      </div>
      <div className='bg-gray-900 p-2 flex justify-center'>
      <button onClick={()=>{router.push("/academy/articles",{scroll:false})}} className=' bg-gray-700 text-white p-2 m-3 rounded-full'>
              Real all Articles
          </button>


      </div>
          
          
          </div>
      


  )
}

export default Articlepreview