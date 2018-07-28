const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const accessToken = process.env.GITHUB_TOKEN;

app.get("/api/", (req, res) => {
  const query = decodeURI(req.query.query);
  console.log(req.query);
  fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(json => {
      res.send(json);
    })
    .catch(error => console.error(error));
});

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
