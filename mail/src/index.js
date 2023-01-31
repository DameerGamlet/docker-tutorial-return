const express = require("express");
const { port, apiUrl, authApiUrl } = require("./configuration");

const axios = require("axios");

const app = express();

app.listen(port, () => {
  console.log(`Started api service on port: ${port}`);
  console.log("apiUrl", apiUrl);
  console.log("authApiUrl", authApiUrl);
});

app.get("/test-connect", (req, res) => {
  res.json({
    successful: "Yes, all good!",
    listen: "authApiUrl: " + authApiUrl,
  });
});

app.get("/listen-api", (req, res) => {
  axios.get("/api" + "/test-mail").then((response) => {
    res.json({
      api: apiUrl,
      currentUserFromAuth: response.data,
    });
  });
});

app.get("/listen-auth", (req, res) => {
  axios.get("/auth/api" + "/test-mail").then((response) => {
    res.json({
      auth: authApiUrl,
      currentUserFromAuth: response.data,
    });
  });
});

app.get("/test", (req, res) => {
  res.send(
    "Our api server is working correctly! I am from mail. " +
      apiUrl +
      " " +
      authApiUrl
  );
  console.log("apiUrl", apiUrl);
  console.log("authApiUrl", authApiUrl);
});
