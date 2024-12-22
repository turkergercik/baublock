import { NextResponse } from 'next/server';
import cloudinary from '../config';

// Configure Cloudinary


export async function GET(request) {
    let coverPhotos = [];
    try {

        // Step 1: Fetch all root folders
        const rootFolders = await cloudinary.api.root_folders();

        // Step 2: Iterate through each folder and look for `coverphoto` subfolder
        const promises = rootFolders.folders.map(async (folder) => {
            const folderPath = `${folder.path}/coverphoto`;

            try {
                // Fetch resources from the `coverphoto` subfolder
                const resources = await cloudinary.api.resources_by_asset_folder(folderPath);

                if (resources.resources.length > 0) {
                    // Extract the first resource's URL (or multiple if needed)
                    let r = {
                        id: resources.resources[0].public_id,
                        type:resources.resources[0].resource_type,
                        originalUrl: resources.resources[0].secure_url, // Original URL
                        folderPath:folder.path,
                        folderName:folder.name,
                        transformedUrl: resources.resources[0].secure_url,
                        iscover:true
                                // Transformed URL      // Custom name
                    };
                    coverPhotos.push(r);
                }
            } catch (err) {
                // Handle errors for folders that may not have a `coverphoto` subfolder
                console.warn(`No coverphoto folder found in ${folder.path}`);
            }
        });

        // Step 3: Wait for all promises to resolve
        await Promise.all(promises);

        // Step 4: Output all cover photos
        console.log('Cover Photos:', coverPhotos);
        return NextResponse.json(coverPhotos);
    } catch (error) {
        console.error('Error fetching cover photos:', error);
    }
    
}
