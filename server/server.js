
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// app
const app = express();

app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());



app.post("/student-registration", async (req, res) => {
    const { body } = req;
    MongoClient.connect(url, (err, database) => {
        if (err) throw err;
        var dbo = database.db("college");
        dbo.collection("student").insertOne(body, function(err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            res.send("1 document inserted");
            database.close();
        });
    });
});


app.get("/list", async (req, res) => {
    const { body } = req;
    MongoClient.connect(url, (err, database) => {
        if (err) throw err;
        var dbo = database.db("college");
        dbo.collection("student").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result)
            database.close();
        });
    });
});

app.post("/test", (req, res) => {
    // console.log(req.body);
  res.json("Hello")
});

app.listen(5555, () => console.log(`Server is running on port 5555`));

