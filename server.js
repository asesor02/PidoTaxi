const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {



    res.send('Chat Server is running on port 3000')
});



io.on('connection', (socket) => {

console.log('user connected: ',socket.id);

    socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );

        socket.broadcast.emit('userjoinedthechat'+userNickname+" : has joined the chat ");
    });


    socket.on('messagedetection', (senderNickname,messageContent) => {
       
       //log the message in console 

       console.log(senderNickname+": " +messageContent+"  IdSocket:"+socket.id+" Fecha:"+new Date())

       
        //create a message object 
       let  message = {"message":messageContent, "senderNickname":senderNickname}
          // send the message to the client side  
       io.emit('message', message);
      // let m = {"message": "Hola mundo", "senderNickname":"Servidor"}
      // io.emit('message',m);
    
    });
      
  
    socket.on('disconnect', function() {
    console.log( 'user has left '+socket.id)
    socket.broadcast.emit("userdisconnect","user has left") 

    });



});

var port = process.env.PORT || 3000;

server.listen(port, ()=>{

console.log('Server Socket IO Running on port:'+ port);

});
