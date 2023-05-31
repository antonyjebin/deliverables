const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Parse incoming JSON data
app.use(bodyParser.json());

// Create an array to store your data
let items = ['Zenda','Techno','SpaceX'];

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    const deletedItem = items.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
