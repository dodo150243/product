const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const cors = require('cors');
const { response } = require('express');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

// const makeCrud = require('express-json-file-crud').makeCrud;
// const productCrud = makeCrud('order', './storage');
// app.use('/order', productCrud);

// //  database json
// const fs = require('fs');
// let rawdata = fs.readFileSync('db.json');
// let order = JSON.parse(rawdata);
// console.log(order);

// let data = [
//     {
//         "id_order": "IN1136",
//         "done_on": null,
//         "id": 0
//     },
//     {
//         "id_order": "IN1136",
//         "done_on": null,
//         "id": 1
//     },
//     {
//         "id_order": "IN1136",
//         "done_on": "2022-08-27 10:49:59",
//         "id": 2
//     }
// ];

app.get('/user', function(req, res, next) {
    
    res.sendfile(__dirname+'/user.html');
    io.on('connection',(socket) =>{
        console.log(socket.id);
        console.log('user socket connected')


        socket.on('product', (response)=>{
            console.log(response)
            io.sockets.emit('pre_list', response)
        })

    })
 });

 app.get('/admin', function(req, res, next) {
  
    res.sendfile(__dirname+'/admin.html');
    io.on('connection',(socket) =>{
        console.log(socket.id);
        console.log('admin socket connected')
    
        socket.on('product', (response)=>{
             console.log(response)
            io.sockets.emit('pre_list', response)
            
    
        })
    })
 });

const server = app.listen(3000, ()=>{
    console.log('server is running...')
})

const io = socketIO(server)
// io.on('connection',(socket) =>{
//     console.log('client socket connected')

//     socket.on('product', (response)=>{
//         console.log(response)

//         io.sockets.emit('pre_list', response)
//     })
// })
