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
        userIconUser = document.querySelector('.user-icon.user'),
        main = document.querySelector('.main'),
        messages = document.querySelector('.messages'),
        profile = document.querySelector('.profile'),
        profileInfo = document.querySelector('.profile-info'),
        microphone = document.querySelector('.microphone'),
        paperPlane = document.querySelector('.paper-plane'),
        lastScrollTop = 0;

    name.addEventListener('click', () => {
        blackOverlay.classList.toggle('-active');
        overlay.classList.toggle('-active');
        header.classList.remove('-scroll-up');
        header.classList.toggle('-active');
        profile.classList.toggle('-active');
        messages.classList.toggle('-no-overflow');
        name.classList.toggle('-active');
        user.classList.toggle('-active');
        profileInfo.classList.toggle('-active');
        userIconUser.classList.toggle('-active');
    });

    back.addEventListener('click', () => {
        blackOverlay.classList.toggle('-active');
        overlay.classList.toggle('-active');
        header.classList.toggle('-active');
        profile.classList.toggle('-active');
        messages.classList.toggle('-no-overflow');
        name.classList.toggle('-active');
        user.classList.toggle('-active');
        header.classList.remove('-scroll-up');
        profileInfo.classList.toggle('-active');
        userIconUser.classList.toggle('-active');
    });

    $('.messages').on('scroll', () => {
        let scrollPosition = messages.scrollTop;
        if (scrollPosition > lastScrollTop) {
            header.classList.add('-scroll-up');
            messages.classList.add('-scroll-up');
        }
        else {
            header.classList.remove('-scroll-up');
            messages.classList.remove('-scroll-up');
        }
        lastScrollTop = scrollPosition;
    });

    $(".messages").animate({ scrollTop: $('.messages').prop("scrollHeight")},0);
    header.classList.remove('-scroll-up');

    $('.textarea').on('focusin',function(){
        microphone.classList.remove('-active');
        paperPlane.classList.add('-active');
    });

    $('.textarea').on('focusout',function(){
        microphone.classList.add('-active');
        paperPlane.classList.remove('-active');
    });
})();