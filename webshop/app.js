const express = require('express');
const {connectDB} = require("./config/database");
const path = require("path");

require('dotenv').config();

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// маршрути
app.use('/api/users', require('./routes/user'));
app.use('/api/products', require('./routes/product'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/orders', require('./routes/orderDetails'));
app.use('/api/orders', require('./routes/vwOrderDetails'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
})