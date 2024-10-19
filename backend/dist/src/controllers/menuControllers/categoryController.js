import ApiError from "../../errors/ApiError.js";
import * as categoryService from '../../services/categoryService.js';
export const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    }
    catch (error) {
        return next(ApiError.internal("Failed to fetch categories"));
        //   res.status(500).json({ message: 'Failed to fetch categories', error });
    }
};
export const getCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const category = await categoryService.getCategoryById(id);
        if (category) {
            res.status(200).json(category);
        }
        else {
            return next(ApiError.notFound("Category not found"));
        }
    }
    catch (error) {
        return next(ApiError.internal("Failed to fetch category"));
    }
};
export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newCategory = await categoryService.createCategory(name);
        res.status(201).json(newCategory);
    }
    catch (error) {
        return next(ApiError.internal("Failed to create category"));
    }
};
export const deleteCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await categoryService.deleteCategory(id);
        res.status(204).send();
    }
    catch (error) {
        return next(ApiError.internal("Failed to delete category"));
    }
};
export const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params; // string
        const { name } = req.body;
        await categoryService.updateCategory(id, name);
        res.status(200).json({ message: `You updated category with id: ${id}` });
    }
    catch (error) {
        next(error);
    }
};
