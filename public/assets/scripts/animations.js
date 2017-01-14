(function () {
    'use strict';
    
    var name = document.querySelector('.name'),
        header = document.querySelector('.header'),
        arrow = document.querySelector('.arrow'),
        main = document.querySelector('.main'),
        lastScrollTop = 0;

    name.addEventListener('click', () => {
       header.classList.toggle('-active');
    });

    // document.addEventListener('scroll', function(event) {
    //     let scrollPosition = window.pageYOffset;
    //     var $elm = $(event.target);
    //
    //     if( $elm.is('.main')){ // or any other filtering condition
    //         // do some stuff
    //         if (scrollPosition > lastScrollTop) {
    //             header.classList.add('-scroll-up');
    //             console.log('scrolling2');
    //         } else {
    //             header.classList.remove('-scroll-up');
    //             console.log('scrolling');
    //         }
    //         lastScrollTop = scrollPosition;
    //     }
    // }.bind(this));
    //
    // $(".main").scroll(function() { //.box is the class of the div
    //     var scrollPosition = main.scrollTop;
    //     console.log(scrollPosition )
    //     if (scrollPosition > lastScrollTop) {
    //         header.classList.add('-scroll-up');
    //         console.log('scrolling2');
    //     } else {
    //         header.classList.remove('-scroll-up');
    //         console.log('scrolling');
    //     }
    //     lastScrollTop = scrollPosition;
    //
    //
    // }.bind(this));


    $('.main').on('scroll', function () {
        let scrollPosition = main.scrollTop;
        if (scrollPosition > lastScrollTop) {
            header.classList.add('-scroll-up');
        } else {
            header.classList.remove('-scroll-up');
        }
        lastScrollTop = scrollPosition;

    }.bind(this));
    //
})();