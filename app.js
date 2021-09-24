require('dotenv').config()
const express = require('express'); // importar express
const cors = require('cors')
const Todo = require('./models/Todo'); // importar modelo
const User = require('./models/User');
const app = express()
require('./config/db.config'); // conexão banco de dados
const todoRoutes = require('./routes/todo.routes');
const authRoutes = require('./routes/auth.routes');


const PORT = 5000

app.use(cors())

app.use(express.json());

app.use('/todos',todoRoutes)
app.use('/',authRoutes)

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`)); 


