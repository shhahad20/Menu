import { supabase } from "../config/supabaseClient.js";
import ApiError from "../errors/ApiError.js";
export const getAllMenuItems = async () => {
    const { data, error } = await supabase
        .from('menu_item')
        .select('*, category:categories (name)'); // Join with category
    if (error)
        throw error;
    return data;
};
export const getMenuItemById = async (id) => {
    const { data, error } = await supabase
        .from('menu_item')
        .select('*, category:categories (name)')
        .eq('id', id)
        .single();
    if (error)
        throw error;
    return data;
};
export const createMenuItem = async (menuItemData) => {
    const { data, error } = await supabase
        .from('menu_item')
        .insert([menuItemData])
        .select('*');
    if (error)
        throw error;
    return data;
};
export const updateMenuItem = async (id, menuItemData) => {
    const { data: existingItem, error: selectError } = await supabase
        .from("menu_item")
        .select("*")
        .eq("id", id)
        .single();
    if (selectError || !existingItem) {
        throw ApiError.notFound("item not found");
    }
    const { data, error } = await supabase
        .from("menu_item")
        .update([menuItemData])
        .eq("id", id)
        .select("*");
    if (error)
        throw error;
    return data;
};
export const deleteMenuItem = async (id) => {
    const { error } = await supabase
        .from('menu_item')
        .delete()
        .eq('id', id);
    if (error)
        throw error;
};
