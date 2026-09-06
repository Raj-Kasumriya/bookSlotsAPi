const express = require('express');
const app = express();
const timeSlotsRoutes = require('./routes/timeSlots.routes');
const cors = require('cors');
const bodyParse = require("body-parser")
const dotenv = require('dotenv')
dotenv.config()

const dns = require('node:dns/promises')
dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(cors());

require("./config/db")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParse.json())

app.use('/api/slots', timeSlotsRoutes);

const port = 3000

app.listen(port, () => {

    console.log("server is running");

});