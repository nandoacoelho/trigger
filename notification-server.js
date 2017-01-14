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
        const PORT = process.env.PORT || 3000;
        console.log(PORT);
        server.listen(PORT);

        var io = require('socket.io').listen(server);

        io.set('transports', ['xhr-polling']);
        io.set('polling duration', 10);
        io.sockets.on('connection', function(socket) {
            console.log('user connected');
            socket.on('message1', function(data){
                console.log('message1');
                socket.broadcast.emit('message1', data);
            });

            socket.on('message2', function(data){
                console.log('message2');
                socket.broadcast.emit('message2', data);
            });
        });
    }
})();