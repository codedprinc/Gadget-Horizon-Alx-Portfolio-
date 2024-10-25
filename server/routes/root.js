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

export default router;