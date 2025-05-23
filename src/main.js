const express = require('express');
const app = express();
const port = 8085;
// const Assets = require('./assets');

app.use(express.json()); // to parse JSON bodies

// Sample in-memory data
let users = [
  { id: 1, name: 'Alice', employeeId: 'EMP001', email: 'alice@example.com' },
  { id: 2, name: 'Bob', employeeId: 'EMP002', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', employeeId: 'EMP003', email: 'charlie@example.com' },
  { id: 4, name: 'Tom', employeeId: 'EMP004', email: 'tom@example.com' },
  { id: 5, name: 'Sarah', employeeId: 'EMP005', email: 'sarah@example.com' },
  { id: 6, name: 'David', employeeId: 'EMP006', email: 'david@example.com' },
  { id: 7, name: 'Michael', employeeId: 'EMP007', email: 'michael@example.com' },
  { id: 8, name: 'John', employeeId: 'EMP008', email: 'john@example.com' },
  { id: 9, name: 'Emily', employeeId: 'EMP009', email: 'emily@example.com' },
  { id: 10, name: 'Jennifer', employeeId: 'EMP010', email: 'jennifer@example.com' },

];


// GET all users
app.get('/users', async (req, res) => {
  res.json(users);
});

// GET a single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).send('User not found');
});

// POST (create a new user)
app.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update a user)
app.put('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).send('User not found');
  users[idx] = { id: users[idx].id, ...req.body };
  res.json(users[idx]);
});

// DELETE 
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
