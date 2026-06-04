//localhost:3000 after running this file in git bash
//this is the boilerplate code for express
const express = require('express');

const app = express()

let todos = [];
let idcounter = 1;

//route handlers
app.get('/', function(req, res){
    res.send('Hello World')
})
app.get('/p', function(req, res){
    res.send('Hello P endpoint')
})

app.listen(3000) //which port (listening infinitely)