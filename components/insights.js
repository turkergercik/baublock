"use client"
import React, { useEffect, useState } from "react";

const MediumArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const url ="https://play-lh.googleusercontent.com/5uMPvygGoe3Y6aLKjdH1bxf567RA2mvY6dIsGocU5LQIyb8YjWkkuQt-m99ITIAwGWsi"
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/medium"); // Adjust this URL to your API route
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${response.statusText}`);
        }
        const data = await response.json();
        setArticles(data.slice(0,3));
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className=" flex justify-center bg-gray-900 flex-col items-center w-full">

     <span className="text-3xl p-2" >Insights</span>
      {!selectedArticle && (
        <ul className="flex flex-1 flex-row w-full  gap-1 justify-evenly items-center pb-2">

          {articles.map((article, index) => (
            <li key={index} style={{cursor: "pointer" }} className=" bg-gray-700 rounded-lg p-2 flex flex-row justify-center items-center" onClick={() => setSelectedArticle(article)}>
                <img className="aspect-square w-20 rounded-md" src={url}></img>
              <h2 className="pl-2">{article.title}</h2>
            </li>
          ))}
        </ul>
      )}

{selectedArticle && (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <button
            onClick={() => setSelectedArticle(null)}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back to Articles
          </button>
          <h2 style={{ color: "#000" }}>{selectedArticle.title}</h2>
          <p style={{ color: "#000" }}>{new Date(selectedArticle.pubDate).toLocaleDateString()}</p>
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "gray",
              color:"white",
              overflowX: "auto",
              gap:"15"
            }}
            dangerouslySetInnerHTML={{
              __html: selectedArticle.content.replace(/<img /g, '<img style="display: block; margin: 0 auto;" '),
            }}
          ></div>
          <a
            href={selectedArticle.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#0070f3",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Read more on Medium
          </a>
        </div>
      )}
      <button className="bg-gray-700 p-3 rounded-full">Read all Insights</button>
    </div>
  );
};

export default MediumArticles;
