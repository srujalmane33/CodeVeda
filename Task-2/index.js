const express = require("express");

const app = express();
const PORT = 2000;


app.use(express.json());


let users = [
  { id: 1, name: "Srujal", age: 20 },
  { id: 2, name: "Rahul", age: 22 }
];


app.get("/", (req, res) => {
  res.send("Simple REST API is running");
});


// GET all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});


// GET single user
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json(user);
});


// CREATE user
app.post("/users", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({
      message: "Name and age are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    age
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});


// UPDATE user
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const { name, age } = req.body;

  if (name) user.name = name;
  if (age) user.age = age;

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});


// DELETE user
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(
    u => u.id === parseInt(req.params.id)
  );

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users.splice(userIndex, 1);

  res.status(200).json({
    message: "User deleted successfully"
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});