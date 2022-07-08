const express = require("express");
const { paginaton } = require("./controller/control");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static("./public"));

app.get("/topic/:page", paginaton, (req, res) => {});

app.listen(PORT, () => {
  console.log("server is up on port 5000");
});
