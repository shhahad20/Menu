import { supabase } from "../config/supabaseClient.js"; // Import the Supabase client
export const uploadImageToSupabase = async (file, userId) => {
    const fileName = `${userId}/${userId}_${file.originalname}`; // Generate a unique file name
    //       // Create a folder path based on the user's ID
    //   const folderPath = `${userId}/`; // Use user's ID as folder name
    //   // Construct the full file path
    //   const filePath = folderPath + fileName; 
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
        .from("menu_images") // Bucket name
        .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
    });
    if (error) {
        console.error("Image upload failed:", error);
        return null;
    }
    // Generate the public URL for the uploaded file
    const { publicUrl } = supabase.storage
        .from("menu_images")
        .getPublicUrl(fileName).data;
    return publicUrl || null;
};
