(function () {
    'use strict';

    let footer = document.querySelector('.footer'),
        welcome = document.querySelector('.welcome'),
        sendButton = document.querySelector('.voice-button'),
        textarea = document.querySelector('.textarea'),
        name = document.querySelector('.name');

    init();
    /***
     * init
     */
    function init() {
        connectToSocketIO();
        addToHomeScreen();
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
            // https://huge-trigger.herokuapp.com:49223
            socket = io.connect('http://10.11.32.154:5000');

        sendButton.addEventListener('click', () => {
            let listItemArray = document.querySelectorAll('.message'),
                html = '<div class="message my-message roboto-light"><span>'+ textarea.innerText +'</span></div>';

            listItemArray[listItemArray.length - 1].insertAdjacentHTML('afterend', html);
            navigator.serviceWorker.register('./service-worker.js',{ scope: './' });

            if (textarea.innerText != '' && name.innerText === 'Luisa') {
                socket.emit('message1', textarea.innerText);
                textarea.innerText = '';
            } else if (textarea.innerText != '' && name.innerText === 'Aline Coelho') {
                socket.emit('message1', textarea.innerText);
                textarea.innerText = '';
            }
        });

        socket.on('floatingNotification', function (resp) {
            navigator.serviceWorker.register('./service-worker.js',{ scope: './' });
            let listItemArray = document.querySelectorAll('.messages'),
                html = '<div class="their-message roboto-light"><span>'+ resp +'</span></div>';

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

        socket.on('message3', (resp) => {
            let listItemArray = document.querySelectorAll('.message'),
                html = '<div class="message their-message roboto-light"><span>'+ resp +'</span></div>';

            listItemArray[listItemArray.length - 1].insertAdjacentHTML('afterend', html);
            navigator.serviceWorker.register('./service-worker.js',{ scope: './' });
        });

        socket.on('message4', (resp) => {
            let listItemArray = document.querySelectorAll('.message'),
                html = '<div class="message my-message roboto-light"><span>'+ resp +'</span></div>';

            listItemArray[listItemArray.length - 1].insertAdjacentHTML('afterend', html);
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

