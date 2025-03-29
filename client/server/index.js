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
const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath));

// Configure CORS


// Handle preflight requests

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
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    pool.query("INSERT INTO public.\"Users\" (\"Email\",\"Password\") VALUES ($1, $2)", [email,password], (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: "Data inserted successfully" });
      });
      
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
