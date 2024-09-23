import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError.js'
import jwt, { JwtPayload } from "jsonwebtoken";
import { dev } from "../config/index.js";
import { CustomRequest } from '../types/types';



export const isLoggenIn = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const accessToken = req.cookies.access_token
        if(!accessToken){
            throw ApiError.unauthorized("Please Login first or Sign up if you don't have an account.");
        }
        const decoded = (await jwt.verify(accessToken, dev.jwt.key)) as jwt.JwtPayload
        if(!decoded){
            throw ApiError.unauthorized("Invaild access token");
        }
        console.log("Decoded JWT Payload:", decoded);

        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        next(error)
    }
}

export const isLoggedOut = async(req: Request, res: Response, next: NextFunction)=>{
    try {
      const accessToken = req.cookies?.access_token;
      if(accessToken){
        throw ApiError.unauthorized("You are already logged in.")
      }
      next();
    } catch (error) {
        next(error)
    }
  }
