import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/studentRoute.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

// Middleware for routes
app.use('/api', route);

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected Successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Connection error:', error);
    });
