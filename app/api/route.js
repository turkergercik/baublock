import { NextResponse } from 'next/server';
import cloudinary from './config';

// Configure Cloudinary

export const dynamic = 'force-dynamic';

export async function GET(request) {
    let response = [];
    let res
    
    try {
        const { searchParams } = new URL(request.url);
        const foldername = searchParams.get('foldername')
        /* const headers = request.headers.get('foldername');

        const foldername = decodeURIComponent(headers);
        console.log(headers */

        const result = await cloudinary.api.resources_by_asset_folder(foldername, {
            max_results: 100,
        });
        res = result.resources.map((item, index) => {
            let transformedUrl=null
            if(item.resource_type==="image"){
                 transformedUrl = cloudinary.url(item.public_id, {
                    resource_type:"image",
                    transformation: [
                        { width: 750, height: 750,crop:"limit"}, // Resize transformation
                        
                        { quality: "auto" },                      // Adjust quality automatically
                                                  // Add rounded corners
                    ],
                    format:"jpg", // Choose format based on type
                });
            }else{
                 transformedUrl = cloudinary.url(item.public_id, {
                    resource_type:"video",
                    transformation: [
                        { width: 1000, height: 750}, // Resize transformation
                        { quality: "auto" },                      // Adjust quality automatically
                                              // Add rounded corners
                    ],
                    format:"mp4", // Choose format based on type
                });
                console.log(transformedUrl)
            }
            
            

            return {
                id: item.public_id,
                type:item.resource_type,
                originalUrl: item.secure_url, // Original URL
                transformedUrl,              // Transformed URL      // Custom name
            };
        });

        // Get all root folders
        /* const folders = await cloudinary.api.root_folders(); */

       

        // Use a `for...of` loop to handle async operations
        /* for (const folder of folders.folders) {
            // Fetch resources for the folder
            const result = await cloudinary.api.resources_by_asset_folder(folder.path, {
                max_results: 100,
            });

            // Transform the resources
            const res = result.resources.map((item, index) => {
                let transformedUrl=null
                if(item.resource_type==="image"){
                     transformedUrl = cloudinary.url(item.public_id, {
                        resource_type:"image",
                        transformation: [
                            { width: 500, height: 500, crop: "fill" }, // Resize transformation
                            { quality: "auto" },                      // Adjust quality automatically
                                                      // Add rounded corners
                        ],
                        format:"png", // Choose format based on type
                    });
                }else{
                     transformedUrl = cloudinary.url(item.public_id, {
                        resource_type:"video",
                        transformation: [
                            { width: 750, height: 750, crop: "fill" }, // Resize transformation
                            { quality: "auto" },                      // Adjust quality automatically
                                                  // Add rounded corners
                        ],
                        format:"mp4", // Choose format based on type
                    });
                    console.log(transformedUrl)
                }
                
                

                return {
                    id: item.public_id,
                    type:item.resource_type,
                    originalUrl: item.secure_url, // Original URL
                    transformedUrl,              // Transformed URL      // Custom name
                };
            });

            // Add folder and its resources to the response
            response.push({
                folder: folder.name,
                data: res,
            });
        } */

    
    } catch (error) {
        console.error('Error fetching resources:', error);
    }

    return NextResponse.json(res);
}
