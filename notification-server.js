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
        const PORT = process.env.PORT || 5000;
        console.log(PORT);
        server.listen(PORT);

        var io = require('socket.io').listen(server);

        io.sockets.on('connection', (socket)  => {
            console.log('user connected');

            socket.on('problem', function(data){
                socket.broadcast.emit('mainCard', mainCard);
            });

            socket.on('notification1', function(data){
                socket.broadcast.emit('floatingNotification', notificationArray[0]);
            });

            socket.on('notification2', function(data){
                socket.broadcast.emit('floatingNotification', notificationArray[1]);
            });

            socket.on('completed', function(data){
                socket.broadcast.emit('completedSteps', {});
            });

            socket.on('message1', (data) => {
                console.log('message1');
                socket.broadcast.emit('message3', data);
            });

            socket.on('message2', (data) => {
                console.log('message2');
                socket.broadcast.emit('message4', data);
            });
        });
    }
})();