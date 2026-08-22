// /const { createServer } = require('node:http');
import { connectToDatabase } from './database.js';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
const app = express();
const hostname = '0.0.0.0';
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());

const prescriptSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  prescript: {type: String},
  updatedAt: {type: Date}
});

const PrescriptUser = mongoose.model('user', prescriptSchema);

app.post('/api/data', async (req, res) => {
    const {device_id, prescript} = req.body;
    console.log('Data received from client:', device_id, prescript);

    try {
        const user = await PrescriptUser.findByIdAndUpdate(
            device_id.trim(),
            {prescript, updatedAt: new Date()},
            { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
        );
        res.status(200).send({ status: 'saved', device_id: user._id });
    } catch (error) {
        console.error('Failed to save prescript:', error);
        res.status(500).send({ error: 'failed to save' });
    }
});

connectToDatabase()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
