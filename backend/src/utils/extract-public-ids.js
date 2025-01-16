const extractPublicId = (url) => {
  const urlParts = url.split("/");
  const lastPart = urlParts.slice(-2).join("/");
  const publicId = lastPart.split(".")[0];
  return publicId;
};

export default extractPublicId;
