import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError.js";
import { supabase } from "../../config/supabaseClient.js"; 
import * as categoryService from '../../services/categoryService.js';



export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
        return next(ApiError.internal("Failed to fetch categories"));
    //   res.status(500).json({ message: 'Failed to fetch categories', error });
    }
  };

  export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const category = await categoryService.getCategoryById(id);
      if (category) {
        res.status(200).json(category);
      } else {
        return next(ApiError.notFound("Category not found"))
      }
    } catch (error) {
        return next(ApiError.internal("Failed to fetch category"));
     }
  };

  export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const newCategory = await categoryService.createCategory(name);
      res.status(201).json(newCategory);
    } catch (error) {
        return next(ApiError.internal("Failed to create category"));
    }
  };

  export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await categoryService.deleteCategory(id);
      res.status(204).send();
    } catch (error) {
        return next(ApiError.internal("Failed to delete category"));
    }
  };

  export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params; // string
      const { name } = req.body;
  
      await categoryService.updateCategory(id,name );

      res.status(200).json({ message: `You updated category with id: ${id}` });
    } catch (error) {
      next(error);
    }
  };