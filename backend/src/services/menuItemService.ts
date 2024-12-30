import { NextFunction, Request, Response } from "express";
import { supabase } from "../config/supabaseClient.js";
import ApiError from "../errors/ApiError.js";
import { header } from "express-validator";

export const getAllMenuItems = async (userId: string | undefined) => {
  try {
    const { data, error } = await supabase
      .from("templates")
      .select(
        `id, name, template_sections( section_id,header,template_items(item_id,title,price, description))`
      )
      .eq("user_id", userId);

    if (error) throw error;
    const result = data?.map(template =>({
      templateName: template.name,
      sections: template.template_sections?.map(section =>({
        scetionName: section.header,
        items: section.template_items?.map(item=>({
          itemId: item.item_id,
          itemName: item.title,
          itemDescription: item.description,
          itemPrice: item.price,

        })),
      })),
    }))

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getMenuItemById = async (
  id: string,
  userId: string | undefined,
  menuId : string
) => {
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
    ?.flatMap((section: any) => section.template_items)
    ?.find((templateItem: any) => templateItem.item_id === id);

  if (!item) {
    throw new Error("Item not found in the menu");
  }

  return item;
  } catch (error) {
    console.error("Error in getMenuItemById:", error);
    throw new Error(`Failed to fetch the item: ${error}`);
  }
};

export const createMenuItem = async (menuItemData: {
  templateId:string,
  section_id:string,
  title:string,
  price:number,
  description:string,
  // image_url: string | File | null;
  user_id: string | undefined;
}) => {
  try {
    const { data, error} = await supabase
    .from("template_items")
    .insert([{
      section_id: menuItemData.section_id,
      title: menuItemData.title,
      price: menuItemData.price,
      description: menuItemData.description,
    }])
    .select("*");

    if(error){
      console.log(error.message)
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error in createMenuItem:", error);
    throw new Error(`Failed to create menu item: ${error}`);
  }

};

export const updateMenuItem = async (
  userId: string | undefined,

  item_id:string,
  title:string,
  price:number,
  description:string,
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
    .update([{
      title: title,
      price: price,
      description: description
    }])
    .eq("item_id", item_id)
    .select("*");

  if (error) throw error;

  return updatedItem;
};

export const deleteMenuItem = async (
  item_id: string) => {
  const { error } = await supabase
    .from("template_items")
    .delete()
    .eq("item_id", item_id);

  if (error) throw error;
};
