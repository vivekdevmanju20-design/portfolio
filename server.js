const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB ERROR:", err);
  });

const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String
});

app.post("/save", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const newContact = new Contact(req.body);
    await newContact.save();

    console.log("Saved successfully");
    res.send("Message saved successfully!");
  } catch (err) {
    console.log("SAVE ERROR:", err);
    res.status(500).send("Error saving");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});