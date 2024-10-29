import express, { response } from "express";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from "mongoose";
import { logger } from "./Middleware/logger.js";
import errorHandler from "./Middleware/errorHandler.js";
import corsOptions from './config/corsOptions.js';

import jwt from 'jsonwebtoken';

import rootRoute from './routes/root.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
import importPhoneRoute from './routes/importPhoneRoute.js';
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();  //Load environment variables from .env file


const app = express();
// Get the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware
app.use(logger);
app.use(express.json());//Parsing request body  
app.use(cors());  //Handling cors policy
// app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, '/public'))); //look inside the public folder and look for static files
app.use('/', rootRoute);
app.use('/api/users', userRoutes);  //Routing to get info on  User schema
app.use('/api/admin', adminRoutes); //Routing to get admin info
app.use('/api/products', productRoutes); //Routing for products
app.use('/api/products', importPhoneRoute); //Routing for phones
app.use('/api/orders', orderRoutes); //Routing for orders


// app.all('*', (req, res) => {
//     res.status(404)
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'))
//     } else if (req.accepts('json')) {
//         res.json({ message: '404 Not Found'});
//     } else {
//         res.type('txt').send('404 Not Found');
//     }
// })
// // Global error handler
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//   });

// app.use(errorHandler);




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
        console.log(`The Link to the API: http://localhost:5555/`);
    });
}

export default app;