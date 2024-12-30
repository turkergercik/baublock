"use client"
import Carousel from '@/components/carousel';
import React,{useEffect,useState,useRef,use} from 'react'
import { useAuthorization } from '@/app/contexts/authcontext';
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
function Page({params}) {
    const { id } = use(params);
    const folderpath =  decodeURIComponent(id)
    const [images,setImages] = useState([])
    const {allgallery}=useAuthorization()
    const router = useRouter()
    useEffect(()=>{
        
          const rt = async()=>{
            const filtered = allgallery.current.filter((item)=>item.folder===folderpath)
            console.log(filtered,855)
            if(filtered.length===0){
             try {
               
               const res1  = await fetch(`/api?foldername=${folderpath}`,{
                method:"GET",
              })
              let foldersresponse1  = await res1.json()
    
              setImages(foldersresponse1)
              allgallery.current.push({folder:folderpath,data:foldersresponse1})
              } catch (error) {
               console.log(error)
              }
            }else{
                setImages(filtered[0].data)
            }
        }
        
        rt()
         
      
    
    
      },[])
   
  return (
    <div className=' fixed flex flex-col justify-center items-center z-10 top-0 left-0 w-full bg-gray-900 h-screen'>
      <div className='text-2xl flex text-center bg-gray-900 p-3'>
        {folderpath}
      </div>
      
    
      <button onClick={()=>{router.back()}} className='absolute top-0 right-0 p-5 z-10'><IoMdClose size={45} /></button>
      <div className='flex h-full w-full'>
      <Carousel images={images}>

</Carousel>
      </div>
    
    
    </div>
  )
}

export default Page