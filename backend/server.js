import express from 'express';
import connectDB from './config/db.js';
import dotenv  from 'dotenv';
import { notFound, errorHandler } from './midleware/errorMidleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running")
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, console.log(`Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`));
