import { supabase } from "../../supabase";

export async function getProducts() {

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    return { data, error };
}

export async function updateProduct(id, updates) {

    const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        

    return { data, error };

}

export async function deleteProduct(id) {

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    return { error };

}