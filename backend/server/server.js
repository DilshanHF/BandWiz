const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');

const app = express();
const port = 3001;

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use authentication routes
app.use('/signup', authRoutes);
app.use('/login', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
