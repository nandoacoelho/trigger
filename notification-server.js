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

        var notificationArray = [
                {
                    time: '20/12/2016 - 15h20',
                    title: 'Dados em análise',
                    description: 'Para agilizar seu processo, envie as fotos de seus documentos.',
                    icon: '<svg id="documents" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 42.7 53"><path d="M40.2 50h-38V2h38v48zm-36-2h34V4h-34v44z"></path> <path d="M8.2 11h11v2h-11zM8.2 17h27v2h-27zM8.2 22h27v2h-27zM8.2 28h27v2h-27zM8.2 34h27v2h-27zM8.2 39h27v2h-27z"></path> </svg>',
                    actionTitle: 'ENVIAR'
                },
                {
                    time: '20/12/2016 - 15h40',
                    title: 'Guia para Transferência',
                    description: 'Caso precise ir à sua agência, preparamos um Guia para você.',
                    icon: '<svg id="download" xmlns="http://www.w3.org/2000/svg" viewbox="-402.7 234 47.3 65.7"><path d="M-379 288.3l-18.6-27.8h10.1v-23.6h17v23.6h10.1l-18.6 27.8zm-12.9-24.8l12.9 19.4 12.9-19.4h-7.4v-23.6h-11v23.6h-7.4zM-401 293.5h44v4h-44z"></path> </svg>',
                    actionTitle: 'BAIXAR'
                }
            ],
            mainCard = {
                timeLeft: '1 dia',
                dateTime: '20/12/2016 - 15h40',
                intro: 'Está faltando um item,',
                paragraph: 'Tivemos dificuldades para confirmar seu endereço. Para prosseguir, por favor, envie uma foto do seu comprovante de residência.',
                buttonText: 'EMVIAR DOCUMENTOS'
            };

        io.sockets.on('connection', function(socket) {
            console.log('blau')
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
        });
    }
})();