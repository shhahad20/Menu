import { supabase } from "../config/supabaseClient.js";
import ApiError from "../errors/ApiError.js";
export const getAllCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error)
        throw error;
    return data;
};
export const getCategoryById = async (id) => {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();
    if (error)
        throw error;
    return data;
};
export const createCategory = async (name) => {
    const { data, error } = await supabase.from("categories").insert([{ name }]).select('*');
    if (error)
        throw error;
    return data;
};
export const deleteCategory = async (id) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error)
        throw error;
};
export const updateCategory = async (id, name) => {
    const { data: existingCategory, error: selectError } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();
    if (selectError || !existingCategory) {
        throw ApiError.notFound("Category not found");
    }
    const { data, error } = await supabase
        .from("categories")
        .update({ name })
        .eq("id", id)
        .select("*");
    if (error)
        throw error;
    return data;
};
