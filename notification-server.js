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

        server.listen(PORT);

        var io = require('socket.io').listen(server);

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

        // const server = express()
        //     .use((req, res) => res.sendFile(INDEX) )
        //     .listen(PORT, () => console.log(`Listening on ${ PORT }`));
        // const wss = new SocketServer({ server });
        // wss.on('connection', (ws) => {
        //     console.log('Client connected');
        //     wss.on('message1', function(data){
        //         console.log('message1');
        //         socket.broadcast.emit('message1', data);
        //     });
        //
        //     wss.on('message2', function(data){
        //         console.log('message2');
        //         socket.broadcast.emit('message2', data);
        //     });
        //
        //     ws.on('close', () => console.log('Client disconnected'));
        // });
    }
})();