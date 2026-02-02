import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import config from '../config';

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// Debug: Check if environment variables are loaded
console.log('Cloudinary Config Debug:');
console.log('CLOUD_NAME:', config.CLOUDINARY_CLOUD_NAME);
console.log('API_KEY:', config.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET');
console.log('API_SECRET:', config.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET');

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'phixels-uploads',
    resource_type: 'auto', // Auto-detect resource type (image, video, raw/pdf)
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx'], // Allow images and documents
  } as any,
});

export const upload = multer({ storage: storage });
