const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

const event = new EventEmitter();


event.on("hello", () => console.log("Event occurred!"));


const server = http.createServer((req, res) => {
  res.write("Welcome to Node.js Server!\n");
  res.write("OS: " + os.platform() + "\n");
  res.write("File: " + path.basename(__filename) + "\n");
  res.end("Server running successfully!");
});


event.emit("hello");


server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
