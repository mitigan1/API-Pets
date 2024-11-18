
const express = require('express')
const { ObjectId } = require('mongodb')
const app = express()
const port = 3000
let x = 0;

const dbConnect = require('./database.js')
const db = dbConnect()

const Pets = require('./models/pets.js')

// JSON = texto
// Header - Accept: application/json
app.use(express.json())

// Expondo uma pasta
app.use(express.static('./public'))

// Exemplo de middleware
app.use(function (req, res, next) {
    console.log('passei por aqui')
    next()
})

app.get('/api/pets/', async (req, res) => {
    const query = req.query
    const result = await db.collection('pets').find(query).toArray()
    res.json(result)
})

app.get('/api/pets/:id', async (req, res) => {
    const result = await Pets.get(req.params.id)
    res.json(result)
})

app.post('/api/pets/', async (req, res) => {
    const doc = req.body
    const result = await db.collection('pets').insertOne(doc)
    res.json(result)
})

app.put('/api/pets/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const doc = {
        $set: req.body
    }
    const result = await db.collection('pets').updateOne(query,doc)
    res.json(result)
})

app.delete('/api/pets/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await db.collection('pets').deleteOne(query)
    res.json(result)
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
  })