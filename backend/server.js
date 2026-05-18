require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'YOUR_SUPABASE_PROJECT_URL_HERE') {
    console.error("⚠️ WARNING: Supabase keys are missing in the .env file!");
}

const supabase = createClient(supabaseUrl || 'http://dummy.url', supabaseKey || 'dummy_key');

// Root endpoint to show the API status
app.get('/', (req, res) => {
    res.send("🚀 Sindhuja Finance Rating API is running successfully!");
});

// POST endpoint to submit a rating
app.post('/api/ratings', async (req, res) => {
    try {
        const { name, email, rating, comments } = req.body;
        
        if (!name || !rating) {
            return res.status(400).json({ error: "Name and rating are required." });
        }

        const { data, error } = await supabase
            .from('customer_ratings')
            .insert([{ name, rating, comments }])
            .select();

        if (error) {
            throw error;
        }

        res.status(201).json({ message: "Rating submitted successfully!", data });
    } catch (error) {
        console.error("Error saving rating:", error);
        res.status(500).json({ error: "Failed to save rating." });
    }
});

// GET endpoint to fetch all ratings
app.get('/api/ratings', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('customer_ratings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).json({ error: "Failed to fetch ratings." });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend server running on http://0.0.0.0:${PORT}`);
    console.log(`🔌 Connected to Supabase: ${supabaseUrl ? 'YES' : 'NO'}`);
});

module.exports = app;
