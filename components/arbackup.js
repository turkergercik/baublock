
"use client"
import React, { useEffect, useState } from 'react'
import { createClient } from 'contentful'

import { useRouter } from 'next/navigation';
const sid="h7ad3r48qk3t"
const at ="qvYt_tcie5ni9ozEnmc4QQJuLSy2k-nvA6hDaiZY2YE"
function Articlepreview({router}) {
    const [data,setdata]=useState([])
    useEffect(()=>{
        const rt = async()=>{
            try {
                const res = createClient({
                     space:sid,
                     accessToken:at
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
    <div className='flex justify-center items-center flex-col sm:flex-col px-2  h-full'>
        <div className='flex justify-center items-center w-full flex-col sm:flex-row gap-2 p-0 pt-5 h-full'>
          {data.map((item, index) => {
              return (
                  <button
                      onClick={() => { router.push(`/academy/articles/${item.sys.id}`); } }
                      key={index}
                      className='bg-gray-700 sm:w-full w-full rounded-xl  flex flex-row  items-center justify-start h-full'>

                      {/* Image container */}
                      <div className='flex-1 h-20 sm:h-28'>
                          <img
                              className='w-full h-full object-contain rounded-l-xl'
                              src={item.fields.thumbnail.fields.file.url}
                              alt={item.fields.title} />
                      </div>

                      {/* Text container */}
                      <span className='flex-[2] text-center text-white px-2'>
                          {item.fields.title}
                      </span>
                  </button>
              );
          })}
      </div>
      <div className=' p-5 flex justify-center'>
      <button onClick={()=>{router.push("/academy/articles",{scroll:false})}} className=' bg-gray-700 text-white p-2 rounded-full'>
              Real all Articles
          </button>


      </div>
          
          
          </div>
      


  )
}

export default Articlepreview