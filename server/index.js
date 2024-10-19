import express, { response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();  //Load environment variables from .env file


const app = express();

//Middleware
app.use(express.json());  //Parsing request body
app.use(cors());  //Handling cors policy
app.use('/api/users', userRoutes);  //Routing to get info on  User schema
app.use('/api/admin', adminRoutes); //Routing to get admin info

app.get('/', (req, res) => {
    res.status(234).send("***Welcome to Gadget Horizon ***")
})



//Database connector
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((err) => { console.log(err) });