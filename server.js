const express = require('express');
const app = express();
const port = 3000;

//Middleware
app.use(express.json());

//Sample
let items = [
    { id: 1, name: 'Item 1'},
    { id: 2, name: 'Item 2'},
];

// Basic endpoint
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
});

// GET all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// GET item by ID
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!items) return res.status(404).send('Item not found!');
    res.json(item);
});

// POST a new item
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT to update an Item
app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    item.name = req.body.name;
    res.json(item);
});

// DELETE an Item
app.delete('/api/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});