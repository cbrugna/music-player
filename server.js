require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = process.env.MONGODB_URI;
console.log('MONGODB_URI:', uri); // Debug log to check the value of MONGODB_URI

app.use(express.static('public'));
app.use(express.json());

app.get('/api/tracks', async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const collection = client.db("musicPlayer").collection("tracks");
    const allTracks = await collection.find().toArray();
    res.json(allTracks);
    client.close();
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


