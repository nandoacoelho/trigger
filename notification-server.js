(function () {

    notification();

    /***
     * notification
     * @param serverListener
     */
    function notification() {
        'use strict';

        const express = require('express');
        const SocketServer = require('ws').Server;
        const path = require('path');

        const PORT = process.env.PORT || 5000;
        const INDEX = path.join(__dirname, 'index.html');

        const server = express()
            .use((req, res) => res.sendFile(INDEX) )
            .listen(PORT, () => console.log(`Listening on ${ PORT }`));

        const wss = new SocketServer({ server });

        wss.on('connection', (ws) => {
            console.log('Client connected');
            ws.on('close', () => console.log('Client disconnected'));
        });

        setInterval(() => {
            wss.clients.forEach((client) => {
                client.send(new Date().toTimeString());
            });
        }, 1000);


        // var fs = require( 'fs' );
        // var app = require('express')();
        // var https        = require('http');
        // var server = https.createServer(app);
        // const PORT = process.env.PORT || 3000;
        // console.log(PORT);
        // server.listen(PORT);
        //
        // var io = require('socket.io').listen(server);
        //
        // io.set('transports', ['xhr-polling']);
        // io.set('polling duration', 10);
        // io.sockets.on('connection', function(socket) {
        //     console.log('user connected');
        //     socket.on('message1', function(data){
        //         console.log('message1');
        //         socket.broadcast.emit('message1', data);
        //     });
        //
        //     socket.on('message2', function(data){
        //         console.log('message2');
        //         socket.broadcast.emit('message2', data);
        //     });
        // });
    }
})();