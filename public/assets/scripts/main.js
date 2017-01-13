(function () {
    'use strict';
    init();

    let updates = document.querySelector('.updates'),
        footer = document.querySelector('.main-footer'),
        welcome = document.querySelector('.welcome'),
        toroTimeline = document.querySelector('.toro-timeline'),

        mainCard = document.querySelectorAll('.main-card'),
        timeLeft = document.querySelector('.countdown .time'),
        dateTime = document.querySelector('.card .date-time'),
        intro = document.querySelector('.card .intro'),
        paragraph = document.querySelector('.card .paragraph'),
        buttonText = document.querySelector('.button-text'),
        completed = document.querySelector('.welcome.-completed');

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
            socket = io.connect('https://proto.riotechlabs.com:4000', {
                'path': '/socket.io',
                secure: true
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

            if (!updates.classList.contains('-active')) {
                updates.classList.add('-active');
            }

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
            timeLeft.innerHTML = resp.timeLeft;
            dateTime.innerHTML = resp.dateTime;
            intro.innerHTML = resp.intro;
            paragraph.innerHTML = resp.paragraph;
            buttonText.innerHTML = resp.buttonText;
        });

        socket.on('completedSteps', (resp) => {
            navigator.serviceWorker.register('./service-worker.js',{ scope: './' });
            completed.classList.add('-active');
            welcome.classList.remove('-active');
            toroTimeline.classList.remove('-active');
            footer.classList.remove('-active');
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

        self.addEventListener('notificationclick', function(event) {
            console.log('On notification click: ', event.notification.tag);
            event.notification.close();
            event.waitUntil(
                clients.matchAll({
                    type: "window"
                })
                    .then(function(clientList) {
                        for (let i = 0; i < clientList.length; i++) {
                            let client = clientList[i];
                            if (client.url == '/' && 'focus' in client)
                                return client.focus();
                        }
                        if (clients.openWindow) {
                            return clients.openWindow('https://deanhume.github.io/typography');
                        }
                    })
            );
        });
    }
})();

