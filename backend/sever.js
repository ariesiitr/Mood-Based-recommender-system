const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PWD);
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "audio",
  })
  .then(() => {
    console.log("MongoDB Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: ["*"],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Server Started on ${PORT}`);
});
