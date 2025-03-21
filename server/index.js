import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from "pg";
const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app's build folder
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

// API route (optional, for backend functionality)
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});
app.use(express.json());
// Catch-all route to serve React's index.html for any other request
app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});
// PostgreSQL Connection
const pool = new pkg.Pool({
    connectionString: 'postgresql://neondb_owner:npg_sw58OFiXJGeC@ep-odd-truth-a5etezja-pooler.us-east-2.aws.neon.tech/neondb?sslmode=requires',
  });
  
  pool.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Connected to PostgreSQL");
  });
// Start the server
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
app.post('/', (req, res) => {
  pool.query("select * from public.b;", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results.rows);
  }); // Close the pool.query callback properly
}); // Close the app.post route handler properly