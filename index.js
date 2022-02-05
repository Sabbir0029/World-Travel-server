const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dywnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('WorldTravel');
    const allPlaces = database.collection('Places');

    // GET
    app.get('/allPlaces', async (req,res) =>{
      const cursor = allPlaces.find({});
      const Places = await cursor.toArray();
      res.send(Places);
    })
    app.get('/allPlaces/:id', async(req,res) =>{
      const id =req.params.id;
      const query = {_id: ObjectId(id)};
      const Places = await allPlaces.findOne(query);
      res.send(Places)
    })

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})