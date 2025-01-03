﻿const express = require('express');
const {connectDB} = require("./config/database");
const path = require("path");

require('dotenv').config();

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', require('./routes/user'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
})