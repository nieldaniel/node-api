const mongoose = require('mongoose')

const Schema = mongoose.Schema

const toDoSchema = new Schema({
    name: String,
    completed: Boolean
})

//module.exports = mongoose.model( [NAMA TABLE], [SCHEMA TABLE] )
module.exports = mongoose.model('toDo', toDoSchema)