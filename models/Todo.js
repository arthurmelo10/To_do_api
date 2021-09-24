const mongoose = require ('mongoose')

const {Schema, model} = require('mongoose')

const todoSchema = new Schema (
    {
        title: String,
        completed: {
            type: Boolean,
            default: false
        },
        user: {type: Schema.Types.ObjectId},
    },    
    {   
        timestamps: true
    }
)

const Todo = model('Todo', todoSchema)

module.exports = Todo