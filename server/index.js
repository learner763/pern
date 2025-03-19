import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Catch-all route to serve React's index.html for any other request
app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});