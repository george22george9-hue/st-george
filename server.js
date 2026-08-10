const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { initDB } = require('./db/database');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'ST_GEORGE_SECRET_KEY_123'; // In production, move to .env

app.use(cors());
app.use(express.json());

let db;

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

// Start Server and Initialize DB
initDB().then(database => {
    db = database;
    
    // --- API ROUTES ---

    // Login
    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '24h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
        }
    });

    // Get all Pages
    app.get('/api/pages', async (req, res) => {
        const pages = await db.all('SELECT * FROM pages');
        res.json(pages);
    });

    // Get Single Page
    app.get('/api/pages/:id', async (req, res) => {
        const page = await db.get('SELECT * FROM pages WHERE id = ?', [req.params.id]);
        if (page) res.json(page);
        else res.status(404).json({ error: 'Page not found' });
    });

    // Update Page (Admin Only)
    app.post('/api/pages/:id', authenticateToken, async (req, res) => {
        const { title, content } = req.body;
        await db.run('UPDATE pages SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [title, content, req.params.id]);
        res.json({ success: true });
    });

    // Get all Services grouped by category
    app.get('/api/services', async (req, res) => {
        const services = await db.all('SELECT * FROM services');
        const grouped = {};
        services.forEach(s => {
            if (!grouped[s.category]) grouped[s.category] = { title: s.category, items: [] };
            grouped[s.category].items.push({ id: s.id, name: s.name, icon: s.icon });
        });
        res.json(Object.values(grouped));
    });

    // Get Single Service Details
    app.get('/api/services/:id', async (req, res) => {
        const service = await db.get('SELECT * FROM services WHERE id = ?', [req.params.id]);
        if (service) res.json(service);
        else res.status(404).json({ error: 'Service not found' });
    });

    // Update Service (Admin Only)
    app.post('/api/services/:id', authenticateToken, async (req, res) => {
        const { name, icon, content } = req.body;
        await db.run('UPDATE services SET name = ?, icon = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, icon, content, req.params.id]);
        res.json({ success: true });
    });

    // --- STATIC FILES & SPA ROUTING ---
    app.use(express.static(path.join(__dirname)));

    app.get('/admin', (req, res) => {
        res.sendFile(path.join(__dirname, 'admin.html'));
    });

    // Catch-all for SPA
    app.use((req, res, next) => {
        if (req.method === 'GET' && !req.path.startsWith('/api')) {
            res.sendFile(path.join(__dirname, 'index.html'));
        } else {
            next();
        }
    });

    app.listen(PORT, () => {
        console.log(`Express Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to start server:", err);
});
