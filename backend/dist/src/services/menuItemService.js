import { supabase } from "../config/supabaseClient.js";
import ApiError from "../errors/ApiError.js";
export const getAllMenuItems = async (userId, tableName, searchField, pageNo = 1, limit = 5, sortField, sortOrder, searchQuery) => {
    try {
        const offset = (pageNo - 1) * limit;
        // Step 1: Query template_items and join template_sections and templates with user_id filter
        let query = supabase
            .from(tableName)
            .select(`
        item_id,
        title,
        description,
        price,
        section_id,
        template_sections (
          section_id,
          header,
          template_id,
          templates (
            id,
            user_id
          )
        )
      `, { count: 'exact' })
            .eq('template_sections.templates.user_id', userId) // Filter based on user_id of templates table
            .not('template_sections', 'is', null)
            .not('template_sections.templates', 'is', null)
            .range(offset, offset + limit - 1)
            .order(sortField, { ascending: sortOrder === 'asc' });
        if (searchQuery) {
            query = query.ilike(searchField, `%${searchQuery}%`); // ilike() for Case-insensitive search
        }
        const { data, error, count } = await query;
        // Debugging: Check if there's an error or no data
        if (error) {
            console.error("Error fetching menu items: ", error);
            throw new Error(`Failed to fetch data: ${error.message}`);
        }
        // Debugging: Check if we have data or if it's empty
        if (!data || data.length === 0) {
            console.warn("No data found or the data is empty.");
        }
        return {
            data,
            totalItems: count || 0,
            currentPage: pageNo,
            totalPages: Math.ceil((count || 0) / limit),
        };
    }
    catch (error) {
        console.error("Error in fetching data: ", error);
        throw new Error(`Failed to fetch data: ${error}`);
    }
};
export const getMenuItemById = async (id, userId, menuId) => {
    try {
        console.log("Inputs:", { id, userId, menuId });
        if (!id || !userId || !menuId) {
            throw new Error("Invalid input: id, userId, and menuId must all be provided.");
        }
        const { data, error } = await supabase
            .from("templates")
            .select(`
      id,
      name,
      template_sections (
        section_id,
        header,
        template_items (
          item_id,
          title,
          price,
          description
        )
      )
    `)
            .eq("id", menuId) // Match the menu ID
            .eq("user_id", userId); // Match the user ID
        if (error) {
            console.error("Error fetching menu item:", error);
            throw new Error(error.message);
        }
        if (!data || data.length === 0) {
            throw new Error("Menu or sections not found");
        }
        // Find the specific item in the nested sections
        const item = data[0].template_sections
            ?.flatMap((section) => section.template_items)
            ?.find((templateItem) => templateItem.item_id === id);
        if (!item) {
            throw new Error("Item not found in the menu");
        }
        return item;
    }
    catch (error) {
        console.error("Error in getMenuItemById:", error);
        throw new Error(`Failed to fetch the item: ${error}`);
    }
};
export const createMenuItem = async (menuItemData) => {
    try {
        const { data, error } = await supabase
            .from("template_items")
            .insert([
            {
                section_id: menuItemData.section_id,
                title: menuItemData.title,
                price: menuItemData.price,
                description: menuItemData.description,
            },
        ])
            .select("*");
        if (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
        return data;
    }
    catch (error) {
        console.error("Error in createMenuItem:", error);
        throw new Error(`Failed to create menu item: ${error}`);
    }
};
export const updateMenuItem = async (userId, item_id, title, price, description
// image_url: string | File | null;
) => {
    const { data, error } = await supabase
        .from("template_items")
        .select("*")
        .eq("item_id", item_id)
        .single();
    if (error || !data) {
        throw ApiError.notFound("item not found");
    }
    const { data: updatedItem, error: updateError } = await supabase
        .from("template_items")
        .update([
        {
            title: title,
            price: price,
            description: description,
        },
    ])
        .eq("item_id", item_id)
        .select("*");
    if (error)
        throw error;
    return updatedItem;
};
export const deleteMenuItem = async (item_id) => {
    const { error } = await supabase
        .from("template_items")
        .delete()
        .eq("item_id", item_id);
    if (error)
        throw error;
};
