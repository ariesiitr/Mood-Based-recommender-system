const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const audioRouter = require("./routes/audioRoutes");
const AudioModel = require('./Model/AudioModel')

dotenv.config();

const PORT = process.env.PORT;
const DB = process.env.DATABASE
mongoose.connect(DB)
const database = mongoose.connection
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.post('/api/data', async (req, res) => {
  const link = req.body.audioLink;
  const regex = /^blob:(.*)$/;
  const matches = link.match(regex);
  var url=""
  if (matches && matches.length >= 2) {
  url = matches[1];
  console.log(url);
  }
  const audio = new AudioModel({
    url: url
  })
  try{
    const response = await audio.save();
  }
  catch(error){
    console.log(error)
    res.send(error)
    return
  }
  // Do something with the data...
  res.send('Data received');
  return
});


app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Server Started on ${PORT}`);
});
