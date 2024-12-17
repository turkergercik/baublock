import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET ,
    secure:process.env.CLOUDINARY_SECURE,
    sdk_semver: process.env.CLOUDINARY_SDK_SEMVER,

});
export default cloudinary;