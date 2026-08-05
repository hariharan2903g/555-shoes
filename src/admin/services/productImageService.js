import { uploadImages, deleteImages } from "./imageService";

export async function prepareProductImages(colors) {
  const updatedColors = [];

  for (const color of colors) {
    const localFiles = color.images.map((image) => image.file);

    const uploadedImages = await uploadImages(localFiles);

    const images = uploadedImages.map((uploaded, index) => ({
      id: color.images[index].id,
      url: uploaded.url,
    }));

    updatedColors.push({
      ...color,
      images,
    });
  }

  return {
    updatedColors,
    uploadedImages: updatedColors.flatMap((color) => color.images),
  };
}