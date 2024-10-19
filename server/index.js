import express, { response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();  //Load environment variables from .env file


const app = express();

//Middleware
app.use(express.json());  //Parsing request body
app.use(cors());  //Handling cors policy
app.use('/api/users', userRoutes);  //Routing to get info on  User schema
app.use('/api/admin', adminRoutes); //Routing to get admin info
app.use('/api/products', productRoutes); //Routing for products

app.get('/', (req, res) => {
    res.status(234).send("***Welcome to Gadget Horizon ***")
})



//Database connector
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('App connected to database');
    })
    .catch((error) => {
        console.log(error);
    });

// Only start the server if this file is run directly (not imported)
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5555;
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
    });
}

export default app;