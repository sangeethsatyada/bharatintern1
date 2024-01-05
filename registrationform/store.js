const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://127.0.0.1:27017/bharatintern";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected"))
  .catch((err) => console.log("Failed to connect: " + err));

const dataschema = new mongoose.Schema({
  fname: String,
  sname: String,
  phone: String,
  email: String,
  password: String,
  cpassword: String,
});

const Data = mongoose.model('Data', dataschema);
app.post("/", async(req, res) => {
  const { fname, sname, phone, email, password, cpassword, gender } = req.body;
  const newData = new Data({ fname, sname, phone, email, password, cpassword, gender });

  newData.save()
    .then(() => res.status(201).send("Successfully stored"))
    .catch((err) => {
      console.log("Error to insert: " + err);
      res.status(500).send("Internal Server Error");
    });
    const val=await Data.countDocuments({email:email});
    if(val>=1)
    console.log("User already exists");
  else
  console.log("Registered succesffully");
});
app.post("/Login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Username:", username); // Log the username

    const val = await Data.countDocuments({ email: username });

    if (val >= 1) {
      console.log("successfully logined");
      res.status(200).send("User already exists");
    } else {
      console.log("user not exist...Register first");
      res.status(404).send("User does not exist");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
