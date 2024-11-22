import { supabase } from "../config/supabaseClient.js";
import ApiError from "../errors/ApiError.js";
export const getAllMenuItems = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("menu_item")
            .select("*, category:categories (name)")
            .eq("user_id", userId);
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error(error);
    }
};
export const getMenuItemById = async (id, userId) => {
    const { data, error } = await supabase
        .from("menu_item")
        .select("*, category:categories (name)")
        .eq("id", id)
        .eq("user_id", userId)
        .single();
    if (error)
        throw error;
    return data;
};
export const createMenuItem = async (menuItemData) => {
    const { data, error } = await supabase
        .from("menu_item")
        .insert([menuItemData])
        .select("*");
    if (error)
        throw error;
    return data;
};
export const updateMenuItem = async (id, userId, menuItemData) => {
    const { data: existingItem, error: selectError } = await supabase
        .from("menu_item")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
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
export const deleteMenuItem = async (id, userId) => {
    const { error } = await supabase
        .from("menu_item")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
    if (error)
        throw error;
};
