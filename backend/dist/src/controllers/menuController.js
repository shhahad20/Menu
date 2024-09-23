import { connectDB } from "../config/db.js";
import ApiError from "../errors/ApiError.js";
export const getAllMenuTemplates = async (req, res, next) => {
    try {
        connectDB.query('SELECT * FROM menus', (err, menus) => {
            if (err) {
                return next(err);
            }
            if (menus.length === 0) {
                return next(ApiError.notFound("Menus not found"));
            }
            res.status(200).json({
                message: 'Menus retrieved successfully.',
                payload: menus
            });
        });
    }
    catch (error) {
        next(error);
    }
};
export const getMenuByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        if (name) {
            return next(ApiError.badRequest("menu name must be provided!"));
        }
        connectDB.query('SELECT * FROM menus WHERE name = ?', [name], (err, menu) => {
            if (err) {
                return next(err);
            }
            if (menu.length === 0) {
                return next(ApiError.notFound(`Menu with name: ${name} not found.`));
            }
            res.status(200).json({
                message: "Menu retrived successfully.",
                payload: menu,
            });
        });
    }
    catch (error) {
        next(error);
    }
};
export const createMenu = async (req, res, next) => {
    try {
        const { name, num_sections, num_products, description } = req.body;
        // Basic validation for required fields
        if (!name || !num_sections || !num_products || !description) {
            return res
                .status(400)
                .json({ message: "Name, num_sections, num_products, and Description are required." });
        }
        const addPrice = "INSERT INTO menus (name, num_sections, num_products, description) VALUES (?, ?, ? ,?)";
        connectDB.query(addPrice, [name, num_sections, num_products, description], (err, result) => {
            if (err) {
                console.error("Failed to insert data:", err);
                return next(ApiError.internal("Failed to insert data"));
            }
            res.status(201).send("Data inserted successfully");
        });
    }
    catch (error) {
        next(ApiError.badRequest("Bad request."));
    }
};
export const updateMenu = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, num_sections, num_products, description } = req.body;
        connectDB.query("UPDATE menus SET name = ?,price = ? , duration = ? , description = ?  WHERE id = ?", [name, num_sections, num_products, description, id], (err, updatedMenu) => {
            if (err) {
                console.error("Failed to update data:", err);
                return res.status(500).send("Failed to update data");
            }
            if (updatedMenu.affectedRows === 0) {
                return next(ApiError.notFound('Menu template not found'));
            }
            res.status(200).json({ message: `You updated menu with id : ${id}` });
        });
    }
    catch (error) {
    }
};
export const deleteMenu = async (req, res, next) => {
    try {
        const { id } = req.params;
        connectDB.query("DELETE FROM menus WHERE id = ?", [id], (err, deletedMenu) => {
            if (err) {
                console.error("Failed to delete menu data:", err);
                return res.status(500).send("Failed to delete data");
            }
            if (deletedMenu.affectedRows === 0) {
                return next(ApiError.notFound('Menu template not found'));
            }
            res.status(200).json({
                message: `You deleted menu with id = ${id}`,
            });
        });
    }
    catch (error) {
        next(error);
    }
};
