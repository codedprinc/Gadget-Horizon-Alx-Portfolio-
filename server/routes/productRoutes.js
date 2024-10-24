import express from "express";
import { Phone } from "../models/phoneModel.js";
import authenticateAdminToken from "../Middleware/authenticateAdminToken.js";

const router = express.Router();


// Get all phones
router.get('/phones', authenticateAdminToken, async (req, res) => {
    try {
        const phones = await Phone.find();
        if (!phones) {
            return res.status(404).json({ message: "No phones available" });
        }
        res.json(phones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific phone by ID
router.get('/phones/:id', async (req, res) => {
    try {
        const product = await Phone.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Phone is unavailable" });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send();
    }
});

// Phone search functionality
router.get('/phones/search', async (req, res) => {
    try {
        console.log('Entering search route');
        console.log('Search query:', req.query);
        const { model, brand, series, minPrice, maxPrice } = req.query;

        let query = {};

        // Use 'model' instead of 'name'
        if (model) {
            query.model = { $regex: model, $options: 'i' };
        }

        // Search by brand
        if (brand) {
            query.brand = { $regex: brand, $options: 'i' };
        }

        // Search by series (if applicable)
        if (series) {
            query.series = { $regex: series, $options: 'i' };
        }

        // Search by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        console.log('Constructed query:', query);
        // Execute the search query
        const phones = await Phone.find(query);
        console.log('Search results:', phones);
        res.status(200).json(phones);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'An error occurred while searching for phones.', details: error.message });
    }
});



//Route for deleting a phone
router.delete('/phones/:id', async (req, res) => {
    try {
        const result = await Phone.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Phone not found' });
        }
        return res.status(200).json({ message: 'Phone deleted successfully', result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//Route for deleting all phones
router.delete('/phones', async (req, res) => {
    try {
        const result = await Phone.deleteMany({});

        if (!result) {
            return res.status(404).json({ message: 'Phones not found' });
        }
        return res.status(200).json({ message: 'Phone deleted successfully', result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//Create a new phone
router.post('/phone', async (req, res) => {
    try {
        const product = new Phone(req.body);
        await product.save();
        res.status(201).send(product, { message: 'Phone made successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// // Update a product (admin only)
// router.patch('/products/:id', auth, adminAuth, async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['name', 'description', 'price', 'brand', 'category', 'imageURL'];
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//     if (!isValidOperation) {
//       return res.status(400).send({ error: 'Invalid updates!' });
//     }

//     try {
//       const product = await Product.findById(req.params.id);
//       if (!product) {
//         return res.status(404).send();
//       }

//       updates.forEach((update) => product[update] = req.body[update]);
//       await product.save();
//       res.send(product);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   });
export default router;