(function () {
    'use strict';
    
    let body = document.querySelector('body'),

        header = document.querySelector('.header'),
        name = document.querySelector('.name'),
        arrow = document.querySelector('.arrow'),
        userIcon = document.querySelector('.user-icon'),
        overlay = document.querySelector('.overlay'),
        blackOverlay = document.querySelector('.black-overlay'),
        user = document.querySelector('.user'),
        back = document.querySelector('.back'),


        main = document.querySelector('.main'),
        profile = document.querySelector('.profile'),

        lastScrollTop = 0;

    name.addEventListener('click', () => {
        blackOverlay.classList.toggle('-active');
        overlay.classList.toggle('-active');

        header.classList.toggle('-active');
        profile.classList.toggle('-active');
        body.classList.toggle('-no-overflow');
        name.classList.toggle('-active');
        user.classList.toggle('-active');
        back.classList.toggle('-active');
    });

    userIcon.addEventListener('click', function() {
        header.classList.toggle('-active');
    });

    $('.messages').on('scroll', function () {
        let scrollPosition = main.scrollTop;
        if (scrollPosition > lastScrollTop) {
            header.classList.add('-scroll-up');
        } else {
            header.classList.remove('-scroll-up');
        }
        lastScrollTop = scrollPosition;

    }.bind(this));
})();