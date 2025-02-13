import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../constants/constants.js";
import extractPublicId from "../utils/extract-public-ids.js";
// import HttpError from "../utils/HttpError.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const optionsTheaterImg = {
  use_filename: true,
  unique_filename: true,
  overwrite: false,
  folder: "theater-images",
};

// const optionsPerformanceImg = {
//   use_filename: true,
//   unique_filename: true,
//   overwrite: false,
//   folder: "performance-images",
// };

// Function to upload a single file const
export const uploadSingleFile = async (file) => {
  if (file) {
    try {
      const uploadedImage = await cloudinary.uploader.upload(
        file.path,
        optionsTheaterImg,
      );
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
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    console.warn(
      "⚠️ deleteFiles hívása sikertelen: az URL lista üres vagy nem megfelelő.",
    );
    return [];
  }

  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        if (!url) {
          console.warn("⚠️ Egyik URL értéke üres, nem töröljük.");
          return null;
        }

        const publicId = extractPublicId(url);
        console.log(`🔍 Extracted Public ID: ${publicId} from URL: ${url}`);
        if (!publicId) {
          console.warn(
            `⚠️ Nem sikerült kinyerni a publicId-t az URL-ből: ${url}`,
          );
          return null;
        }

        try {
          const deletedImage = await cloudinary.uploader.destroy(publicId);
          console.log(
            `🛠 Cloudinary törlési válasza (${publicId}):`,
            deletedImage,
          );
          if (deletedImage.result !== "ok") {
            console.warn(`⚠️ Cloudinary nem találta a képet: ${publicId}`);
            return null;
          }
          return deletedImage;
        } catch (cloudinaryError) {
          console.error(
            `❌ Cloudinary hiba történt a kép törlésekor (${publicId}):`,
            cloudinaryError,
          );
          return null;
        }
      }),
    );

    return results.filter((result) => result !== null);
  } catch (error) {
    console.error("❌ Hiba történt a deleteFiles() futtatásakor:", error);
    return [];
  }
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
