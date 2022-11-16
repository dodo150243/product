const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const cors = require('cors');
const { response } = require('express');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


app.get('/user', function(req, res, next) {
    res.sendfile(__dirname+'/user.html');
 });

 app.get('/admin', function(req, res, next) {
    res.sendfile(__dirname+'/admin.html');
 });

const server = app.listen(3000, ()=>{
    console.log('server is running...')
})

const io = socketIO(server)
io.on('connection',(socket) =>{
    console.log('client socket connected')

    socket.on('product', (response)=>{
        console.log(response)

        io.sockets.emit('pre_list', response)
    })
})
