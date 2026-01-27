import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
