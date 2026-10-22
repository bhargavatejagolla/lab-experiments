const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "abc123",
    resave: false,
    saveUninitialized: true,
  }),
);

app.get("/", (req, res) => {
  res.cookie("username", "Teja");
  req.session.visits = (req.session.visits || 0) + 1;

  res.send("Cookie set!<br>Session visits: " + req.session.visits);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
