import { supabase } from "../../supabase";

export async function addProduct(product) {

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        product_name: product.product_name,
        brand: product.brand,
        department: product.department,
        category: product.category,
        gender: product.gender,

        occasion: product.occasion,
        material: product.material,
        features: product.features,

        description: product.description,

        original_price: Number(product.original_price),
        selling_price: Number(product.selling_price),

        featured: product.featured,
        is_active: product.is_active,

        colors: product.colors,

        specifications: product.specifications,
      },
    ])
    .select();



  return { data, error };
}

export async function getProductById(id) {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return {
    data,
    error
  };
}

export async function updateProduct(id, product) {

  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  return {
    data,
    error
  };
}