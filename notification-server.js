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
        var https        = require('https');
        var server = https.createServer({
            key: fs.readFileSync('/etc/ssl/__riotechlabs_com.key'),
            cert: fs.readFileSync('/etc/ssl/cert_chain.crt'),
            ca: fs.readFileSync('/etc/ssl/cert_chain.crt'),
            requestCert: false,
            rejectUnauthorized: false
        },app);
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