"use client"
import React,{useEffect,useState,useRef} from 'react'
import Carousel from '@/components/carousel'
function Page() {
    const [images,setImages] = useState([])

     
  
      useEffect(() => {
        const rt = async()=>{
         
         try {
          const res  = await fetch("/api/folders",{
            cache:"force-cache",
            method:"GET"
          })
          let foldersresponse  = await res.json()
          foldersresponse = foldersresponse.reverse()
          setImages(foldersresponse)
         
         
         } catch (error) {
          console.log(error)
         }
         
       
       
        }
        rt()
     
         
       }, []);


  return (
  <div className='w-full  h-full flex pt-20'>
   
    <Carousel images={images}>
      </Carousel>

 

      </div>
  )
}

export default Page