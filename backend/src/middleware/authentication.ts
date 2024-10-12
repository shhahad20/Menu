import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError.js'
import jwt, { JwtPayload } from "jsonwebtoken";
import { dev } from "../config/index.js";
import { CustomRequest } from '../types/types';


export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            throw ApiError.unauthorized("Please login first or sign up if you don't have an account.");
        }

        const decoded = (await jwt.verify(accessToken, dev.jwt.key)) as JwtPayload;
        if (!decoded) {
            throw ApiError.unauthorized("Invalid access token.");
        }

        console.log("Decoded JWT Payload:", decoded);

        // Attach user information to the request object
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        next(error);
    }
};

export const isLoggedOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies?.access_token;
        if (accessToken) {
            throw ApiError.unauthorized("You are already logged in.");
        }
        next();
    } catch (error) {
        next(error);
    }
};