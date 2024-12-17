/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode:true,
images:{
    remotePatterns:[
       { hostname:'res.cloudinary.com'}
    ]
},
experimental:{
    scrollRestoration:false
}

};

export default nextConfig;
