const {Router} = require('express');
const Todo = require('../models/Todo');
const router = Router();

router.get('/', async (request, response) => {
    try{
        const todos = await Todo.find();
        response.status(200).json(todos);
    } catch(error){
        response.status(500).json({msg:'ServerError', error})
    }
});

router.post('/', async (request, response) => {
    try{
        const newToDo = await Todo.create(request.body);
        response.status(201).json(newToDo);
    } catch(error){
        response.status(500).json({msg: 'ServerError', error})
    }
});

router.put('/:id', async (request, response) => {
    const {id} = request.params;
    const payload = request.body
    try{
        const updateToDo = await Todo.findByIdAndUpdate(id, payload, {new: true});
        response.status(200).json(updateToDo); 
    } catch (error){
        response.status(500).json({msg: 'ServerError', error})
    }
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params
    try{
        const deleteTodo = await Todo.findOneAndDelete(id);
        response.status(200).json(deleteTodo);
    } catch (error) {
        response.status(500).json({msg:'ServerError', error})
    }
});

module.exports = router;