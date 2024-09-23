import { NextFunction, query, Request, Response } from "express";
import { connectDB } from "../config/db.js";
import ApiError from "../errors/ApiError.js";

export const getPricing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    connectDB.query("SELECT * FROM pricing", (err, results) => {
      if (err) {
        return next(err); // Handle any SQL error
      }
      if (results.length === 0) {
        return next(ApiError.notFound("Pricing not found"));
      }
      res.status(200).json({
        message: "Pricing",
        payload: results,
      });
    });
  } catch (error) {
    next(error)
  }
};
export const getPricingById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const {id, name} = req.params;
        if(!id && !name){
            return next(ApiError.badRequest("ID or Name must be provided!"));
        }
        let query = "SELECT * FROM pricing WHERE";
        const queryParams:(string| number)[]=[];
        if(id){
            query += " id = ? ";
            queryParams.push(id);
        }
        if(name){
            if(id) query += "OR ";
            query += "name = ? ";
            queryParams.push(name)
        }

      connectDB.query(query,queryParams ,(err, results) => {
        if (err) {
          return next(err); // Handle any SQL error
        }
        if (results.length === 0) {
          return next(ApiError.notFound("Pricing not found"));
        }
        res.status(200).json({
          message: "Pricing retrived successfully.",
          payload: results,
        });
      });
    } catch (error) {
        next(error)
    }
  };

export const createPricing = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const { name, price, duration, description } = req.body;
            // Basic validation for required fields
    if (!name || !price || !duration || !description) {
        return res
          .status(400)
          .json({ message: "Name, Price, Duration, and Description are required." });
      }
      const addPrice = "INSERT INTO pricing (name, price, duration, description) VALUES (?, ?, ? ,?)";
      connectDB.query(addPrice, [name, price, duration, description], (err, result) => {
        if (err) {
          console.error("Failed to insert data:", err);
          return next(ApiError.internal("Failed to insert data"));
        }
        res.status(201).send("Data inserted successfully");
      });


    } catch (error) {
        next(ApiError.badRequest("Bad request."))   
    }
}

export const updatePricing = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const { name, price, duration, description } = req.body;
        connectDB.query(
            "UPDATE pricing SET name = ?,price = ? , duration = ? , description = ?  WHERE id = ?",
            [name,price, duration, description, id],
            (err, updatePricing) => {
              if (err) {
                console.error("Failed to update data:", err);
                return res.status(500).send("Failed to update data");
              }
              res.status(200).json({ message: `You updated pricing with id : ${id}` });
            }
          );
    } catch (error) {
    }
};

export const deletePricing = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        connectDB.query(
          "DELETE FROM pricing WHERE id = ?",
          [id],
          (err, deletedPricing) => {
            if (err) {
              console.error("Failed to delete pricing data:", err);
              return res.status(500).send("Failed to delete data");
            }
            res.status(200).json({
              message: `You deleted pricing with id = ${id}`,
            });
          }
        );
    } catch (error) {
        next(error)
    }
};