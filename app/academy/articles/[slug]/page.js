import React from 'react';
import { createClient } from 'contentful';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default async function Page({ params }) {
  let { slug } = params;
  const contenfulspaceid = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const contenfulaccesstoken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  let data = null;

  try {
    const res = createClient({
      space: contenfulspaceid,
      accessToken: contenfulaccesstoken,
    });
    const res1 = await res.getEntry(slug);
    console.log(res1);
    data = res1.fields;
  } catch (error) {
    console.log(error);
  }

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="text-white p-3 rounded-lg text-lg my-4">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl text-white bg-gray-700 p-3 rounded-lg text-center my-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-2xl font-thin text-white text-left my-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h2 className="text-2xl font-thin text-white text-left my-4">{children}</h2>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h2 className="text-2xl font-thin text-white text-left my-4">{children}</h2>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal pl-6 space-y-2 text-white">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
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
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <div className="flex justify-center my-4">
          <img
            src={node.data.target.fields.file.url}
            alt={node.data.target.fields.title}
            className="rounded-lg shadow-lg object-contain min-w-full"
          />
        </div>
      ), [BLOCKS.QUOTE]: (node,children) => (
        <blockquote className="border-l-4  border-gray-400 pl-4 italic my-4">
         {children}
        </blockquote>
      ),
      [BLOCKS.TABLE]: (node) => (
        <div className="overflow-x-auto my-4">
          <table className="table-auto border-collapse border-2 rounded-2xl border-gray-300 w-full">
            <tbody className=''>
              {node.content.map((row, rowIndex) => (
                <tr className={`${rowIndex===0 ? "bg-[#7a1fc5]" : ""} `} key={rowIndex}>
                  {row.content.map((cell, cellIndex) => {
                    const isHeader = cell.nodeType === BLOCKS.TABLE_HEADER_CELL;
                    const CellTag = isHeader ? 'th' : 'td';
      
                    return (
                      <CellTag
                        key={cellIndex}
                        className={` border border-gray-300 p-2 text-left`}
                      >
                        {documentToReactComponents(
                          {
                            nodeType: 'document',
                            content: cell.content,
                          },
                          
                        )}
                      </CellTag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      
    },
  };

  // Split the rich text content into sections by <hr> elements
  const splitContentByHR = (richText) => {
    const sections = [];
    let currentSection = [];

    richText.content.forEach((node) => {
      if (node.nodeType === BLOCKS.HR) {
        if (currentSection.length > 0) {
          sections.push([...currentSection]);
          currentSection = [];
        }
      } else {
        currentSection.push(node);
      }
    });

    if (currentSection.length > 0) {
      sections.push([...currentSection]);
    }

    return sections;
  };

  const sections = splitContentByHR(data.text);

  return (
    <div className=" flex min-h-screen flex-col items-center pt-24 p-10 gap-5">
      <div className="text-3xl text-white">{data.title}</div>
      <div className="px-4 w-1/2 flex flex-col justify-center items-center">
        {sections.map((section, index) => (
          <div key={index} className="section mb-6 border-2 rounded-xl px-4 w-full">
            {documentToReactComponents({ content: section }, options)}
          </div>
        ))}
      </div>
    </div>
  );
}
