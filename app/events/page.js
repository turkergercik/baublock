"use client"
import React,{useEffect,useState,useRef} from 'react'
import Carousel from '@/components/carousel'
import ScrollableButtonContainer from '@/components/scrollable'
function Page() {
    const [images,setImages] = useState([])
      const [folders,setFolders] = useState([])
      const [selectedfolders,setselectedFolders] = useState("")
      const allgallery = useRef([])
  
useEffect(()=>{
    if(selectedfolders!==""){
      const rt = async()=>{
        const filtered = allgallery.current.filter((item)=>item.folder===selectedfolders)
        console.log(filtered,855)
        if(filtered.length===0){
         try {
           let header = encodeURIComponent(selectedfolders);
           const res1  = await fetch(`/api?foldername=${selectedfolders}`,{
            method:"GET",
          })
          const foldersresponse1  = await res1.json()
          setImages(foldersresponse1)
          allgallery.current.push({folder:selectedfolders,data:foldersresponse1})
          } catch (error) {
           console.log(error)
          }
        }else{
         setImages(filtered[0].data)
        }
         
         
       
         //setImages(imgs)
        }
        rt()
    }else{
        const rt = async()=>{
            console.log(1)
           try {
            const res  = await fetch("/api/folders",{
              cache:"force-cache",
              method:"GET"
            })
            const foldersresponse  = await res.json()
            setFolders(foldersresponse)
            let header = encodeURIComponent(foldersresponse[0].name.toString());
            console.log(header);
            console.log(foldersresponse[0].name)
            const res1  = await fetch(`/api?foldername=${foldersresponse[0].name}`,{
             cache:"force-cache",
             method:"GET",
             headers: {
              'foldername':header
            }
           })
           const foldersresponse1  = await res1.json()
           setImages(foldersresponse1)
           allgallery.current.push({folder:foldersresponse[0].name,data:foldersresponse1})
           setselectedFolders(foldersresponse[0].name)
           console.log(allgallery.current)
           } catch (error) {
            console.log(error)
           }
           
         
           //setImages(imgs)
          }
          rt()
    }
    
     
  


  },[selectedfolders])


  return (
  <div className='w-full  h-full flex flex-1 flex-col'>
    <div className='flex flex-[3] h-full w-full bg-red-900 '>
    <Carousel images={images}>
      </Carousel>

    </div>
    <div className='bg-gray-900 flex py-6 w-full justify-end items-end'>

      <ScrollableButtonContainer folders={folders} selectedfolders={selectedfolders} setselectedFolders={setselectedFolders}></ScrollableButtonContainer>
    </div>

      </div>
  )
}

export default Page