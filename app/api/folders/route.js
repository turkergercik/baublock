import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dmsxjpsxd",
    api_key: "662865874342974",
    api_secret: "T_O0qP_NYkMUa-kRhbCwKDAGCO0",
    secure:true,
    sdk_semver: "2.0.0",

});


export async function GET(request) {
    const folders = await cloudinary.api.root_folders();

    
    return NextResponse.json(folders.folders);
}
