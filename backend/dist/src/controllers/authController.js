import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { queryDB } from './userController.js';
import ApiError from '../errors/ApiError.js';
import { dev } from '../config/index.js';
export const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await queryDB('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            throw ApiError.notFound(`User with is email : ${email} does not exist!`);
        }
        const userFound = user[0]; // Assuming the queryDB returns an array
        const machPassword = bcrypt.compareSync(password, userFound.password);
        if (!machPassword) {
            throw ApiError.unauthorized("Wrong password.");
        }
        // if(userFound.isBanned){ // Make sure to add isBanned in the query
        //     throw ApiError.forbidden("User is banned. For more info please contact us.");
        // }
        const userId = user.id;
        const accessToken = jwt.sign({ id: userFound.id, role: userFound.role }, dev.jwt.key, { expiresIn: '24h' });
        res.cookie('access_token', accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).json({
            status: 200,
            message: `Welcome ${userFound.first_name} as ${userFound.role}`,
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        next(error);
    }
};
export const handleLogout = async (req, res, next) => {
    try {
        res.cookie('access_token', '', {
            expires: new Date(0),
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({
            message: `User is logged out.`,
        });
    }
    catch (error) {
        next(error);
    }
};
