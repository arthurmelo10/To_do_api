const mongoose = require('mongoose')

const {Schema, model} = require('mongoose')

const useSchema = new Schema(
    {
        name: String,
        email: String,
        passwordHash: String,
        todos: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Todo'  
            }
        ]
    },
    {
        timestamps: true,
    }
)

const User = model('User',useSchema)

module.exports = User