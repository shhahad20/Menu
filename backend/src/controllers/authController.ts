import { NextFunction, Request, Response } from 'express'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { queryDB } from './userController.js';
import ApiError from '../errors/ApiError.js';
import { dev } from '../config/index.js';
import { supabase } from '../config/supabaseClient.js';


export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Fetch user from Supabase
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single(); 

        if (error || !user) {
            throw ApiError.notFound(`User with email: ${email} does not exist!`);
        }

        const matchPassword = bcrypt.compareSync(password, user.password);
        if (!matchPassword) {
            throw ApiError.unauthorized('Wrong password.');
        }

        const accessToken = jwt.sign({ id: user.user_id, role: user.role }, dev.jwt.key, { expiresIn: '24h' });
        res.cookie('access_token', accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(200).json({
            status: 200,
            message: `Welcome ${user.first_name} as ${user.role}`,
        });
    } catch (error) {
        console.error('Login Error:', error);
        next(error);
    }
};

export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie('access_token', '', {
            expires: new Date(0),
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(200).json({
            message: 'User is logged out.',
        });
    } catch (error) {
        next(error);
    }
};