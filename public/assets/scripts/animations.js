(function () {
    'use strict';
    
    let name = document.querySelector('.name'),
        header = document.querySelector('.header'),
        arrow = document.querySelector('.arrow');

    name.addEventListener('click', function () {
       header.classList.toggle('-active');
    });
})();