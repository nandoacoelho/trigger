(function () {
    'use strict';

    var http        = require('http'),
        apiai       = require('apiai'),
        mysql       = require('mysql'),
        express     = require('express'),
        bodyParser  = require('body-parser'),
        restService = express(),
        apikey      = '942773d0214b4a5489ced85cbaf4d2a8',
        app         = apiai(apikey),
        obj         = require('./output.json'),
        actions = {
            FUNCIONARIO_PROJETO: 'funcionarioProjeto',
            PROJETO_INDUSTRIA: 'projetoIndustria',
            PROJETO_AREA: 'projetoArea'
        };

    init();

    /***
     * init
     */
    function init() {
        createServer();
    }

    /***
     * createServer
     */
    function createServer() {
        restService.use(bodyParser.json());

        restService.post('/hook', function (request, response) {
            console.log('hook request');
            try {
                var speech = '',
                    requestBody = request.body;

                switch (true) {
                    case (requestBody.result.action === actions.FUNCIONARIO_PROJETO):
                        console.log(requestBody.result.action);
                        speech = requestBody.result.action;
                        break;

                    case (requestBody.result.action === actions.PROJETO_AREA):
                        console.log(requestBody.result.action);
                        speech = requestBody.result.action;
                        break;

                    case (requestBody.result.action === actions.PROJETO_INDUSTRIA):
                        console.log(requestBody.result.action);
                        speech = requestBody.result.action;
                        break;
                }

                return response.json({
                    speech: speech,
                    displayText: speech,
                    source: 'huge-voice'
                });
            }

            catch (err) {
                console.error("Can't process request", err);

                return response.status(400).json({
                    status: {
                        code: 400,
                        errorType: err.message
                    }
                });
            }
        });

        restService.listen(8000, function () {
            console.log("Server listening");
        });
    }
})();