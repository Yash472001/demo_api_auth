const mongoose = require("mongoose");
const config = require("../config/development.json");

const url = config.dbUrl;

async function connectToDb() {
    try {
      const connected = await mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true})
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
}

module.exports = connectToDb;
