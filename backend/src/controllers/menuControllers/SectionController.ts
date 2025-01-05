import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError.js";
import { supabase } from "../../config/supabaseClient.js"; 
import {createMenuSection, deleteMenuSections, getAllMenuSections, getMenuSectionById, updateMenuSections} from "../../services/sectionService.js";


export const getMenuSections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    let pageNo = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search as string | undefined;
    const sortField = (req.query.sortField as string) || "header";
    const sortOrder = req.query.sortOrder as string | "asc" | "desc";

    if (!userId) {
      return next(ApiError.unauthorized("User not authenticated"));
    }
    const result = await getAllMenuSections(userId, 'template_sections', 'header', pageNo,
      limit,
      sortField,
      sortOrder,
      search);
    if (result) {
      res.status(200).json(result);
    } else {
      return next(
        ApiError.notFound(
          "Sections not found, or you do not have permission to access this page."
        )
      );
    }
  } catch (error) {
    return next(ApiError.internal("Failed to fetch menu sections"));
  }
};
export const getMenuSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const id = req.params.id;
    const { sectionId } = req.body;

    const menuSection = await getMenuSectionById(id, userId, sectionId);
    if (menuSection) {
      res.status(200).json(menuSection);
    } else {
      return next(ApiError.notFound("Section not found"));
    }
  } catch (error) {
    return next(ApiError.internal("Failed to fetch menu section " + error));
  }
};
export const createSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { templateId, header,section_order } = req.body;

    // Check if a file is uploaded
    // if (!req.file) {
    //   return res.status(400).json({ error: "Image file is required" });
    // }

    // // Upload the image to Supabase
    // const imageUrl = await uploadImageToSupabase(req.file, userId);
    // if (!imageUrl) {
    //   return res.status(500).json({ error: "Failed to upload image" });
    // }

    const newMenuItem = await createMenuSection({
      templateId,
      header,
      section_order,
      user_id: userId,
    });
    res.status(201).json(newMenuItem);
  } catch (error) {
    console.log(error);
    return next(ApiError.internal("Failed to create item"));
  }
};

export const updateMeunSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { header,section_order, section_id } = req.body;

    // Fetch the existing menu item to get the current image URL
    // const existingMenuItem = await menuItemService.getMenuItemById(
    //   item_id,
    //   userId
    // );
    // if (!existingMenuItem) {
    //   return res.status(404).json({ error: "Menu item not found" });
    // }
    // let imageUrl = existingMenuItem.image_url;
    // If a new file is uploaded, delete the old image and upload the new one
    // if (req.file) {
    //   // Delete the previous image
    //   const deleted = await deleteImageFromSupabase(imageUrl);
    //   if (!deleted) {
    //     console.warn(`Failed to delete old image: ${imageUrl}`);
    //   }

    //   // Upload the new image
    //   imageUrl = await uploadImageToSupabase(req.file, userId);
    //   if (!imageUrl) {
    //     return res
    //       .status(500)
    //       .json({ error: "Failed to upload the new image" });
    //   }
    // }
    await updateMenuSections(userId,section_id, header, section_order);

    res.status(200).json({ message: `You updated section with id: ${section_id}` });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const section_id = req.params.id;
    // const menuItem = await menuItemService.getMenuItemById(id, userId);
    // if (!menuItem) {
    //   return res.status(404).json({ error: "Menu item not found" });
    // }

    // Extract the image URL
    // const { image_url } = menuItem;

    await deleteMenuSections(section_id);

    // if (image_url) {
    //   const isDeleted = await deleteImageFromSupabase(image_url);
    //   if (!isDeleted) {
    //     console.error("Failed to delete image from Supabase storage.");
    //   }
    // }
    res.status(204).json({ message: `You deleted a section with id: ${section_id}` });
  } catch (error) {
    return next(ApiError.internal("Failed to delete menu section"));
  }
};