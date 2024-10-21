// Import necessary modules
import fs from 'fs';
import csv from 'csv-parser';
import { Phone } from "../models/phoneModel.js";
import router from './productRoutes.js';

// Route for importing CSV data into MongoDB
router.post('/phones/import-phones', async (req, res) => {
    try {
        const savePromises = [];

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

                // Push each save operation into the promise array
                savePromises.push(
                    phone.save().then(() => {
                        console.log(`Imported: ${phone.brand} ${phone.model}`);
                    }).catch((error) => {
                        console.error(`Error importing ${row.brand} ${row.model}:`, error);
                    })
                );
            })
            .on('end', async () => {
                // Wait for all save operations to finish
                await Promise.all(savePromises);
                console.log('CSV file successfully processed');
                return res.status(200).json({ message: 'Phones imported successfully' });
            })
            .on('error', (err) => {
                console.error('Error reading CSV file', err);
                res.status(500).json({ message: 'Error processing CSV file' });
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;