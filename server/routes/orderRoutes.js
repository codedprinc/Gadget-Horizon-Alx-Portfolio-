import express from 'express';
import { Order } from '../models/orderModel.js';
import { Phone } from '../models/phoneModel.js';
import { User } from '../models/userModel.js';
import authenticateAdminToken from "../Middleware/authenticateAdminToken.js";
import authenticateToken from "../Middleware/authenticateToken.js";


const router = express.Router();

// Create a new order
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { items, shippingAddress, paymentInfo } = req.body;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Order must include at least one item'
            });
        }

        // Process order items
        const orderItems = [];
        let totalPrice = 0;

        for (const item of items) {
            const phone = await Phone.findById(item.phoneId);
            if (!phone) {
                return res.status(404).json({
                    success: false,
                    message: `Phone with ID ${item.phoneId} not found`
                });
            }

            if (!phone.inStock) {
                return res.status(400).json({
                    success: false,
                    message: `${phone.model} is out of stock`
                });
            }

            const itemPrice = phone.price * item.quantity;
            totalPrice += itemPrice;

            orderItems.push({
                phone: phone._id,
                quantity: item.quantity,
                price: phone.price
            });
        }

        // Create order
        const order = new Order({
            user: req.user._id,
            items: orderItems,
            totalPrice: totalPrice,
            status: 'pending',
            shippingAddress: shippingAddress,
            paymentInfo: paymentInfo
        });

        await order.save();

        // Update phone inventory (you might want to add actual inventory tracking)
        for (const item of items) {
            await Phone.findByIdAndUpdate(item.phoneId, {
                $set: { inStock: true }
            });
        }

        const user = await User.findById(req.user._id).select('-password');
        res.status(201).json({
            success: true,
            data: order,
            user: user
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
});


// Get order history for authenticated user
router.get('/history', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.phone', 'brand model price images') // Only select necessary fields
            .sort({ createdAt: -1 }); // Most recent first

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order history',
            error: error.message
        });
    }
});

// Get user's orders (authenticated users)
router.get('/my-orders', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.phone')
            .sort('-createdAt');

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

// Get all orders (admin only)
router.get('/all', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'email firstName lastName')
            .populate('items.phone')
            .sort('-createdAt');

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

// Get specific order details
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.orderId,
            user: req.user._id
        }).populate('items.phone');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });

    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order details',
            error: error.message
        });
    }
});

// Update order status (admin only)
router.patch('/:orderId/status', authenticateAdminToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admins can update order status'
            });
        }

        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
});


// // Update order status (admin only)
// router.patch('/:orderId/status', authenticateToken, async (req, res) => {
//     try {
//         const { status } = req.body;
//         const order = await Order.findByIdAndUpdate(
//             req.params.orderId,
//             { status },
//             { new: true }
//         );

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }

//         res.json({
//             success: true,
//             data: order
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error updating order status',
//             error: error.message
//         });
//     }
// });


export default router;