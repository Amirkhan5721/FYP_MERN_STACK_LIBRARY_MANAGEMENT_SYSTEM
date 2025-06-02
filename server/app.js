// const express = require("express");
import {config} from "dotenv"
import  Express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./database/db.js";
import { errorMiddlerware } from "./middlewares/errorMiddlewares.js";
import authRouter from './routers/authRouter.js';
import bookRouter from "./routers/bookRouter.js";
import borrowRouter from "./routers/borrowRouter.js";
import userRouter from "./routers/userRouter.js";
import expressFileupload from "express-fileupload"
import { notifyUsers } from "./services/notifyUsers.js";
import {removeUnverifiedAccounts} from "./services/removeUnverifiedAccounts.js"

export const app = Express();

config({ path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL,process.env.NETLIFY_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(cookieParser());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true}))

app.use(expressFileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use('/api/v1/auth', authRouter)
// we used this uri for run backend to goto register page
// http://localhost:4000/api/v1/auth/register 
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/borrow', borrowRouter)
app.use('/api/v1/user', userRouter)

notifyUsers();
removeUnverifiedAccounts();
connectDB();


app.use(errorMiddlerware)