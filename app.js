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
  prescript: {type: String}
});
connectToDatabase().then(() => {
  app.post('/api/data', async (req, res) => {
      const {device_id, prescript} = req.body;
      console.log('Data received from client:', prescript);

      const prescriptUser = mongoose.model('user', prescriptSchema);
      await prescriptUser.findByIdAndUpdate(
          device_id, 
          {prescript}, 
          { upsert: true, new: true }
      );
    
      res.status(200).send({ status: 'saved' });
      /*res.status(200).json({ 
          message: 'Data received successfully!', 
          yourData: receivedData 
      });*/
  });
  
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
