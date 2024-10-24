import express from "express";
import { Phone } from "../models/phoneModel.js";
import authenticateAdminToken from "../Middleware/authenticateAdminToken.js";

const router = express.Router();


// Get all phones
router.get('/phones', async (req, res) => {
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

// Phone search functionality
router.get('/phones/search', async (req, res) => {
    try {
        console.log('Entering search route');
        console.log('Search query:', req.query);
        const { model, brand, series, minPrice, maxPrice } = req.query;

        let query = {};

        // Build search query with null checks and trimming
        if (model?.trim()) {
            query.model = { $regex: model.trim(), $options: 'i' };
        }

        if (brand?.trim()) {
            query.brand = { $regex: brand.trim(), $options: 'i' };
        }

        if (series?.trim()) {
            query.series = { $regex: series.trim(), $options: 'i' };
        }

        // Handle price range with validation
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice && !isNaN(minPrice)) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice && !isNaN(maxPrice)) {
                query.price.$lte = Number(maxPrice);
            }
        }

        console.log('Constructed query:', query);

        // Execute search with timeout and limit
        const phones = await Phone.find(query)
            .limit(50)  // Limit results for performance
            .lean()     // Convert to plain JavaScript objects
            .exec();    // Execute the query

        console.log(`Found ${phones.length} results`);

        if (phones.length === 0) {
            return res.status(200).json({ message: 'No phones found matching the criteria', data: [] });
        }

        res.status(200).json({
            message: 'Phones found successfully',
            count: phones.length,
            data: phones
        });

    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({
            error: 'An error occurred while searching for phones.',
            details: error.message
        });
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
router.delete('/phones', authenticateAdminToken, async (req, res) => {
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

// Update a product (admin only)
router.patch('/products/:id', authenticateAdminToken, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'brand', 'category', 'imageURL'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send();
      }

      updates.forEach((update) => product[update] = req.body[update]);
      await product.save();
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  });
export default router;