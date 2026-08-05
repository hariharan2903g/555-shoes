export function validateProduct(product) {

  if (!product.product_name.trim()) {
    return "Product Name is required.";
  }

  if (!product.department) {
    return "Please select a Department.";
  }

  if (!product.category) {
    return "Please select a Category.";
  }

  if (!product.brand) {
    return "Please select a Brand.";
  }

  if (!product.gender) {
    return "Please select a Gender.";
  }

  if (!product.material) {
    return "Please select a Material.";
  }

  if (!product.description.trim()) {
    return "Description is required.";
  }

  if (!product.selling_price) {
    return "Selling Price is required.";
  }

  if (product.colors.length === 0) {
    return "Add at least one color.";
  }

  for (const color of product.colors) {

    if (!color.color.trim()) {
      return "Every color must have a name.";
    }

    if (color.images.length === 0) {
      return `Add at least one image for ${color.color || "a color"}.`;
    }

    const coverExists = color.images.some(
      (image) => image.id === color.coverImageId
    );
    
    if (!coverExists) {
      return `Please select a cover image for ${color.color || "a color"}.`;
    }
  }

  return null;
}