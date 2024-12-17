import { NextResponse } from 'next/server';
import cloudinary from '../config';

// Configure Cloudinary


export async function GET(request) {
    
    const folders = await cloudinary.api.root_folders();

    
    return NextResponse.json(folders.folders);
}
