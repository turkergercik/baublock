"use client"
import React,{useEffect,useState,useRef} from 'react'

function Page( {router}) {
   const [articles,setarticles] = useState([])
    useEffect(()=>{
        const fun = async()=>{
            try {
                const res = await fetch("/api/medium",{
                  cache:"force-cache"
                })
                const res1 = await res.json()
                console.log(res1)
                if (Array.isArray(res1)) {
                    setarticles(res1);
                    console.log(res1)
                  } else {
                    console.error("Expected array, received:", res1);
                  }
            } catch (error) {
                console.log(error)
            }
        }

        fun()

    },[])


   console.log()

  return (
        <div className="p-6 max-w-4xl mx-auto pt-20">
          <h1 className="text-3xl font-bold mb-6">Insights</h1>
          <ul className="space-y-8">
            {articles.map((article, index) => (
              <li key={index} className="border rounded-lg shadow p-4">
                <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                <div
                  className="custom-content prose"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                ></div>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read Full Article on Medium
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Page