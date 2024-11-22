import { NextFunction, Request, Response } from "express";
import { supabase } from "../config/supabaseClient.js";
import ApiError from "../errors/ApiError.js";

export const getAllMenuItems = async (userId: string | undefined) => {
  try {
    const { data, error } = await supabase
      .from("menu_item")
      .select("*, category:categories (name)")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMenuItemById = async (
  id: number,
  userId: string | undefined
) => {
  const { data, error } = await supabase
    .from("menu_item")
    .select("*, category:categories (name)")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};

export const createMenuItem = async (menuItemData: {
  name: string;
  description: string;
  calories: number;
  price: number;
  category_id: number;
  is_popular: boolean;
  is_new: boolean;
  image_url: string | File | null;
  user_id: string | undefined;
}) => {
  const { data, error } = await supabase
    .from("menu_item")
    .insert([menuItemData])
    .select("*");

  if (error) throw error;
  return data;
};

export const updateMenuItem = async (
  id: string,
  userId: string | undefined,
  menuItemData: {
    name: string;
    description: string;
    calories: number;
    price: number;
    category_id: number;
    is_popular: boolean;
    is_new: boolean;
    image_url: string | File | null;
  }
) => {
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

  if (error) throw error;

  return data;
};

export const deleteMenuItem = async (
  id: number,
  userId: string | undefined
) => {
  const { error } = await supabase
    .from("menu_item")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
};
