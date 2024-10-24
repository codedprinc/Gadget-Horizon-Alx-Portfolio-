// import fs from 'fs';

// import csv from 'csv-parser';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { Phone } from "../models/phoneModel.js";

// dotenv.config();
// // Adjust path as needed

// const processCSV = () => {
//     fs.createReadStream('phones.csv')
//         .pipe(csv())
//         .on('data', async (row) => {
//             try {
//                 const phone = new Phone({
//                     brand: row.brand,
//                     series: row.series,
//                     model: row.model,
//                     releaseYear: parseInt(row.releaseYear),
//                     specs: {
//                         display: {
//                             size: parseFloat(row.displaySize),
//                             resolution: row.resolution,
//                             type: row.displayType
//                         },
//                         camera: {
//                             main: row.mainCamera,
//                             selfie: row.selfieCamera
//                         },
//                         processor: row.processor,
//                         ram: row.ram,
//                         storage: row.storage,
//                         battery: row.battery
//                     },
//                     price: parseFloat(row.price),
//                     inStock: row.inStock === 'true',
//                     images: row.images.split(',')
//                 });

//                 await phone.save();
//                 console.log(`Imported: ${phone.brand} ${phone.model}`);
//             } catch (error) {
//                 console.error(`Error importing ${row.brand} ${row.model}:`, error);
//             }
//         })
//         .on('end', () => {
//             console.log('CSV file successfully processed');
//         });
// }

// mongoose
//     .connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log('App connected to database');
//         processCSV(); //Start processing CSV
//         //mongoose.disconnect(); 
//     })
//     .catch((err) => { console.log(err) });

import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Phone } from "../models/phoneModel.js";

dotenv.config();

const processCSV = async () => {
    const savePromises = []; // Array to hold all save promises

    return new Promise((resolve, reject) => {
        fs.createReadStream('phones.csv')
            .pipe(csv())
            .on('data', (row) => {
                const phone = new Phone({
                    brand: row.brand,
                    series: row.series,
                    model: row.model,
                    releaseYear: parseInt(row.releaseYear),
                    specs: {
                        display: {
                            size: parseFloat(row.displaySize),
                            resolution: row.resolution,
                            type: row.displayType
                        },
                        camera: {
                            main: row.mainCamera,
                            selfie: row.selfieCamera
                        },
                        processor: row.processor,
                        ram: row.ram,
                        storage: row.storage,
                        battery: row.battery
                    },
                    price: parseFloat(row.price),
                    inStock: row.inStock === 'true',
                    images: row.images.split(',')
                });

                // Push save promises into the array
                savePromises.push(
                    phone.save().then(() => {
                        console.log(`Imported: ${phone.brand} ${phone.model}`);
                    }).catch((error) => {
                        console.error(`Error importing ${row.brand} ${row.model}:`, error);
                    })
                );
            })
            .on('end', () => {
                // Once CSV reading is done, resolve the promise
                resolve(Promise.all(savePromises));
                console.log('CSV file successfully processed');
            })
            .on('error', reject); // Handle stream errors
    });
};

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log('App connected to database');
        await processCSV(); // Wait for CSV processing to complete
        mongoose.disconnect(); // Disconnect after all data is imported
        console.log('Database disconnected');
    })
    .catch((err) => {
        console.log(err);
    });

