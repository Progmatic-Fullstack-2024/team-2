const extractPublicId = (url) => {
  try {
    if (!url) return null;

    // 1️⃣ URL-dekódolás (Cloudinary ezt várja)
    const decodedUrl = decodeURIComponent(url);

    // 2️⃣ URL szétbontása "/"
    const urlParts = decodedUrl.split("/");
    const filenameWithExtension = urlParts.pop(); // Pl.: "PLAKÁT_MÁTÉ.jpg"
    const filename = filenameWithExtension.split(".")[0]; // Kiterjesztés levágása

    // 3️⃣ Verziószám eltávolítása
    const lastFolderOrVersion = urlParts.pop();
    const isVersionNumber =
      lastFolderOrVersion.startsWith("v") && lastFolderOrVersion.length > 10;

    const folder = isVersionNumber ? urlParts.pop() : lastFolderOrVersion;

    // 🔥 Most már nem szűrjük ki a mappát
    const publicId =
      folder && folder !== "upload" ? `${folder}/${filename}` : filename;

    console.log(
      `✅ Helyesen kinyert publicId törléshez: ${publicId} az URL-ből: ${decodedUrl}`,
    );
    return publicId;
  } catch (error) {
    console.error(
      `❌ Hiba történt a Public ID kinyerésekor az URL-ből: ${url}`,
      error,
    );
    return null;
  }
};

export default extractPublicId;
