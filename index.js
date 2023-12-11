const express = require('express')
const server = express()
const mongoose = require('mongoose')
const bloodroutes = require('./router/bloodroutes')

mongoose.connect('mongodb+srv://amaljithmk123:0123456789@bloodbank.obqh4he.mongodb.net/BloodBank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Data Base Connected")
    })
    .catch((err) => {
        console.log(err)
    })


server.set('view engine', 'ejs')
server.use(express.static('./public'))


server.use(express.json())
server.use(express.urlencoded({ extended: true }))




server.use('/api/blood', bloodroutes)

server.get('/home', (req, res) => {
    res.render('home')
})
server.get('/donate', (req, res) => {
    res.render('donate')
})
server.get('/results', (req, res) => {
    res.render('results')
})
server.get('/resultone', (req, res) => {
    res.render('resultone')
})


const port = 2222
server.listen(port, () => {
    console.log(`Server Started on Port ${port}`)
})