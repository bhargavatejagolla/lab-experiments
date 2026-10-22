const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const secret = "Anjibunny@123";

// Login and generate JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, secret, {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  res.status(401).send("Invalid username or password");
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return res.status(403).send("Token required");

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = user;
    next();
  });
}

// Protected endpoint
app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Access granted!",
    user: req.user,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
