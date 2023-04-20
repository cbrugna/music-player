const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Cluster80046:clusterpass@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const tracks = [
  {
    file: 'https://storage.googleapis.com/song-bucket-11/1812_overture.mp3',
    track_name: "1812 Overture",
    track_artist: "Tchaikovsky",
  },
  {
    file: 'https://storage.googleapis.com/song-bucket-11/adagio.mp3',
    track_name: "Adagio for Strings",
    track_artist: "Samuel Barber",
  },
  {
    file: 'https://storage.googleapis.com/song-bucket-11/moonlight_sonata.mp3',
    track_name: "Moonlight Sonata",
    track_artist: "Ludwig van Beethoven",
  },
  {
    file: 'https://storage.googleapis.com/song-bucket-11/nocturne.mp3',
    track_name: "Nocturne in E-flat major",
    track_artist: "Frederic Chopin",
  },
  {
    file: 'https://storage.googleapis.com/song-bucket-11/serenade.mp3',
    track_name: "Serenade No. 13 for Strings in G Major",
    track_artist: "Wolfgang Amadeus Mozart",
  },
];

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    await client.connect();
    const collection = client.db("musicPlayer").collection("tracks");

    await collection.deleteMany({});
    const result = await collection.insertMany(tracks);
    console.log(`${result.insertedCount} tracks inserted.`);
  } catch (err) {
    console.error("Error: ", err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
