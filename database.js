require('dotenv').config()
const { MongoClient } = require("mongodb")
const senha = process.env.DBPASSWORD
const user = process.env.DBUSER

// Replace the uri string with your connection string.
const uri = "mongodb+srv://"+ user +":"+ senha +"@cluster0.bnzap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

function dbConnect() {
  const client = new MongoClient(uri)
  return client.db('marcus')
}

module.exports = dbConnect