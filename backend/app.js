const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const reviewRoutes = require('./routes/review');
const githubRoutes = require('./routes/github');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/review',reviewRoutes);
app.use('/api/github',githubRoutes);

const PORT = process.env.PORT || 5090;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})