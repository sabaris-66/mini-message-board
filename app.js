require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const indexRouter = require("./routes/indexRouter");
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log("Listening on Port 3000"));
