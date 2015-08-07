var dirvector = require('../');

var horizontalDirector = dirvector(dirvector.horizontal);

var mouseIsDown = false;

document.addEventListener('mousedown', function(){
    horizontalDirector.reset();
    mouseIsDown = true;
});

document.addEventListener('mouseup', function(){
    mouseIsDown = false;
});

document.addEventListener('mousemove', horizontalDirector(function(){
    if(mouseIsDown){
        console.log('horizontal');
    }
}));