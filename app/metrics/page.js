import React from 'react'

function Page() {
  let src = "https://8a82-212-154-84-117.ngrok-free.app"
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={src}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Embedded Website"
      ></iframe>
    </div>
  );
}

export default Page