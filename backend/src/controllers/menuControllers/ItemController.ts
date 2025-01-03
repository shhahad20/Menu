import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError.js";
import { supabase } from "../../config/supabaseClient.js";
import * as menuItemService from "../../services/menuItemService.js";
import {
  deleteImageFromSupabase,
  uploadImageToSupabase,
} from "../../helper/supabaseUploadFile.js";

export const getMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const menuItems = await menuItemService.getAllMenuItems(userId);
    if (menuItems) {
      res.status(200).json(menuItems);
    } else {
      return next(
        ApiError.notFound(
          "Items not found, or you do not have permission to access this page."
        )
      );
    }
  } catch (error) {
    return next(ApiError.internal("Failed to fetch menu items"));
  }
};

export const getMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const id = Number(req.params.id);
    const menuItem = await menuItemService.getMenuItemById(id, userId);
    if (menuItem) {
      res.status(200).json(menuItem);
    } else {
      return next(ApiError.notFound("Item not found"));
    }
  } catch (error) {
    return next(ApiError.internal("Failed to fetch menu item"));
  }
};

export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const {
      name,
      description,
      calories,
      price,
      category_id,
      is_popular,
      is_new,
    } = req.body;

    const parsedPrice = parseFloat(price);
    const parsedCalories = parseFloat(calories);
    if (isNaN(parsedPrice) || isNaN(parsedCalories)) {
      return res
        .status(400)
        .json({ error: "Price and calories must be numbers" });
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
      calories: parsedCalories,
      price: parsedPrice,
      is_popular,
      is_new,
      category_id,
      image_url: imageUrl,
      user_id: userId,
    });
    res.status(201).json(newMenuItem);
  } catch (error) {
    console.log(error);
    return next(ApiError.internal("Failed to create menu item"));
  }
};

export const updateMeuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params; // string
    const {
      name,
      description,
      calories,
      price,
      category_id,
      is_popular,
      is_new,
    } = req.body;

    // Fetch the existing menu item to get the current image URL
    const existingMenuItem = await menuItemService.getMenuItemById(
      Number(id),
      userId
    );
    if (!existingMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    let imageUrl = existingMenuItem.image_url;
    // If a new file is uploaded, delete the old image and upload the new one
    if (req.file) {
      // Delete the previous image
      const deleted = await deleteImageFromSupabase(imageUrl);
      if (!deleted) {
        console.warn(`Failed to delete old image: ${imageUrl}`);
      }

      // Upload the new image
      imageUrl = await uploadImageToSupabase(req.file, userId);
      if (!imageUrl) {
        return res
          .status(500)
          .json({ error: "Failed to upload the new image" });
      }
    }
    await menuItemService.updateMenuItem(id, userId, {
      name,
      description,
      calories: parseFloat(calories),
      price: parseFloat(price),
      is_popular,
      is_new,
      category_id,
      image_url: imageUrl,
    });

    res.status(200).json({ message: `You updated item with id: ${id}` });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const id = Number(req.params.id);
    const menuItem = await menuItemService.getMenuItemById(id, userId);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    // Extract the image URL
    const { image_url } = menuItem;

    await menuItemService.deleteMenuItem(id, userId);
    
    if (image_url) {
      const isDeleted = await deleteImageFromSupabase(image_url);
      if (!isDeleted) {
        console.error("Failed to delete image from Supabase storage.");
      }
    }
    res.status(204).send();
  } catch (error) {
    return next(ApiError.internal("Failed to delete menu item"));
  }
};
