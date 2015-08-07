var fromComponents = require('math-js/vectors/fromComponents');
var addVectors = require('math-js/vectors/add');

function dirvector(validator, settings){
    if(!settings){
        settings = {};
    }

    var valid,
        minMagnitude = settings.magnitude || 5,
        previousPosition,
        netVector;

    var getPosition = settings.getPosition || function(event){
        return {
            x: event.x != null ? event.x : event.pageX,
            y: event.y != null ? event.y : event.pageY
        };
    };

    var filter = function(handler){
        return function handleEvent(event){
            if(valid === false){
                return;
            }

            if(valid){
                return handler(event);
            }

            if(!previousPosition){
                previousPosition = getPosition(event);
                return;
            }

            var currentPosition = getPosition(event);

            netVector = addVectors(netVector, fromComponents(
                previousPosition.x - currentPosition.x,
                previousPosition.y - currentPosition.y
            ));

            previousPosition = currentPosition;

            if(minMagnitude > netVector.magnitude){
                return;
            }

            valid = validator(netVector);
            handleEvent(event);
        };
    };

    filter.reset = function(){
        previousPosition = null;
        netVector = {direction: 0, magnitude: 0};
        valid = null;
    };

    filter.reset();

    return filter;
};

dirvector.horizontal = function(vector){
    var quarterPI = Math.PI / 4,
        PI = Math.PI;


    return (
        (
            vector.direction < quarterPI &&
            vector.direction > -quarterPI
        ) ||
        (
            vector.direction > quarterPI*3 ||
            vector.direction < -quarterPI*3
        )
    );
};

dirvector.vertical = function(vector){
    return !dirvector.horizontal(vector);
};

module.exports = dirvector;