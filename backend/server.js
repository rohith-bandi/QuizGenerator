// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactForm', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define the Contact schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({
        name,
        email,
        phone,
        message
    });

    try {
        await newContact.save();
        res.status(201).send('Contact saved');
    } catch (err) {
        res.status(400).send('Error saving contact');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});