(function () {
    'use strict';

    let footer = document.querySelector('.footer'),
        welcome = document.querySelector('.welcome'),
        sendButton = document.querySelector('.voice-button'),
        textarea = document.querySelector('.textarea');

    init();
    /***
     * init
     */
    function init() {
        addToHomeScreen();
        connectToSocketIO();
        subscribeServiceWorker();

        var howLaunched = window.location.search.substring(1).split('=')[0];
        if (howLaunched === 'homescreen' || (window.navigator.standalone == true) || (window.matchMedia('(display-mode: standalone)').matches)) {
            welcome.classList.remove('-active');
            toroTimeline.classList.add('-active');
            footer.classList.add('-active');
        }
    }

    /***
     * connectToSocketIO
     */
    function connectToSocketIO() {
        let socket;
            socket = io.connect('https://huge-trigger.herokuapp.com:19713', {
                'path': '/socket.io',
                secure: true
            });

        sendButton.addEventListener('click', function () {
            if (textarea.value != '') {
                socket.emit('message1', $('.textarea').val());
            }
        });

        socket.on('floatingNotification', function (resp) {
            navigator.serviceWorker.register('./service-worker.js',{ scope: './' });
            let listItemArray = document.querySelectorAll('.update'),
                html = '<div class="update">' +
                            '<div class="update-description">' +
                                '<p class="date-time">' + resp.time + '</p>' +
                                '<p class="title">' + resp.title +'</p>' +
                                '<p class="description">' + resp.description +'</p>' +
                            '</div>' +
                        '<a href="#"><div class="update-action">' + resp.icon +'<span class="title">' + resp.actionTitle + '</span></a>' +
                        '</div>' +
                    '</div>';

            listItemArray[listItemArray.length - 1].insertAdjacentHTML('beforebegin', html);

            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification(resp.title, {
                    body: resp.description,
                    icon: './assets/images/icon192.png',
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                    tag: 'vibration-sample',
                });
            });
        });

        socket.on('mainCard', (resp) => {
            navigator.serviceWorker.register('./service-worker.js',{ scope: './' });
        });
    }

    /***
     * addToHomeScreen
     */
    function addToHomeScreen() {
        window.addEventListener('beforeinstallprompt', function(e) {
            e.userChoice.then((choiceResult) => {

                console.log(choiceResult.outcome);

                if(choiceResult.outcome == 'dismissed') {
                    console.log('User cancelled home screen install');
                }
                else {
                    console.log('User added to home screen');
                    welcome.classList.remove('-active');
                    toroTimeline.classList.add('-active');
                }
            });
        });
    }

    /***
     * subscribeServiceWorker
     */
    function subscribeServiceWorker() {
        if ('serviceWorker' in navigator) {
            let outputElement = document.getElementById('output');

            window.addEventListener('load', function() {
                navigator.serviceWorker.register('./service-worker.js',{ scope: './' })
                    .then(function(registration) {
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                        Notification.requestPermission()
                            .then(function(permission) {
                        });
                    })
                    .catch(function(err) {
                        console.log('ServiceWorker registration failed: ', err);
                    });
                    window.addEventListener('beforeinstallprompt', function(e) {
                        outputElement.textContent = 'beforeinstallprompt Event fired';
                    });
                });
        }
    }
})();

