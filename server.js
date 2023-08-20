const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const uri = process.env.MONGO_URI;
let db;

async function connectToMongo() {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    return client.db('userConfigs');
}

connectToMongo().then(database => {
    db = database;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.use(bodyParser.json());

app.get('/api/userConfig', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    try {
        const config = await db.collection('configs').findOne({ ip });
        res.json(config ? config.data : {});
    } catch (err) {
        res.status(500).send("Error fetching user config");
    }
});

app.post('/api/setUserConfig', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const { isDarkMode, isMetric } = req.body;

    try {
        await db.collection('configs').updateOne(
            { ip },
            { $set: { data: { isDarkMode, isMetric } } },
            { upsert: true }
        );
        res.send("User config updated");
    } catch (err) {
        res.status(500).send("Error setting user config");
    }
});

app.get('/api/favorites', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const user = await db.collection('favorites').findOne({ ip });
    res.json(user ? user.favorites : []);
  });
  
  app.post('/api/favorites/add', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const favorite = req.body;
  
    await db.collection('favorites').updateOne(
      { ip },
      { $push: { favorites: favorite } },
      { upsert: true }
    );
  
    res.json({success: true});
  });
  
  app.post('/api/favorites/remove', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const favoriteKey = req.body.key;
  
    await db.collection('favorites').updateOne(
      { ip },
      { $pull: { favorites: { key: favoriteKey } } }
    );
  
    res.json({success: true});
  });

if (process.env.NODE_ENV === 'production') {
    console.log('here');
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}
