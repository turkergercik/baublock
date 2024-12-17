"use client";
import React, { useEffect, useState } from "react";

const YouTubeVideos = ({ router }) => {
  const [videos, setVideos] = useState([]);
  const API_KEY = "AIzaSyCSQ5n6d74Oe-0NlJBMtdmRCSuXVO3lD48";
  const CHANNEL_ID = "UCI-McyMd08P8O5I_aMpa5Vg";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=3&order=date&type=video&key=${API_KEY}`,
          { cache: "force-cache" }
        );
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
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1 className="text-3xl p-5">Latest Videos</h1>
    <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full gap-3 px-2">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          className="bg-gray-700 h-full w-full flex-1  rounded-lg p-2 flex-col justify-between items-center"
        >
          
            <h2 className="text-center text-lg  md:text-xl h-1/4 sm:h-2/5 md:h-1/5">
              {decodeHtmlEntities(video.snippet.title)}
            </h2>
         

          <div className="relative w-full h-3/4 sm:h-3/5 md:h-4/5    ">
            <iframe
              className="absolute h-full w-full  rounded-lg"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ))}
    </div>
    <div className="w-full flex justify-center p-5">
      <button
        className="bg-gray-700 p-2 rounded-full text-white text-sm sm:text-base hover:bg-gray-800"
        onClick={() => {
          router.push(`https://www.youtube.com/channel/${CHANNEL_ID}`);
        }}
      >
        Visit the Channel
      </button>
    </div>
  </div>
  );
};

export default YouTubeVideos;
