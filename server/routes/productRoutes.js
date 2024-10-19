import express from "express";
import { Phone } from "../models/phoneModel.js";


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

// Product searh functionality
router.get('/products/search', async (req, res) => {
    try {
      const { name, brand, category, minPrice, maxPrice } = req.query;
      
      let query = {};
  
      if (name) {
        query.name = { $regex: name, $options: 'i' };
      }
  
      if (brand) {
        query.brand = { $regex: brand, $options: 'i' };
      }
  
      if (category) {
        query.category = { $regex: category, $options: 'i' };
      }
  
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
  
      const products = await Product.find(query);
      res.send(products);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while searching for products.' });
    }
  });
  

//Route for deleting a phone
router.delete('/phones/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Phone.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Phone not found' });
        }
        return res.status(200).send(result, { message: 'Phone deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//Create a new phone
router.post('/products', async (req, res) => {
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