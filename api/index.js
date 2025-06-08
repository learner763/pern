import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import cors from 'cors';

const app = express();
app.use(cors(
    {
        origin: ['https://react-express-ten.vercel.app/'],
        methods: ['GET', 'POST'],
        credentials: true
    }
))
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
app.get('/accounts', (req, res) => {
    pool.query('SELECT email,name,bio,password,bg FROM public.users', (err, results) => {
        if (err) {}
        else res.json(results.rows);
    });
});

// Catch-all route to serve React's index.html
app.get('*', (req, res) => {
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
    const { email, password,bt } = req.body;
    

    if(bt=="Log In")    
        pool.query("select * from public.users where email=$1 and password=$2", [email,password], (err, results) => {
            if (err) {}
            else res.json(results.rows);
            
        });

    else if(bt=="Sign Up")
        pool.query("select * from public.users where email=$1", [email], (err, results) => {
            if (err) {}
            console.log(results.rows);
            if(results.rows.length>0){res.json({success:false});}
            else{
                pool.query("insert into public.users(email,password) values($1,$2)", [email,password], (err, results) => {
                    if (err) {
                        return res.status(500).send('Database error');
                    }
                    else res.json({success:true});
                });
            }
        });

      
});

app.post("/personal", (req, res) => {
    const { username, name,bio } = req.body;
    pool.query("update public.users set name=$1,bio=$2 where email=$3", [name,bio,username], (err, results) => {   
        if (err) {console.log(4)}
        else res.json({success:true}); 
    });
});
app.post("/save_info", (req, res) => {
    const { previous,username, name,bio } = req.body;
    pool.query("select * from public.users where email=$1", [username], (err, results) => {
        if (err) {}
        console.log(results.rows);
        if(results.rows.length>0)
        {
            res.status(409).json({
                success: false,
                message: "Username already exists!"
            });
        }
        else{
            pool.query("update public.users set name=$1,bio=$2,email=$3 where email=$4", [name,bio,username,previous], (err, results) => {   
                if (err) {console.log(4)}
                else res.json({success:true}); 
            });
        }
    });
});
app.post("/save_settings", (req, res) => {
    const { username,password, bg } = req.body;
    

    pool.query("update public.users set password=$1,bg=$2 where email=$3", [password,bg,username], (err, results) => {   
        if (err) {console.log(4)}
        else res.json({success:true}); 
    });
});
app.post("/forpass", (req, res) => {
    const { email } = req.body;
    console.log(email);

    pool.query("select * from public.users where email=$1", [email], (err, results) => {
        if (err) {}
        else res.json(results.rows);
    });
});
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
