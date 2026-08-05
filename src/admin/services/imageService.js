import { supabase } from "../../supabase";

export async function uploadImages(files) {
  const uploadedImages = [];

  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      continue;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    uploadedImages.push({
      id: crypto.randomUUID(),
      url: data.publicUrl,
    });
  }

  return uploadedImages;
}

export async function deleteImage(url) {
  const fileName = url.split("/").pop();

  const { error } = await supabase.storage
    .from("product-images")
    .remove([fileName]);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

export async function deleteImages(images) {
  for (const image of images) {
    await deleteImage(image.url);
  }
}