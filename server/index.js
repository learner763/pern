import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import cors from 'cors';

const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app's build folder
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

// Configure CORS
app.use(cors({
    origin: 'https://react-express-gamma.vercel.app', // Allow only frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
}));

// Handle preflight requests
app.options('*', cors());

// Middleware to parse JSON
app.use(express.json());

// API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Catch-all route to serve React's index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// PostgreSQL Connection
const pool = new pkg.Pool({
    connectionString: 'postgresql://neondb_owner:npg_sw58OFiXJGeC@ep-odd-truth-a5etezja-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
});

pool.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to PostgreSQL');
});

// POST route for /api/data
app.post('/data', (req, res) => {
    console.log('Received POST request to /data');
    res.json({ message: 'POST request received' });
    /*
    pool.query('SELECT * FROM public.b;', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results.rows);
    });
    */
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
