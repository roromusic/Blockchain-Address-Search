const express = require("express");
const app = express();
const path = require("path");

const cors_proxy = require("cors-anywhere").createServer({
  originWhitelist: [],
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"]
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api/*", (req, res) => {
  req.url = req.url.replace("/api/", "/");
  cors_proxy.emit("request", req, res);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const listener = app.listen(process.env.PORT || 1337, () => {
  console.log("Your app is listening on port + " + listener.address().port);
});
