"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const YouTubeVideos = () => {
  const router = useRouter()
  const [videos, setVideos] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const CHANNEL_ID = "PLKWURSfbf0MTDiIg3htxqni-cPzSi1loR"

  useEffect(() => {
    const fetchVideos = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=18&playlistId=${CHANNEL_ID}&key=${API_KEY}`
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
  <div className="w-full min-h-screen pt-20  flex justify-center items-center flex-col">
 
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   w-full h-full items-center custom:items-stretch gap-3 p-3">
    {videos.map((video,index) => (
      <div
        key={index}
        className="flex bg-gray-700 rounded-lg w-full p-2 flex-col justify-between items-center"
      >
        <h2 className="text-center text-xl p-2 pb-2">
          {decodeHtmlEntities(video.snippet.title)}
        </h2>

        <iframe
          className="rounded-lg aspect-video w-full "
          src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ))}
  </div>
  
  {/* Ensure this section is visible */}
  <div className="h-auto  p-10 ">
    <Link
    target="_blank"
      className="bg-gray-700 p-3 text-xl rounded-full text-white"
      href={`https://www.youtube.com/playlist?list=${CHANNEL_ID}`}
    >
      Playlist
    </Link>
  </div>
</div>

  );
};

export default YouTubeVideos;
