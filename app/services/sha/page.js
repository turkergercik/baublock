"use client";

import React, { useState } from 'react';
import crypto from 'crypto';

const Page = () => {
  const sha256Hash = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
  };

  const [hashed, setHashed] = useState(sha256Hash(""));
  
  const update = (data) => {
    let result = sha256Hash(data);
    setHashed(result);
  };

  return (
    <div className=' flex flex-col w-screen h-full justify-center items-center gap-4  bg-gray-800 text-white'>
      {/* Header */}
      <div className='w-full custom:w-1/2  flex flex-col pt-5 px-2 gap-3'>
        <h1 className='text-white text-3xl font-semibold text-center'>SHA-256 ENCODING</h1>
        <input 
          onChange={(e) => update(e.target.value)} 
          className='text-black  px-4 py-2 border-none outline-none rounded-md text-lg focus:ring-2 focus:ring-purple-500' 
          placeholder='Enter text to hash' 
        />
      </div>

      {/* Result Box */}
      <div className='  w-full custom:w-1/2 p-2 flex justify-center items-center'>
        <div className='bg-gray-900 p-4 rounded-lg shadow-md w-full'>
          <span className='text-white bg-gray-800 rounded-md p-2 text-2xl mb-2'>Hashed Output</span>
          <div className='bg-dark-gray text-white p-3 rounded-md text-lg overflow-auto break-words'>
            {hashed || 'The hash will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
