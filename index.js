const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);

//app.set('port', (process.env.PORT || 3000));

app.get('/', (req, res) => {

res.send('Chat Server is running on port:'+port);

});

io.on('connection', (socket) => {

console.log('user connected');


socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );

        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
    });

    socket.emit('')

socket.on('messagedetection', (senderNickname,messageContent) => {
       
       //log the message in console 

       console.log(senderNickname+" :" +messageContent)

       
        //create a message object 
       let  message = {"message":messageContent, "senderNickname":senderNickname}
          // send the message to the client side  
       io.emit('message', message );
     
      });
      
  
 socket.on('disconnect', function() {
    console.log( ' user has left ')
    socket.broadcast.emit("userdisconnect"," user has left ") 

});



});

var port = process.env.PORT || 3000;

server.listen(port, ()=>{

console.log('Server Socket IO Running on port:'+ port);

});
