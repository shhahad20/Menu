import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError.js";
import { supabase } from "../../config/supabaseClient.js"; 
import * as menuItemService from '../../services/menuItemService.js';
import { uploadImageToSupabase } from "../../helper/supabaseUploadFile.js";

export const getMenuItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menuItems = await menuItemService.getAllMenuItems();
    res.status(200).json(menuItems);
  } catch (error) {
    return next(ApiError.internal("Failed to fetch menu items"));  }
};

export const getMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id); 
    const menuItem = await menuItemService.getMenuItemById(id);
    if (menuItem) {
      res.status(200).json(menuItem);
    } else {
        return next(ApiError.notFound("Item not found"))
   }
  } catch (error) {
    return next(ApiError.internal("Failed to fetch menu item"));  
  }
};

export const createMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { name, description, calories, price, category_id, is_popular, is_new } = req.body;

    const parsedPrice = parseFloat(price);
    const parsedCalories = parseFloat(calories);
    if (isNaN(parsedPrice) || isNaN(parsedCalories)) {
      return res.status(400).json({ error: 'Price and calories must be numbers' });
    }
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Upload the image to Supabase
    const imageUrl = await uploadImageToSupabase(req.file, userId);
    if (!imageUrl) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    const newMenuItem = await menuItemService.createMenuItem({
      name,
      description,
      calories :parsedCalories,
      price :parsedPrice,
      is_popular,
      is_new,
      category_id,
      image_url: imageUrl,
    });
    res.status(201).json(newMenuItem);
  } catch (error) {
    return next(ApiError.internal("Failed to create menu item"));  
  }
};

export const updateMeuItem= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params; // string
      const { name, description, calories, price, category_id, is_popular, is_new } = req.body;  
      await menuItemService.updateMenuItem(id, {name,
        description,
        calories,
        price,
        is_popular,
        is_new,
        category_id,
      });

      res.status(200).json({ message: `You updated item with id: ${id}` });
    } catch (error) {
      next(error);
    }
  };

export const deleteMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await menuItemService.deleteMenuItem(id);
    res.status(204).send();
  } catch (error) {
    return next(ApiError.internal("Failed to delete menu item"));  
  }
};
