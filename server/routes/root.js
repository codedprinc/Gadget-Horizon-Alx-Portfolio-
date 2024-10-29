import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
// Get the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
});

router.get('^/api/admin$', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'adminDashboard.html'))
});

router.get('^/api/admin/phones$', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'phoneManagement.html'))
});

router.get('/api/admin/orders', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'orderManagement.html'));
});

router.get('/api/admin/users', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'userDashboard.html'));
});

export default router;