const express = require('express')
const uuid = require('uuid')
import cors from 'cors'
const port = 3000
const app = express()
app.use(express.json())
app.use(cors())

/*
        -Query params => meusite.com/users?nome=WENIO&age=24 //filtro
        -Route params => /users/2    //BUSCAR OU ATUALIZAR ALGO ESPECIFICO
        Request Body => { "name":"WENIO", "age":}

        -GET      => Buscar informacoes no back-end
        -POST     => Criar informacoes no back-end
        -PUT / PATCH => Alterar/Atualizar informacoes no back-end
        -DELETE      => Deletar informacoes no back-end
        Middleware => INTERCEPTADOR => tem o poder de parar ou alterar dados da requisicao
*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {

    return response.json(users)
})


app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(user)
})
app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id: id, name, age }

    users[index] = updatedUser


    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)


    return response.status(204).json()
})

app.listen(port, () => {
    console.log('😂Server starde on port ${port}');
})