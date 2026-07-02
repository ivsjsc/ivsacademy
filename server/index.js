'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const celestechRoutes = require('./routes/celestech');
const newsletterRoutes = require('./routes/newsletter');
const contactRoutes = require('./routes/contact');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Celestech API routes
app.use('/api/celestech', celestechRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
