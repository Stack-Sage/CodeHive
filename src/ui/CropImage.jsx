// utils/cropImage.js
export const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        600,
        500
      );

      canvas.toBlob((blob) => {
        if (!blob) return reject("Canvas is empty");
        blob.name = "cropped.jpeg";
        resolve(blob);
      }, "image/jpeg");
    };
    image.onerror = reject;
  });
};
