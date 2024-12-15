const { Router } = require("express");
const indexRouter = Router();
const db = require("../db/queries");

// let messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date(),
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date(),
//   },
// ];

indexRouter.get("/", async (req, res) => {
  const messages = await db.selectMessageList();
  res.render("index", { title: "Mini Message Board", messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", async (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;
  await db.insertMessages(messageUser, messageText);
  res.redirect("/");
});

indexRouter.get("/open", (req, res) => {
  res.render("open", {
    text: req.query.text,
    username: req.query.username,
    added: req.query.added,
  });
});

module.exports = indexRouter;
