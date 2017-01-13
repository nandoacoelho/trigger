(function () {
    'use strict';

    const notification1 = document.querySelector('.notification-1'),
        notification2 = document.querySelector('.notification-2'),
        problem = document.querySelector('.problem'),
        completed = document.querySelector('.completed');

    init();

    /***
     * init
     */
    function init() {
        let socket;
        socket = io.connect('https://proto.riotechlabs.com:4000', {
            'path': '/socket.io',
            secure: true
        });

        notification1.addEventListener('click', () => {
            socket.emit('notification1', {});
        });

        notification2.addEventListener('click' ,() => {
            socket.emit('notification2', {});
        });

        problem.addEventListener('click' ,() => {
            socket.emit('problem', {});
        });

        completed.addEventListener('click' ,() => {
            socket.emit('completed', {});
        });
    }
})();

