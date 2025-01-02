import ApiError from "../../errors/ApiError.js";
import * as menuItemService from "../../services/menuItemService.js";
export const getMenuItems = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        let pageNo = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const search = req.query.search;
        const sortField = req.query.sortField || "title";
        const sortOrder = req.query.sortOrder;
        if (!userId) {
            return next(ApiError.unauthorized("User not authenticated"));
        }
        const result = await menuItemService.getAllMenuItems(userId, 'template_items', 'title', pageNo, limit, sortField, sortOrder, search);
        if (result) {
            res.status(200).json(result);
        }
        else {
            return next(ApiError.notFound("Items not found, or you do not have permission to access this page."));
        }
    }
    catch (error) {
        return next(ApiError.internal("Failed to fetch menu items"));
    }
};
export const getMenuItem = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const id = req.params.id;
        const { menuId } = req.body;
        const menuItem = await menuItemService.getMenuItemById(id, userId, menuId);
        if (menuItem) {
            res.status(200).json(menuItem);
        }
        else {
            return next(ApiError.notFound("Item not found"));
        }
    }
    catch (error) {
        return next(ApiError.internal("Failed to fetch menu item" + error));
    }
};
export const createMenuItem = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { templateId, section_id, title, price, description } = req.body;
        // Check if a file is uploaded
        // if (!req.file) {
        //   return res.status(400).json({ error: "Image file is required" });
        // }
        // // Upload the image to Supabase
        // const imageUrl = await uploadImageToSupabase(req.file, userId);
        // if (!imageUrl) {
        //   return res.status(500).json({ error: "Failed to upload image" });
        // }
        const newMenuItem = await menuItemService.createMenuItem({
            templateId,
            section_id,
            title,
            price,
            description,
            user_id: userId,
        });
        res.status(201).json(newMenuItem);
    }
    catch (error) {
        console.log(error);
        return next(ApiError.internal("Failed to create item"));
    }
};
export const updateMeuItem = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { item_id, title, price, description } = req.body;
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
        await menuItemService.updateMenuItem(userId, item_id, title, price, description);
        res.status(200).json({ message: `You updated item with id: ${item_id}` });
    }
    catch (error) {
        next(error);
    }
};
export const deleteMenuItem = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const item_id = req.params.id;
        // const menuItem = await menuItemService.getMenuItemById(id, userId);
        // if (!menuItem) {
        //   return res.status(404).json({ error: "Menu item not found" });
        // }
        // Extract the image URL
        // const { image_url } = menuItem;
        await menuItemService.deleteMenuItem(item_id);
        // if (image_url) {
        //   const isDeleted = await deleteImageFromSupabase(image_url);
        //   if (!isDeleted) {
        //     console.error("Failed to delete image from Supabase storage.");
        //   }
        // }
        res.status(204).json({ message: `You deleted an item with id: ${item_id}` });
    }
    catch (error) {
        return next(ApiError.internal("Failed to delete menu item"));
    }
};
