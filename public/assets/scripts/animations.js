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
        back = document.querySelector('.user-icon.back'),


        main = document.querySelector('.main'),
        profile = document.querySelector('.profile'),
        profileInfo = document.querySelector('.profile-info'),

        lastScrollTop = 0;

    name.addEventListener('click', () => {
        blackOverlay.classList.toggle('-active');
        overlay.classList.toggle('-active');
        console.log('blau')
        header.classList.toggle('-active');
        profile.classList.toggle('-active');
        body.classList.toggle('-no-overflow');
        name.classList.toggle('-active');
        user.classList.toggle('-active');

        profileInfo.classList.toggle('-active');
    });

    back.addEventListener('click', () => {
        blackOverlay.classList.toggle('-active');
        overlay.classList.toggle('-active');
        console.log('blau')
        header.classList.toggle('-active');
        profile.classList.toggle('-active');
        body.classList.toggle('-no-overflow');
        name.classList.toggle('-active');
        user.classList.toggle('-active');

        profileInfo.classList.toggle('-active');
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

    // var d = $('.messages');
    // d.scrollTop(d.prop("scrollHeight"));
    $(".messages").animate({ scrollTop: $('.messages').prop("scrollHeight")}, 1000);
})();