const express = require("express");
const { connectDB } = require("./helpers/db");
const { port, db, apiUrl } = require("./configuration");
const axios = require("axios");

const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth server on port: ${port}`);
    console.log(`Our database: ${db}`);
  });
};

app.get("/auth", (req, res) => {
  res.send("Our auth-server is working correctly!");
});

app.get("/test-with-api-data", (req, res) => {
  axios.get(apiUrl + "/test-api-data").then((response) => {
    res.json({
      testapidata: response.data.testwithapi,
      listen: apiUrl + "/test-with-api-data",
    });
  });
});

app.get("/current-user", (req, res) => {
  res.json({
    id: "1234",
    name: "Damir 2",
    email: "gubaidulinda.dam@gmail.com",
  });
});

app.get("/test-mail", (req, res) => {
  res.json({
    getAnswer: true,
    answer: `Started auth server on port: ${port}`,
  });
});

connectDB()
  .on("error", console.log)
  .on("disconnect", connectDB)
  .on("open", startServer);
