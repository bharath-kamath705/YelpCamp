var alertElem = document.querySelector('.alert-dismissible')
if(alertElem){
    var s = alertElem.style
    s.opacity = 1;
    (function fade(){
        s.transitionDelay = '5s'
        s.transitionDuration = '3s'
        s.transitionProperty = 'all'
        s.transitionTimingFunction = 'ease'
        s.opacity = '0'
    })();
}