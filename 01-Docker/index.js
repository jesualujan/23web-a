const express = require ('express')
const mongoose = require ('mongoose')
const colors = require('colors')
const port = 3003;

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

mongoose.connect('mongodb://jesua:password@monguitodos:27017/miapp?authSource=admin')

//mensaje de bienvenida
app.get('/', async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200);
    res.send("<h1>SI FUNCIONA</h1>");
})

// buscar un animal
app.get('/listar', async (req, res) => {
    console.log('listando... cochinitos...')
    const animales = await Animal.find();
    return res.send(animales)
  })

// crear un animal
app.get('/crear', async (req, res) => {
    console.log('creando...')
    await Animal.create({ tipo: 'Cochinito', estado: 'Feliz' })
    await Animal.create({ tipo: 'Gatito', estado: 'Programando'})
    await Animal.create({ tipo: 'Perrito', estado: 'Comiendo' })
    await Animal.create({ tipo: 'Conejito', estado: 'Saltando' })
    res.status(200);
    return res.send('Created...')
  })

// app.listen(3000, () => console.log('listening...'.bgCyan))
// https://www.npmjs.com/package/colors

app.listen(port, ()=> {
    console.log("Servidor corriendo en el puerto:".bgBlue + " " + `http://localhost:${port}`.underline)
})
