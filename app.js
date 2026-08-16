// /const { createServer } = require('node:http');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const hostname = '0.0.0.0';
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(cors()); 

const prescriptSchema = new mongoose.Schema({
  device_id: {type: String, required: true},
  prescript: {type: String}
});

const prescriptData = mongoose.model('SensorData', prescriptSchema);

app.post('/api/data', async (req, res) => {
    const {device_id, prescript} = req.body;
    console.log('Data received from client:', device_id);

    await prescriptData.findByIdAndUpdate(
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
