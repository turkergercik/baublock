"use client"
import Image from "next/image";
import bg from "../public/assets/snow.jpg";
import Carousel from "@/components/carousel";
import { useState,useEffect, useRef } from "react";
import ScrollableButtonContainer from "@/components/scrollable";
import YouTubeVideos from "@/components/youtube";
import MediumArticles from "@/components/insights";
import { useRouter } from "next/navigation";
import Articlepreview from "@/components/articlepreview";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaTwitter, FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { usePathname } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  const [images,setImages] = useState([])
  const [folders,setFolders] = useState([])
  const [selectedfolders,setselectedFolders] = useState("")
  const allgallery = useRef([])
  const pathname = usePathname();
  const scrollPositions = useRef(0);

  /* useEffect(() => {
    // Restore scroll position for the current path
    const savedPosition = scrollPositions.current
    if (savedPosition !== undefined) {
    setTimeout(() => {
     
      window.scrollTo(0, savedPosition);
    }, 1000);
    } else {
      window.scrollTo(0, 0); // Default to top
    }


    
  }, [pathname]); */

  const navigate = (path) => {
    // Save the current scroll position before navigating
    scrollPositions.current = window.scrollY;
    console.log(scrollPositions.current)
    router.push(path);
  };

  
  useEffect(() => {
    const rt = async()=>{
     
     try {
      const res  = await fetch("/api/folders",{
        cache:"force-cache",
        method:"GET"
      })
      let foldersresponse  = await res.json()
      foldersresponse = foldersresponse.reverse()
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
     let foldersresponse1  = await res1.json()
     foldersresponse1 =foldersresponse1.reverse()
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
 
     /* const fetchImages = async () => {
       try {
         const response = await axios.get(
           `https://www.googleapis.com/drive/v3/files`,
           {
             params: {
               q: `'${folderId}' in parents`, // No MIME type filter
               key: API_KEY,
               fields: "files(id, name)",
             },
           }
         );
         console.log(response.data.files[0])
         setImages(response.data.files);
       } catch (error) {
         console.error("Error fetching images from Google Drive:", error);
       }
     };
 
     fetchImages(); */
   }, []);
 
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
          let foldersresponse1  = await res1.json()

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
    }
    
     
  


  },[selectedfolders])

 


  return (
    <div className="w-full h-screen  bg-gray-900 text-gray-200 p-3 pt-20">
      {/* floating menu */}
  
      <div className="flex flex-1 flex-col sm:flex-row w-full bg-gray-900  rounded-2xl items-center  p-10 gap-6">
  {/* Text Section */}
  <div className="flex flex-col flex-[3] h-full w-full items-center sm:items-start text-center sm:text-left">
    <h1 className="text-2xl sm:text-4xl font-semibold mb-4">
      Global Research Center for Blockchain Innovation
    </h1>
    <p className="text-lg sm:text-xl">
      We provide consultancy and training for private and public sectors globally.
    </p>
  </div>

  {/* Image Section */}
  <div className="relative flex flex-1 w-full h-full justify-center sm:justify-end">
    <Image
      className="object-contain max-h-[200px] min-w-[200px] sm:max-h-full"
      src="/assets/hero_banner.png"
      layout="responsive" 
      width={10}
      height={10}
      alt="Hero Banner"
    />
  </div>
</div>

 {/* who are we */}


<div className="flex w-full bg-gray-900   flex-1 flex-col  justify-center rounded-2xl items-center p-10 ">
  <div className=" flex flex-col flex-[3] p-0 justify-center gap-5 items-start">
    
  <h1 className="flex-1  text-3xl font-semibold ">
  BAU Blockchain and Innovation Center of Istanbul or BlockchainIST Center is the first university research
   and development center in Turkey for Blockchain Technology, hosted by Bahçeşehir University in Istanbul.
  </h1>
  <div className=" flex-col sm:flex-row flex flex-1">
    <div className="flex flex-col flex-1  items-center">
        <span className="text-3xl text-gray-300 font-semibold border-b-2 border-gray-900">Mission</span>
      <p className="flex-1  text-xl">
      We provide education and information on blockchain’s transformative impact while empowering individuals and 
      businesses with advanced knowledge "derived from real-world experiments".
      </p>
    </div>
  <div className=" flex flex-row flex-1">
    <div className="flex flex-col items-center ">
    <span className="text-3xl text-gray-300 font-semibold border-b-2 border-gray-900">Vision</span>
  <p className="flex-1  text-xl">
  We explore blockchain technology and design innovative solutions to inspire global understanding 
  through clear, accessible and reliable knowledge.
  </p>
    </div>

  </div>
 
  </div>
  
  </div>
  
  
</div>

{/* research */}
<div className="flex w-full flex-1 flex-col justify-center rounded-2xl items-center bg-gray-900 p-10 px-6">
  <div className=" flex w-full flex-col justify-center items-center gap-5">
  <span className="text-gray-300 font-semibold text-3xl border-y-2 border-gray-300">Research</span>
  <h1 className="flex-1 text-center text-xl font-semibold p-0 ">
    Focused Research Exploring Blockchain Across Core Areas
  </h1>
  </div>
  
  <div className=" flex-col custom:flex-row flex-1 flex w-full  items-start gap-3 "> {/* Explicit height and relative positioning */}
    <div className="flex-col flex-1 flex h-full  w-full gap-3  justify-center items-center">
        <div className="flex h-full w-full flex-1 py-5 justify-center ">
        <Image
          className="object-contain max-h-[200px] max-w-[300px] sm:max-h-full"
          src="/assets/3.png"
          layout="responsive"
          width={0}
          height={0}
          alt="Hero Banner"
        />
        </div>
        <span className="flex-1 text-gray-300 font-semibold text-center text-xl">
          Cryptoeconomics
        </span>
        <span className="flex-1 text-center">
          Blockchain's impact on economics and value exchange
        </span>
    </div>
    <div className="flex-col flex-1 flex h-full  w-full gap-3 items-center ">
        <div className="flex h-full w-full flex-1 py-5 justify-center">
        <Image
          className="object-contain max-h-[200px] max-w-[300px] sm:max-h-full"
          src="/assets/4.png"
          layout="responsive"
          width={0}
          height={0}
          alt="Hero Banner"
        />
        </div>
        <span className="flex-1 text-gray-300 font-semibold text-center text-xl">
          Fintech
        </span>
        <span className="flex-1 text-center">
          Blockchain's role in reshaping finance and technology
        </span>
    </div>
    <div className="flex-col flex-1 flex h-full w-full gap-3 items-center ">
        <div className="flex h-full w-full flex-1 py-5 justify-center">
        <Image
          className="object-contain max-h-[200px] max-w-[300px] sm:max-h-full"
          src="/assets/5.png"
          layout="responsive"
          width={0}
          height={0}
          alt="Hero Banner"
        />
        </div>
        <span className="flex-1 text-gray-300 text-center font-semibold text-xl">
         Sentiment Analysis
        </span>
        <span className="flex-1 text-center">
          Assessing public sentiment on blockchain topics
        </span>
    </div>
    <div className="flex-col flex-1 flex h-full w-full gap-3 items-center">
        <div className="flex h-full w-full flex-1 py-5 justify-center">
        <Image
          className="object-contain max-h-[200px] max-w-[300px] sm:max-h-full"
          src="/assets/6.png"
          layout="responsive"
          width={0}
          height={0}
          alt="Hero Banner"
        />
        </div>
        <span className="flex-1 text-gray-300 font-semibold text-center text-xl">
          On-chain Metrics
        </span>
        <span className="flex-1 text-center">
          Blockchain data to gain insights into decentralized networks
        </span>
    </div>
  
  
  
  </div>


</div>
{/* fintech */}
<div className="flex flex-1 flex-col  w-full bg-gray-900  rounded-2xl items-center  p-5 py-10 gap-6">
  <h1 className="text-4xl">Academy</h1>
   {/* Image Section */}
   <div className="flex flex-1 custom:flex-row flex-col gap-5 w-full h-full items-center">

 
   <div className="relative flex flex-1  w-full h-full justify-center custom:justify-end">
    <Image
      className="object-contain max-h-[200px] rounded-lg min-w-[200px] max-w-[300px] sm:max-h-full"
      src="/assets/fintech.png"
      layout="responsive" 
      width={10}
      height={10}
      alt="Hero Banner"
    />
  </div>
  {/* Text Section */}
  <div className="flex flex-col flex-[3]  h-full w-full items-center sm:items-start text-center sm:text-left">
    <h1 className="text-2xl sm:text-3xl  mb-4">
      FinTech Master of Science Program
    </h1>
    <p className="text-lg text-justify sm:text-xl">
    The Financial Technology (Fintech) Master's program at Bahçeşehir University integrates technology to enhance financial services, making them faster, more accessible, and user-friendly. It meets the growing demand for tech-driven finance solutions, focusing on cloud-based payments, wearable technology, and the Internet of Things. As the Fintech ecosystem expands, Turkey is poised to become a financial technology hub. The interdisciplinary program equips students with the skills to navigate finance and technology, offering both theoretical knowledge and practical experience through research projects, with opportunities for hands-on learning locally and internationally.
    </p>
  </div>
  </div>
 
</div>
{/* yt */}
      <div className="pb-2 bg-gray-900">
         <YouTubeVideos router={router}></YouTubeVideos>
         
      </div>
    <div className="  bg-gray-900">
    <Articlepreview router={router}></Articlepreview>

   
    </div>
       

  
<div className="bg-gray-900 border-y-2 w-full p-1 pt-2">
            <span className="text-3xl text-center block p-2">{selectedfolders}</span>
            <Carousel  images={images}>

            </Carousel>
            <div className="py-2 h-full">
<ScrollableButtonContainer folders={folders} selectedfolders={selectedfolders} setselectedFolders={setselectedFolders}  ></ScrollableButtonContainer>

            </div>
</div>
   

      {/* Contact Us Section */}
      <div className="flex justify-center  w-full items-center p-10 bg-gray-900">
      <div className=" flex flex-col items-center w-2/3  xl:w-2/3">
        <h1 className="text-3xl font-bold text-center text-white p-5">Stay in touch with us</h1>

        <div className="flex custom:flex-row flex-col-reverse justify-center items-center gap-3  ">
          {/* Location Section */}
          <div className=" bg-white p-0 rounded-md shadow-lg">
           {/*  <h2 className="text-xl font-semibold text-black mb-4">Our Location</h2> */}
            <iframe
            className="border-2 border-white rounded-lg h-[300px]  aspect-square "
              src="https://maps.google.com/maps?q=Bahçeşehir%20Üniversitesi,41.04235516109231,29.00928055767128&z=15&output=embed"
              
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Information */}
          <div className=" flex flex-row w-full  custom:flex-col justify-center items-center sm:items-start p-0 rounded-md shadow-lg" >
           
            <div className="h-full aspect-square">
            <Link target="_blank" href={"https://www.linkedin.com/company/blockchainist-center"} className=" p-0">
            <FaLinkedin size={45}   className="w-full h-full p-2"></FaLinkedin>
            </Link>
            </div>

            <div className="h-full aspect-square">
            <Link target="_blank" href={"https://mail.google.com/mail/?view=cm&fs=1&to=blockchainist@rc.bau.edu.tr"} className=" p-0">
            <MdEmail size={45}    className="w-full h-full p-2"></MdEmail>
            </Link>
            </div>

            <div className="h-full aspect-square">
            <Link target="_blank" href={"https://www.youtube.com/@BlockchainISTCenter"} className=" p-0">
            <FaYoutube size={45}    className="w-full h-full p-2" ></FaYoutube>
            </Link>
            </div>

            <div className="h-full aspect-square">
            <Link target="_blank" href={"https://www.instagram.com/bcistcenter/"} className=" p-0">
            <FaInstagram size={45}   className="w-full h-full p-2" ></FaInstagram>
            </Link>
            </div>

            <div className="h-full aspect-square">
            <Link target="_blank" href={"https://medium.com/blockchainist-center"} className=" p-0">
            <FaMedium size={45}    className="w-full h-full p-2" ></FaMedium>
            </Link>
            </div>
           
            
            
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
