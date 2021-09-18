const express = require('express'); // importar express
const cors = require('cors')

const Todo = require('./models/Todo'); // importar modelo

require('./config/db.config'); // conexão banco de dados

const app = express()

app.use(cors())

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
    const {id} = request.params;
    const payload = request.body
    try{
        const updateToDo = await Todo.findByIdAndUpdate(id, payload, {new: true});
        response.status(200).json(updateToDo); 
    } catch (error){
        response.status(500).json({msg: 'ServerError', error})
    }
});

app.delete('/todos/:id', async (request, response) => {
    const {id} = request.params

    try{
        const deleteTodo = await Todo.findOneAndDelete(id);
        response.status(200).json(deleteTodo);
    } catch (error) {
        response.status(500).json({msg:'ServerError', error})
    }
});

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`)); 


