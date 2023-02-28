module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors: {
          origin: '*',
        }
      })
    
    let users ={}
  
    io.sockets.on('connection',function(socket){
      console.log('user connected')

      socket.on('new-user-connected',(username)=>{
        users[socket.id] = username
        socket.broadcast.emit('new-user-joined',username)
        io.emit("users-count",users)
      })

      socket.on('disconnect',()=>{
        console.log('user disconnected')
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
        io.emit("users-count",users)
      })

      socket.on('message',(data)=>{
        socket.emit('send',data)
        socket.broadcast.emit('receive',data)
      })

    })  
}

