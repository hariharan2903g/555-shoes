import { uploadImages } from "./imageService";

export async function prepareProductImages(colors) {

  const updatedColors = [];
  const newlyUploadedImages = [];

  for (const color of colors) {

    const existingImages = color.images.filter(
      (image) => image.url && !image.file
    );

    const newImages = color.images.filter(
      (image) => image.file
    );

    let uploadedImages = [];

    if (newImages.length > 0) {

      uploadedImages = await uploadImages(
        newImages.map((image) => image.file)
      );

    }

    const uploadedWithOriginalIds =
      uploadedImages.map((uploaded, index) => ({
        id: newImages[index].id,
        url: uploaded.url,
      }));

    const images = [
      ...existingImages,
      ...uploadedWithOriginalIds,
    ];

    const updatedColor = {
      ...color,
      images,
    };

    updatedColors.push(updatedColor);

    newlyUploadedImages.push(
      ...uploadedWithOriginalIds
    );
  }

  return {
    updatedColors,
    uploadedImages: newlyUploadedImages,
  };
}