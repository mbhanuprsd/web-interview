const express = require('express')
const cors = require('cors')
const app = express()
const fs = require("fs")
const path = require('path');

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

// Create path for todo json file
var todoPath = path.join(__dirname, '..', 'data', 'todos.json');

// API to fetch the todo list form the JSON file
app.get('/todos', (req, res) => {
    var data = fs.readFileSync(todoPath);
    res.send(data)
})

// API to update the todo list in JSON file
app.post('/todos', (req, res) => {
    fs.writeFileSync(todoPath, JSON.stringify(req.body))
    res.send(req.body)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
