//* va nuestro código (servidor)
const express = require ('express')
const mongoose = require ('mongoose')
const colors = require ('colors')
const port = 3000;


const app = express ()

// Mensaje de bienvenida
app.get('/', async(req,res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200)
    res.send('<h1>ESTÁ FUNCIONANDO</h1>')
})

// Buscar un animalito (listar)
app.get('/listar', async (req,res)=>{
    console.log('listando ... cochinitos...')
    const animales = await Animal.find()
    return res.send(animales)
})

// Crear un animalito
app.get('/crear', async(req,res)=>{
    console.log('creando....')
    await Animal.create({tipo: 'Cochinito', estado: 'Feliz'})
    await Animal.create({tipo: 'Gatito', estado: 'Programando'})
    await Animal.create({tipo: 'Perrito', estado: 'Comiendo'})
    await Animal.create({tipo: 'Conejito', estado: 'Saltando'})
    res.status(200)
    return res.send('Created...')
})

// habilitar el puerto/servidor
app.listen(port, ()=> {
    console.log("Servidor corriendo en el puerto:".bgBlue + " " + `http://localhost:${port}`.underline)
})