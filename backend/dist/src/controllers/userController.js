import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../errors/ApiError.js";
// import {
//   findUserAndDelete,
//   findUserById,
//   getUsers,
//   isExist,
//   updateBanStatusById,
//   updateRoleStatusById,
// } from "../services/userServices.js";
import generateToken from "../util/generateToken.js";
import { connectDB } from "../config/db.js";
import { emailSender } from "../helper/sendEmail.js";
import { forgetPasswordEmail } from "../helper/emails.js";
// import { forgetPasswordEmail, registeringEmail } from '../helper/emails'
// import {
//   deleteFromCloudinary,
//   uploadToCloudinary,
//   valueWithoutExtension,
// } from '../helper/cloudinaryHelper'
import { dev } from "../config/index.js";
import { supabase } from "../config/supabaseClient.js";
// import { console } from "inspector";
const DEFAULT_IMAGES_PATH = "public/images/usersImages/default/usrImage.png";
// A function to wrap the MySQL query with a Promise
export const queryDB = (query, params) => {
    return new Promise((resolve, reject) => {
        connectDB.query(query, params, (err, result) => {
            if (err) {
                reject(err); // Reject if there is an error
            }
            else {
                resolve(result); // Resolve with the result
            }
        });
    });
};
export const getAllUsers = async (req, res, next) => {
    try {
        const { data, error } = await supabase.from('users').select('*');
        if (error)
            return next(error);
        if (!data || data.length === 0)
            return next(ApiError.notFound("Users not found"));
        res.status(200).json({ message: "All users are here", payload: data });
    }
    catch (error) {
        next(error);
    }
    // try {
    //   connectDB.query("SELECT * FROM users", (err, results) => {
    //     if (err) {
    //       return next(err); // Handle any SQL error
    //     }
    //     // Check if users are found
    //     if (results.length === 0) {
    //       return next(ApiError.notFound("Users not found"));
    //     }
    //     // Send the user data as JSON
    //     res.status(200).json({
    //       message: "All users are here",
    //       payload: results, // Just the rows, no circular structure
    //     });
    //   });
    // } catch (error) {
    //   next(error); // Catch and handle other errors
    // }
};
export const addUser = async (req, res, next) => {
    try {
        const { name, age, email } = req.body;
        if (!name || !age || !email)
            return res.status(400).json({ message: "Name, age, and email are required" });
        const { error } = await supabase.from('users').insert([{ name, age, email }]);
        if (error)
            return res.status(500).send("Failed to insert data");
        res.status(201).send("Data inserted successfully");
    }
    catch (error) {
        next(error);
    }
    // try {
    //   const { name, age, email } = req.body;
    //   // Basic validation for required fields
    //   if (!name || !age || !email) {
    //     return res
    //       .status(400)
    //       .json({ message: "Name, age, and email are required" });
    //   }
    //   const addQuery = "INSERT INTO users (name, age, email) VALUES (?, ?, ?)";
    //   connectDB.query(addQuery, [name, age, email], (err, result) => {
    //     if (err) {
    //       console.error("Failed to insert data:", err);
    //       return res.status(500).send("Failed to insert data");
    //     }
    //     res.status(201).send("Data inserted successfully");
    //   });
    // } catch (error) {}
};
export const getSingleUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        connectDB.query("SELECT name, email FROM users WHERE id = ?", [userId], (err, user) => {
            if (err) {
                return next(err);
            }
            if (user.length === 0) {
                return next(ApiError.notFound(`User with id = {$userId} not found`));
            }
            res.status(200).json({ message: "Get user by id", payload: user[0] });
        });
    }
    catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            const error = new ApiError(400, `Not vaild id`);
            next(error);
        }
        else {
            next(error);
        }
    }
};
export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { name } = req.body;
        connectDB.query("UPDATE users SET name = ? WHERE id = ?", [name, userId], (err, updateUser) => {
            if (err) {
                console.error("Failed to update data:", err);
                return res.status(500).send("Failed to update data");
            }
            res.status(200).json({ message: "Update user by id" });
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        connectDB.query("DELETE FROM users WHERE id = ?", [userId], (err, deletedUser) => {
            if (err) {
                console.error("Failed to delete user data:", err);
                return res.status(500).send("Failed to delete data");
            }
            res.status(200).json({
                message: `You deleted a user`,
            });
        });
    }
    catch (error) {
        next(error);
    }
};
export const registerUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, address, phone, age, country, city } = req.body;
        if (!password)
            return res.status(400).json({ message: "Password is required" });
        const { data: userExists, error: existError } = await supabase.from('users').select('email').eq('email', email);
        if (existError || userExists?.length > 0) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const tokenPayload = { first_name, last_name, email, password: hashedPassword, phone, address, age, country, city };
        const token = jwt.sign(tokenPayload, dev.jwt.reset_k, { expiresIn: '1h' });
        // Send email logic here...
        res.status(200).json({
            message: "Verification email sent. Please check your email to complete registration.",
            token,
        });
    }
    catch (error) {
        next(error);
    }
    // try {
    //   const {
    //     first_name,
    //     last_name,
    //     email,
    //     password,
    //     address,
    //     phone,
    //     age,
    //     country,
    //     city,
    //   } = req.body;
    //   // Check if password is provided
    //   if (!password) {
    //     return res.status(400).json({ message: "Password is required" });
    //   }
    //   // Check if the user already exists by email
    //   const isExist = await queryDB("SELECT email FROM users WHERE email = ?", [
    //     email,
    //   ]);
    //   if (isExist.length > 0) {
    //     return res
    //       .status(400)
    //       .json({
    //         message:
    //           "A user with this email already exists. Please use a different email.",
    //       });
    //   }
    //   // Generate salt and hash password
    //   const saltRounds = 10;
    //   const salt = bcrypt.genSaltSync(saltRounds);
    //   const hashedPassword = bcrypt.hashSync(password, salt);
    //   const tokenPayloadObject = {
    //     first_name,
    //     last_name,
    //     email,
    //     password: hashedPassword,
    //     phone,
    //     address,
    //     age,
    //     country,
    //     city,
    //   };
    //   // Generate token for email verification
    //   // Create a JWT token for email verification
    //   const token = jwt.sign(
    //     tokenPayloadObject,
    //     dev.jwt.reset_k,
    //     { expiresIn: "1h" } // Token expires in 1 hour
    //   );
    //   const emailResult = await sendRegistrationEmail(
    //     email,
    //     first_name,
    //     last_name,
    //     token
    //   );
    //   if (!emailResult.success) {
    //     return res
    //       .status(500)
    //       .json({ message: emailResult.message, error: emailResult.error });
    //   }
    //   res.status(200).json({
    //     message:
    //       "Verification email sent. Please check your email to complete registration.",
    //     token: emailResult.token,
    //     payload: token,
    //   });
    // } catch (error: any) {
    //   console.log("Error occurred: ", error.message);
    //   // Handle specific duplicate entry error from the database if necessary
    //   if (error.code === "ER_DUP_ENTRY") {
    //     return res.status(400).json({ message: "Email is already registered." });
    //   }
    //   next(error);
    // }
};
export const activateUser = async (req, res, next) => {
    try {
        // const { token } = req.params; // Token from URL
        const { token } = req.body;
        // const token = String(req.params.token)
        if (!token) {
            next(ApiError.notFound("Please provide a valid token"));
            return;
        }
        // Verify the token
        jwt.verify(token, dev.jwt.reset_k, async (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);
                return res
                    .status(400)
                    .json({ message: err.message || "Invalid or expired token" });
            }
            // Assert the type of decoded payload
            if (typeof decoded === "string") {
                return res.status(400).json({ message: "Invalid token payload" });
            }
            const payloadUser = decoded;
            // Extract user data from decoded token
            const { first_name, last_name, email, password, phone, address, age, country, city, } = payloadUser;
            // Check if user already exists
            const isExist = await queryDB("SELECT * FROM users WHERE email = ?", [
                email,
            ]);
            if (isExist.length > 0) {
                return res
                    .status(400)
                    .json({ message: "User already registered with this email" });
            }
            // Insert user into the main users table
            const insertUser = `
        INSERT INTO users (first_name, last_name, email, password, phone, address, age, country, city)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            await queryDB(insertUser, [
                first_name,
                last_name,
                email,
                password,
                phone,
                address,
                age,
                country,
                city,
            ]);
            res
                .status(200)
                .json({ message: "User successfully verified and registered" });
        });
    }
    catch (error) {
        console.error("Error in activation:", error.message || error);
        next(error);
    }
};
export const forgetPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        connectDB.query("SELECT * FROM users WHERE email = ?", [email], (err, foundUser) => {
            if (err) {
                console.error("Error while querying user data:", err);
                return next(ApiError.internal("Server error while finding user"));
            }
            // if user does not exist
            if (foundUser.length === 0) {
                return next(ApiError.notFound(`${email} does not exist`));
            }
            // Generate the token
            const token = generateToken({ email }, dev.jwt.reset_k, "60m");
            const user = foundUser[0];
            const emailToSend = forgetPasswordEmail(email, user.first_name, user.last_name, token);
            try {
                emailSender(emailToSend); // Sending the email
                res.status(200).json({
                    message: "Email sent successfully, please check your inbox",
                    payload: token, // Token for reference
                });
            }
            catch (emailError) {
                console.error("Failed to send email:", emailError);
                return next(ApiError.internal("Error while sending email"));
            }
        });
    }
    catch (error) {
        next(error);
    }
};
export const resetPassword = async (req, res, next) => {
    try {
        const { token, password, confirmPassword, email } = req.body;
        if (!token) {
            next(ApiError.notFound("Plesae provide a vaild token"));
            return;
        }
        if (password !== confirmPassword) {
            throw ApiError.unauthorized("Passwords does not match");
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        console.log("Hashed Password:", hashedPassword);
        jwt.verify(token, dev.jwt.reset_k, async (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);
                return res
                    .status(400)
                    .json({ message: err.message || "Invalid or expired token" });
            }
            // Assert the type of decoded payload
            if (typeof decoded === "string") {
                return res.status(400).json({ message: "Invalid token payload" });
            }
            jwt.verify(token, dev.jwt.reset_k, async (err, decoded) => {
                if (err) {
                    console.log("Token verification error:", err);
                    return next(ApiError.unauthorized("Invalid or expired token"));
                }
            });
            connectDB.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email], (err) => {
                if (err) {
                    console.error("Failed to reset password:", err);
                    return res.status(500).send("Failed to reset password");
                }
                res.status(200).json({ message: "Password reseted successuflly" });
            });
        });
    }
    catch (error) {
        next(error);
    }
};
export const changeRole = async (req, res, next) => {
    const { userId } = req.params;
    const newRole = req.body.role;
    const vaildRoles = ["User", "Admin", "superAdmin"];
    if (!vaildRoles.includes(newRole)) {
        return next(ApiError.badRequest("Invaild role type."));
    }
    try {
        const result = await queryDB("UPDATE users SET role = ? WHERE id = ?", [
            newRole,
            userId,
        ]);
        if (result.affectedRows === 0) {
            return next(ApiError.badRequest("User not found or role not updated."));
        }
        res.status(200).json({ message: "User role updated successfully." });
    }
    catch (error) {
        next(ApiError.internal("Failed to update user role."));
    }
};
// export const banUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = req.params.userId
//     const user = await updateBanStatusById(id, true)
//     res.status(200).json({
//       message: `You banned a user with ID: ${id}`,
//     })
//   } catch (error) {
//     if (error instanceof mongoose.Error.CastError) {
//       const error = new ApiError(400, `Not vaild id`)
//       next(error)
//     } else {
//       next(error)
//     }
//   }
// }
// export const unbanUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = req.params.userId
//     const user = await updateBanStatusById(id, false)
//     res.status(200).json({
//       message: `You unbanned a user with ID: ${id}`,
//     })
//   } catch (error) {
//     if (error instanceof mongoose.Error.CastError) {
//       const error = new ApiError(400, `Not vaild id`)
//       next(error)
//     } else {
//       next(error)
//     }
//   }
// }
// export const adminUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = req.params.userId
//     const user = await updateRoleStatusById(id, true)
//     res.status(200).json({
//       message: `You make the role of user with ID: ${id} is Admin`,
//     })
//   } catch (error) {
//     if (error instanceof mongoose.Error.CastError) {
//       const error = new ApiError(400, `Not vaild id`)
//       next(error)
//     } else {
//       next(error)
//     }
//   }
// }
// export const unadminUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = req.params.userId
//     const user = await updateRoleStatusById(id, false)
//     res.status(200).json({
//       message: `You make the role of user with ID: ${id} is not Admin`,
//     })
//   } catch (error) {
//     if (error instanceof mongoose.Error.CastError) {
//       const error = new ApiError(400, `Not vaild id`)
//       next(error)
//     } else {
//       next(error)
//     }
//   }
// }
