// server/routes/cartRoutes.js
import express from "express";
import authenticateToken from "../Middleware/authenticateToken.js";

import { Cart } from "../models/cartModel.js";


const router = express.Router();
router.get('/', authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
                        .populate('items.phone');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { phoneId, quantity, price } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ phone: phoneId, quantity, price }],
        totalPrice: quantity * price
      });
    } else {
      const existingItem = cart.items.find(
        item => item.phone.toString() === phoneId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ phone: phoneId, quantity, price });
      }
      
      cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await cart.save();
    }
    
    await cart.populate('items.phone');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;