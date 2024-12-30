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
import { isMobile } from "react-device-detect";
import { useTheme } from "./contexts/themecontext";
export default function Home() {
  const router = useRouter();
  const [images,setImages] = useState([])
  const [folders,setFolders] = useState([])
  const [galleries,setgalleries] = useState([])
  const [selectedfolders,setselectedFolders] = useState("")
  const allgallery = useRef([])
  const [ismobile, setismobile] = useState(true); // State to track exit animation
  const pathname = usePathname();
  const scrollPositions = useRef(0);
  const recipient = "blockchainist@rc.bau.edu.tr"; // Replace with the provided email
  const subject = ""; // Optional
  const body = ""; // Optional
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
  const theme = useTheme();
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
      setImages(foldersresponse)
      /* let header = encodeURIComponent(foldersresponse[0].name.toString());
      console.log(header);
      console.log(foldersresponse[0].name)
      const res1  = await fetch(`/api?foldername=${foldersresponse[0].name}`,{
       cache:"force-cache",
       method:"GET",
       headers: {
        'foldername':header
      }
     }) */
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
    <div className={` w-full h-screen p-16 `}>
      {/* Floating Menu */}
      <div className=" border-2 border-white rounded-2xl p-5 flex flex-1 pr-0 flex-col h-5/6 sm:h-1/2 sm:flex-row w-full bg-gray-900 items-center">
        {/* Text Section */}
        <div className=" flex flex-col justify-center h-full w-full items-center sm:items-start text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-semibold ">
            Global Research Center for Blockchain Innovation
          </h1>
          <p className="text-lg sm:text-xl">
            We provide consultancy and training for private and public sectors globally.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative flex  h-full aspect-square justify-center sm:justify-end">
          <Image
            className="object-contain"
            src="/assets/hero_banner.png"
            fill
            alt="Hero Banner"
          />
        </div>
      </div>

      {/* Who Are We */}
      <div className="flex w-full my-10  bg-gray-900 flex-1 flex-col justify-center rounded-2xl items-center ">
        <div className="flex flex-col flex-[3] p-0 justify-center    items-start">
          <h1 className="flex-1 text-3xl text-justify p-5 mb-10 border-2 border-white rounded-2xl font-semibold py-10">
            BAU Blockchain and Innovation Center of Istanbul or BlockchainIST Center is the first university research and development center in Turkey for Blockchain Technology, hosted by Bahçeşehir University in Istanbul.
          </h1>
          <div className="flex-col sm:flex-row flex flex-1 gap-5">
            <div className="flex flex-col flex-1 items-center border-2 border-white rounded-2xl p-5">
              <span className="text-3xl text-gray-300 font-semibold border-b-2 border-gray-900">Mission</span>
              <p className="flex-1 text-center text-xl">
                We provide education and information on blockchain’s transformative impact while empowering individuals and businesses with advanced knowledge "derived from real-world experiments".
              </p>
            </div>
            <div className="flex flex-row flex-1 border-2 border-white rounded-2xl p-5">
              <div className="flex flex-col items-center">
                <span className="text-3xl text-gray-300 font-semibold border-b-2 border-gray-900">Vision</span>
                <p className="flex-1 text-center text-xl">
                  We explore blockchain technology and design innovative solutions to inspire global understanding through clear, accessible and reliable knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Research */}
      <div className="flex w-full flex-1 py-10 flex-col border-2 border-white  justify-center rounded-2xl items-center bg-gray-900 ">
        <div className="flex w-full flex-col justify-center items-center gap-5">
          <span className="text-white font-semibold text-3xl    border-gray-300">Research</span>
          <h1 className="flex-1 text-center text-white text-xl font-semibold p-0">
            Focused Research Exploring Blockchain Across Core Areas
          </h1>
        </div>
        <div className="flex-col custom:flex-row flex-1 flex w-full items-start gap-3">
          {[
            { title: "Cryptoeconomics", description: "Blockchain's impact on economics and value exchange", src: "/assets/3.png" },
            { title: "Fintech", description: "Blockchain's role in reshaping finance and technology", src: "/assets/4.png" },
            { title: "Sentiment Analysis", description: "Assessing public sentiment on blockchain topics", src: "/assets/5.png" },
            { title: "On-chain Metrics", description: "Blockchain data to gain insights into decentralized networks", src: "/assets/6.png" },
          ].map((item, index) => (
            <div key={index} className="flex-col flex-1 flex h-full w-full gap-3 items-center">
              <div className="flex h-full w-full flex-1 py-5 justify-center">
                <Image className="object-contain max-h-[200px] max-w-[300px] sm:max-h-full" src={item.src} layout="responsive" width={0} height={0} alt={item.title} />
              </div>
              <span className="flex-1 text-gray-300 font-semibold text-center text-xl">{item.title}</span>
              <span className="flex-1 text-center">{item.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fintech */}
      <div className="flex flex-1 flex-col w-full my-10 p-5 border-2 border-white  bg-gray-900 rounded-2xl items-center gap-0">
        <h1 className="text-4xl py-0 border-b-2 border-white">Academy</h1>
        <div className="flex flex-1 py-5 custom:flex-row flex-col gap-5 w-full h-full items-center">
          <div className="relative flex flex-1 w-full h-full justify-center custom:justify-start">
            <Image
              className="object-contain max-h-[200px] rounded-lg min-w-[200px] max-w-[300px] sm:max-h-full"
              src="/assets/fintech.png"
              layout="responsive"
              width={10}
              height={10}
              alt="Hero Banner"
            />
          </div>
          <div className="flex flex-col flex-[3] h-full w-full items-center sm:items-start text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl mb-4">FinTech Master of Science Program</h1>
            <p className="text-lg text-justify sm:text-xl">
              The Financial Technology (Fintech) Master's program at Bahçeşehir University integrates technology to enhance financial services, making them faster, more accessible, and user-friendly. It meets the growing demand for tech-driven finance solutions, focusing on cloud-based payments, wearable technology, and the Internet of Things. As the Fintech ecosystem expands, Turkey is poised to become a financial technology hub. The interdisciplinary program equips students with the skills to navigate finance and technology, offering both theoretical knowledge and practical experience through research projects, with opportunities for hands-on learning locally and internationally.
            </p>
          </div>
        </div>
      </div>

      {/* YouTube Videos */}
      <div className=" border-2 border-white rounded-2xl p-5 bg-gray-900">
        <YouTubeVideos router={router} />
      </div>

      {/* Article Preview */}
      <div className="bg-gray-900">
        <Articlepreview router={router} />
      </div>

      {/* Carousel */}
      <div className="bg-gray-900 border-2 border-white rounded-2xl py-5 w-full p-0">
        
        <Carousel images={images} />
        <div className=" h-full">
          <ScrollableButtonContainer folders={folders} selectedfolders={selectedfolders} setselectedFolders={setselectedFolders} />
        </div>
      </div>

      {/* Contact Us Section */}
     
        <div className="flex flex-col justify-center  items-center ">
          <h1 className="text-3xl font-bold text-center text-white whitespace-nowrap p-5">Stay in touch with us</h1>
          <div className="flex h-full flex-col justify-center items-center gap-3">
            {/* Location Section */}
            <div className="bg-white p-0 rounded-md shadow-lg">
              <iframe
                className="border-2 border-white rounded-lg h-[300px] aspect-square"
                src="https://maps.google.com/maps?q=Bahçeşehir%20Üniversitesi,41.04235516109231,29.00928055767128&z=15&output=embed"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Information */}
            <div className="flex flex-row w-full justify-between  items-center sm:items-start p-0 rounded-md shadow-lg">
              {[
                { href: "https://www.linkedin.com/company/blockchainist-center", icon: <FaLinkedin size={45} /> },
                { href: ismobile ? `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : "mailto:", icon: <MdEmail size={45} /> },
                { href: "https://www.instagram.com/blockchainistcenter/", icon: <FaInstagram size={45} /> },
                { href: "https://www.youtube.com/channel/UCFa_Au9xOIX4dy95JAwYSbg", icon: <FaYoutube size={45} /> },
                { href: "https://medium.com/@blockchainistcenter", icon: <FaMedium size={45} /> },
              ].map((item, index) => (
                <Link key={index} href={item.href} passHref>
                 {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

  );
}
