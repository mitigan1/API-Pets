const { ObjectId } = require('mongodb')
const dbConnect = require('../database.js')
const db = dbConnect()

class Pets {
    static async get(id){
        const query = { _id: new ObjectId(id) }
        const result = await db.collection('pets').findOne(query)
        return result
    }
    find(){}
    delete(){}
    update(){}
    create(){}
}

module.exports = Pets