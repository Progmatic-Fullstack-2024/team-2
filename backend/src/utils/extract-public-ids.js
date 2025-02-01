const extractPublicId = (url) => {
  try {
    const urlParts = url.split("/"); // URL szétbontása "/"
    const filenameWithExtension = urlParts.pop(); // Pl.: "nz4am9g7bxn4wygvop6x.jpg"
    const filename = filenameWithExtension.split(".")[0]; // Kiterjesztés levágása

    // Ellenőrizzük, hogy az utolsó előtti elem verziószám-e
    const lastFolderOrVersion = urlParts.pop();
    const isVersionNumber =
      lastFolderOrVersion.startsWith("v") && lastFolderOrVersion.length > 10;

    // Ha verziószám volt, akkor visszalépünk egy szintet
    const folder = isVersionNumber ? urlParts.pop() : lastFolderOrVersion;

    // 🔥 Most már nem szűrjük ki a "performance-images" mappát
    const publicId =
      folder && folder !== "upload" ? `${folder}/${filename}` : filename;

    console.log(
      `✅ Helyesen kinyert publicId törléshez: ${publicId} az URL-ből: ${url}`,
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