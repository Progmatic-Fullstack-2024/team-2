import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../constants/constants.js";
import extractPublicId from "../utils/extract-public-ids.js";
import HttpError from "../utils/HttpError.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const options = {
  use_filename: true,
  unique_filename: true,
  overwrite: false,
  folder: "performance-images",
};

// Function to upload a single file const
export const uploadSingleFile = async (file) => {
  if (file) {
    try {
      const uploadedImage = await cloudinary.uploader.upload(file.path);
      return uploadedImage.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  }
  return null;
};

// Function to create multiple files
export const createFiles = async (files) => {
  const urls = await Promise.all(files.map((file) => uploadSingleFile(file)));
  return urls;
};

// Function to delete multiple files
export const deleteFiles = async (urls) => {
  const results = await Promise.all(
    urls.map(async (url) => {
      if (url) {
        const publicId = extractPublicId(url);
        const deletedImage = await cloudinary.uploader.destroy(publicId);
        if (deletedImage.result !== "ok") {
          throw new HttpError("Could not delete image", 404);
        }
        return deletedImage;
      }
      return null;
    }),
  );
  return results.filter((result) => result !== null);
};

// Function to update multiple files
export const updateFiles = async (urls, files) => {
  if (files) {
    await deleteFiles(urls);
    const updatedImageUrls = await createFiles(files);
    return updatedImageUrls;
  }
  return urls;
};
