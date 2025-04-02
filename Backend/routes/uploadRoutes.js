const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const router = express.Router();

require('dotenv').config();

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// Multer is a middleware for handling file uploads , primarily used for multipart/form-data , it allows us to work with file
// Multer setup using memory storage(In memory storage , file is stored as buffer in memory(directly in RAM))
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// upload.single('image') is used to upload a single file with field name: image and the file is stored in req.file
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Function to handle stream upload to cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                // upload_stream , it creates a stream based upload to cloudinary that means file is uploaded in small parts
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    }
                    else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(fileBuffer).pipe(stream);  //req.file.buffer contains the uploaded file as buffer, bcoz multer stores it in memory ,streamifier converts the uploaded file(buffer) in to readable stream and then it takes the readable stream and pipes(send) it to cloudinary upload_stream, that means it streams the data in chunks to cloudinary,  Reads a small part from file -> send it to cloudinary -> repeat until done
            })
        }
        // call the function
        const result = await streamUpload(req.file?.buffer);
        // Respond with the uploaded image url
        res.json({imageUrl : result.secure_url})

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

module.exports= router;

