"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";

const YouTubeVideos = ({router}) => {

  const [videos, setVideos] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

  useEffect(() => {
    const fetchVideos = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=3&order=date&type=video&key=${API_KEY}`
          ,{
            cache:"force-cache"
          });
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setVideos(data.items); // Set the retrieved videos to state
        } catch (error) {
          console.error("Failed to fetch videos:", error);
        }
      };
  
      fetchVideos();
  }, []);
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };
  return (
    <div className="w-full h-full  flex justify-center items-center  flex-col">

      <h1 className="text-3xl p-2">Latest Videos</h1>
      <div className="flex flex-col custom:flex-row w-full h-full items-center  custom:items-stretch  gap-3 p-3 ">
      {videos.map((video) => (
        <div key={video.id.videoId} className="flex bg-gray-700  rounded-lg w-full sm:w-3/4 custom:w-full p-2  flex-col justify-between items-center">
          <h2 className="text-center text-xl p-2 pb-2">{decodeHtmlEntities(video.snippet.title)}</h2>

          <iframe
          className="rounded-lg aspect-video w-full "
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          
        </div>
      ))}
      </div>
      <Link className=" bg-gray-700 p-2 m-4 rounded-full text-white" target="_blank" href={`https://www.youtube.com/channel/${CHANNEL_ID}`}>
      Visit the Channel</Link>
    </div>
  );
};

export default YouTubeVideos;
