var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesused = [];
var currentRoom = {};
