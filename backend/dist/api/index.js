import express from 'express';
// import mongoose from 'mongoose'
// import mysql from 'mysql'
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import homeRouter from '../src/routers/homeRouter.js';
import userRouter from '../src/routers/userRouter.js';
import authenticationRouter from '../src/routers/authRouter.js';
import pricingRouter from '../src/routers/pricingRouter.js';
import menuRouter from '../src/routers/menuRouter.js';
// import {connectDB} from '../src/config/db.js'
import apiErrorHandler from '../src/middleware/errorHandler.js';
config();
const app = express();
const PORT = 5050;
// connectDB;
// connectDB.connect(error => {
//   if (error) {
//     console.error('Database connection failed:', error.stack);
//     return;
//   } 
//   console.log('Connected to database.');
// }); 
app.use('/public', express.static('public'));
app.use(cookieParser());
// app.use(myLogger)
app.use(morgan('dev'));
app.use(cors({
    // origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/auth', authenticationRouter);
app.use('/pricing', pricingRouter);
app.use('/menus', menuRouter);
// app.use('/menu-tamplate',)
// app.use('/categories', categoriesRouter)
app.use(apiErrorHandler);
app.listen(PORT, async () => {
    console.log('Server running http://localhost:' + PORT);
});
