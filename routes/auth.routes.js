const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const router = Router()

router.post('/auth/signup', async (request,response) => {
    const {name, email, password} = request.body;
    try{
        const user = await User.findOne({name})
        if(user){
            throw new Error ('username already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            passwordHash,
        });

        response.status(201).json({msg:`${newUser.name} criado com sucesso`})
    } catch (error){
        response.status(500).json({msg:'Erro ao criar novo usuário', error: error.message})
    }
});

router.post('/auth/login', async (request,response) => {
    const {email,  password} = request.body;
    try {
        const user = await User.findOne({ email })
        if(!user) {
            throw new Error ('email not found');
        }
        const compareHash = bcrypt.compareSync(password,user.passwordHash);
        if(!compareHash) {
            throw new Error ('email or password incorrect');
        }

        const payload = {
            id: user.id,
            username: user.email 
        }

        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {expiresIn: '1day'},
        ) 
        console.log(process.env)
        response.status(200).json({payload})
    } catch (error) {
        response.status(400).json({msg: error.message})
    }

 })
module.exports = router