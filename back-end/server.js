require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // instead of body-parser in modern express

// Routes
//const exampleRoutes = require('./routes/exampleRoutes');
const authRoutes = require('./routes/authRoutes');

//app.use('/api/examples', exampleRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
