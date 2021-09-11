const express = require('express'); // importar express

const Todo = require('./models/Todo'); // importar modelo

require('./config/db.config'); // conexão banco de dados

const app = express()

const PORT = 5000

app.use(express.json());

app.get('/todos', async (request, response) => {
    try{
        const todos = await Todo.find();
        response.status(200).json(todos);
    } catch(error){
        response.status(500).json({msg:'ServerError', error})
    }
});

app.post('/todos', async (request, response) => {
    try{
        const newToDo = await Todo.create(request.body);
        response.status(201).json(newToDo);
    } catch(error){
        response.status(500).json({msg: 'ServerError', error})
    }
});

app.put('/todos/:id', async (request, response) => {

});

app.delete('/todos/:id', async (request, response) => {

});

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`)); 


