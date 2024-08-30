const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors'); // Correctly require the CORS package
const app = express();
const port = 3000;

// Initialize CORS middleware
app.use(cors({
    origin: 'https://gov-alert.vercel.app/signup.html', // Replace with your frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials:true
  }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// MongoDB URI and database name
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@govt-alert-cluster.z57vv.mongodb.net/`;
const client = new MongoClient(uri);

// POST endpoint to add participant data
app.post('/addParticipant', async (req, res) => {
    const { name, email, educationLevel, pins } = req.body;
    try {
        await client.connect();
        const database = client.db('your-database-name'); // Replace with your actual database name
        const collection = database.collection('participants'); // Replace with your actual collection name
        const result = await collection.insertOne({ name, email, educationLevel, pins });
        console.log(result);
        res.status(200).send('Participant added successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
