var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
users = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){

  socket.on('adduser', function(data){
		socket.nickname = data.name;
		socket.id_user = data.id;
		socket.room = data.batch;
		socket.join(data.batch);
		users[socket.nickname] = socket;
	});

  socket.on('chat message', function(msg){
    io.sockets.in(socket.room).emit('chat message', {msg: msg, nick: socket.nickname});
  
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


