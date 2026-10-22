const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Ravi", marks: 85 },
  { id: 2, name: "Teja", marks: 90 },
];

// READ
app.get("/students", (req, res) => {
  res.json(students);
});

// CREATE
app.post("/students", (req, res) => {
  const { id, name, marks } = req.body;

  if (id == null || !name || marks == null) {
    return res.status(400).send("Enter valid student data");
  }

  students.push({ id, name, marks });
  res.send("Student added successfully");
});

// UPDATE
app.put("/students/:id", (req, res) => {
  let s = students.find((x) => x && x.id == req.params.id);

  if (!s) return res.status(404).send("Student not found");

  s.name = req.body.name;
  s.marks = req.body.marks;

  res.send("Student updated successfully");
});

// DELETE
app.delete("/students/:id", (req, res) => {
  students = students.filter((x) => x && x.id != req.params.id);
  res.send("Student deleted successfully");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
