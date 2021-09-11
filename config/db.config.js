const mongoose = require('mongoose')

const MONGO_URI = 'mongodb+srv://arthur_melo:P4lmeiras2021@cluster0.jx5nn.mongodb.net/Todolist?retryWrites=true&w=majority'

const connect = async () => {
    const connection = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Database connected: ${connection.connections[0].name}`)
}

connect()