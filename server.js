const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const soldProductRoutes = require('./routes/soldProductRoutes');
const daybookRoutes = require('./routes/daybookRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');
const dailyInvoiceRoutes = require('./routes/dailyInvoiceRoutes');
const monthlyInvoiceRoutes = require('./routes/monthlyInvoiceRoutes');
const yearlyInvoiceRoutes = require('./routes/yearlyInvoiceRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/receipts', receiptRoutes);
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/sold-products', soldProductRoutes);
app.use('/daybooks', daybookRoutes);
app.use('/ledgers', ledgerRoutes);
app.use('/daily-invoices', dailyInvoiceRoutes);
app.use('/monthly-invoices', monthlyInvoiceRoutes);
app.use('/yearly-invoices', yearlyInvoiceRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
