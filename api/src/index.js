const express = require("express");
const { connectDB } = require("./helpers/db");
const { port, db, authApiUrl } = require("./configuration");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();

const postSchema = new mongoose.Schema({
  name: String,
});

const Post = mongoose.model("Post", postSchema);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port: ${port}`);

    console.log(`Our database: ${db}`);

    const silence = new Post({ name: "Silence new" });

    silence.save(function (err, saveSilence) {
      if (err) return console.error(err);
      console.log("save silence with volume", saveSilence);
    });
  });
};

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly! 1");
});

app.get("/test-mail", (req, res) => {
  res.json({
    getAnswer: true,
    answer: `Started api server on port: ${port}`,
  });
});

app.get("/test-api-data", (req, res) => {
  res.json({
    testwithapi: true,
  });
});

app.get("/test-with-current-user", (req, res) => {
  axios.get("auth/api/current-user").then((response) => {
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data,
      listen: authApiUrl + "/current-user",
    });
  });
});

connectDB()
  .on("error", console.log)
  .on("disconnect", connectDB)
  .on("open", startServer);
