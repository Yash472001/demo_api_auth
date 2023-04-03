const express = require('express');
const cors = require('cors'); 
const connectToDb = require('./dbconfig/connection');
const config = require("./config/development.json");
const app = express();
const router = require('./routes/index');


const PORT = config.port || 8080;
const FRONTEND_URL = config.frontendUrl;


// Set up middleware and routes
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectToDb()
});