
"use client"
import React, { useEffect, useState } from 'react'
import { createClient } from 'contentful'

import { useRouter } from 'next/navigation';
const sid="h7ad3r48qk3t"
const at ="qvYt_tcie5ni9ozEnmc4QQJuLSy2k-nvA6hDaiZY2YE"
function Page() {
    const router = useRouter()
    const [data,setdata]=useState([])
    useEffect(()=>{
        const rt = async()=>{
            try {
                const res = createClient({
                     space:sid,
                     accessToken:at
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
    <div className='w-full h-full flex  justify-center'>
      <div className='flex justify-center items-center bg-gray-900 flex-col gap-3 p-3 h-full w-full lg:w-5/6 '>
    {
        data.map((item,index)=>{
              return <button onClick={()=>{router.push(`/academy/articles/${item.sys.id}`)}} key={index} className='bg-gray-500 w-full  rounded-xl flex flex-row  items-center justify-start h-1/6'>
                <div  className=' h-full '>
                <img className=' h-full object-contain p-1' src={item.fields.thumbnail.fields.file.url}></img>

                </div>
                <div className=' w-full h-full flex   flex-col  justify-evenly items-center '>
                <span className='w-full text-center text-2xl font-semibold'> {item.fields.title}</span>
                <span className='w-full text-center'>  ({new Date(item.fields.publishdate).toLocaleDateString("en-TR",{day:"numeric",month:"numeric",year:"numeric"})})</span>

                </div>
               
                  
                </button>
        })
    }
   
   </div>
    </div>
  )
}

export default Page