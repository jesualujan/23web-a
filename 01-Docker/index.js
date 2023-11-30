const express = require ('express')
const mongoose = require ('mongoose')
const colors = require('colors')
const port = 3000;

const Animales = mongoose.model('Animals', new mongoose.Schema({
    tipo: String,
    estado: String,
  }))

const app = express()

mongoose.connect('mongodb://jesua:password@monguito:27017/miapp?authSource=admin')

//mensaje de bienvenida
app.get('/', async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200);
    res.send("<h1>SI FUNCIONA</h1>");
})

// buscar un animal
app.get('/listar', async (req, res) => {
    console.log('listando... cochinitos...')
    const animals = await Animales.find();
    return res.send(animals)
  })

// crear un animal
app.get('/crear', async (req, res) => {
    console.log('creando...')
    await Animales.create({ tipo: 'Cochinito', estado: 'Feliz' })
    await Animales.create({ tipo: 'Gatito', estado: 'Programando'})
    await Animalse.create({ tipo: 'Perrito', estado: 'Comiendo' })
    await Animales.create({ tipo: 'Conejito', estado: 'Saltando' })
    res.status(200);
    return res.send('Created...')
  })

// app.listen(3000, () => console.log('listening...'.bgCyan))
// https://www.npmjs.com/package/colors

app.listen(port, ()=> {
    console.log("Servidor corriendo en el puerto:".bgBlue + " " + `http://localhost:${port}`.underline)
})
