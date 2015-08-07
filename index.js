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

    function getPosition(event){
        return {
            x: event.x,
            y: event.y
        };
    }

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
            (PI + vector.direction) % PI < quarterPI &&
            (PI + vector.direction) % PI > -quarterPI
        ) ||
        (
            (PI + vector.direction) % PI > quarterPI*3 &&
            (PI + vector.direction) % PI < -quarterPI*3
        )
    );
};

dirvector.vertical = function(vector){
    return !dirvector.horizontal(vector);
};

module.exports = dirvector;