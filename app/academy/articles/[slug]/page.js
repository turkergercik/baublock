import React from 'react'
import { createClient } from 'contentful'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


export default async function Page({params}) {
const contenfulspaceid= process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const contenfulaccesstoken =process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  let data = null
   try {
        const res = createClient({
              space:contenfulspaceid,
              accessToken:contenfulaccesstoken
          })
        const res1= await res.getEntry(params.slug)
        console.log(res1)
        data = res1.fields
        //setdata(res1.items)
      } catch (error) {
          console.log(error)
      }
      const options = {
        renderNode: {
          // Customize paragraphs
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className=" text-white  p-3 rounded-lg text-lg my-4">{children}</p>
          ),
          
          // Customize headings
          [BLOCKS.HEADING_1]: (node, children) => (
            <h1 className="text-4xl text-white bg-gray-700 p-3 rounded-lg text-center my-4">{children}</h1>
          ),
          
          [BLOCKS.HEADING_2]: (node, children) => (
            <h2 className="text-4xl font-semibold text-blue-600 text-left my-4">{children}</h2>
          ),
          [BLOCKS.HEADING_3]: (node, children) => (
            <h2 className="text-4xl text-white bg-gray-700 p-3 rounded-lg text-center my-4">{children}</h2>
          ),
          
          // Customize hyperlinks
          [INLINES.HYPERLINK]: (node, children) => (
            <a
              href={node.data.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              {children}
            </a>
          ),
          
          // Customize images
          [BLOCKS.EMBEDDED_ASSET]: (node) => (
            <div className="flex justify-center my-4">
              <img
                src={node.data.target.fields.file.url}
                alt={node.data.target.fields.title}
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
          ),
        },
      };
  return (
    <div className='bg-gray-900 p-10'>
      <div className="px-4 border-2 rounded-xl w-full flex flex-col justify-center items-center">{documentToReactComponents(data.description, options)}</div>
    </div>
  )
}
