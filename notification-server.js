(function () {

    notification();

    /***
     * notification
     * @param serverListener
     */
    function notification() {
        'use strict';

        var fs = require( 'fs' );
        var app = require('express')();
        var https        = require('http');
        var server = https.createServer(app);
        server.listen(4000);

        var io = require('socket.io').listen(server);

        io.sockets.on('connection', function(socket) {
            socket.on('message1', function(data){
                socket.broadcast.emit('message1', data);
            });

            socket.on('notification2', function(data){
                socket.broadcast.emit('message2');
            });
        });
    }
})();