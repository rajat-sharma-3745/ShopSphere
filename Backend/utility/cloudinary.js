const cloudinary = require('cloudinary').v2;
const fs = require('fs');


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (filePath) => {
   try {
    if(!filePath) return;
      const response = await cloudinary.uploader.upload(filePath,{
        resource_type:'auto'
      })
      console.log("File has been uploaded on cloudinary");
      fs.unlinkSync(filePath);
      return response.secure_url;
   } catch (error) {
      fs.unlinkSync(filePath);
      return null;
   }
}

module.exports = {uploadOnCloudinary}