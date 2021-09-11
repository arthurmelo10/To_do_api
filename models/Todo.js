const mongoose = require ('mongoose')

const {Schema, model} = require('mongoose')

const todoSchema = new Schema (
    {
        title: String,
        completed: {
            type: Boolean,
            default: false
        }
    },    
    {   
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo