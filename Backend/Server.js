const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');

    envFile.split(/\r?\n/).forEach((line) => {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith('#')) {
            return;
        }

        const equalsIndex = trimmedLine.indexOf('=');

        if (equalsIndex === -1) {
            return;
        }

        const key = trimmedLine.slice(0, equalsIndex).trim();
        const value = trimmedLine.slice(equalsIndex + 1).trim();

        if (key && process.env[key] === undefined) {
            process.env[key] = value;
        }
    });
}

const db = require('./Confiq/db');
const userRoutes = require('./Routes/UserRoutes');
const productRoutes = require('./Routes/ProductRoutes');
const orderRoutes = require('./Routes/OrderRoutes');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

async function startServer() {
    try {
        await db.authenticate();
        console.log('Database connected successfully');
        await db.sync();
        console.log('Database synchronized successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to start server:', err);
        process.exit(1);
    }
}

startServer();
