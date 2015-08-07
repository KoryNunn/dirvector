(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../":2}],2:[function(require,module,exports){
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
},{"math-js/vectors/add":3,"math-js/vectors/fromComponents":4}],3:[function(require,module,exports){
/**
    ## Vector addition - add two vectors expressed in polar notation ##

    add(vectorA - a polar vector, vectorB - another polar vector)

    returns {magnitude, direction expressed as an angle in radians}

    Real world example:

     - (2D) Adding two vectors to produce a third vector that describes the total magnitude and direction.

     - Can be used to apply two forces on one object to get a combined vector

        // returns a new vector that is the addition of the two passed vectors
        add(vector1, vector2);

*/

var fromComponents = require('./fromComponents'),
    toComponents = require('./toComponents');

module.exports = function(vectorA, vectorB) {
    var componentsA = toComponents(vectorA.magnitude, vectorA.direction),
        componentsB = toComponents(vectorB.magnitude, vectorB.direction);

    return fromComponents(componentsA.x + componentsB.x, componentsA.y + componentsB.y);
};

},{"./fromComponents":4,"./toComponents":5}],4:[function(require,module,exports){
/**
 ## Vector from Components ##

    fromComponents(x, y)

 returns {magnitude, direction expressed as an angle in radians}

 Real world example:

 - (2D) Convert vector components into their vector form

 */

module.exports = function(x, y) {
    var squared = Math.pow(x, 2) + Math.pow(y, 2);

    return {
        magnitude: Math.sqrt(squared),
        direction: Math.atan2(y, x)
    };
};
},{}],5:[function(require,module,exports){
/**
    ## Vector to Components ##

        toComponents(magnitude, direction expressed as an angle in radians)

    returns {x, y}

    Real world example:

    - (2D) convert an angle and a distance into a difference in x,y

*/

module.exports = function(magnitude, direction) {
    return {
      x: Math.cos(direction) * magnitude,
      y: Math.sin(direction) * magnitude
    };
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvaW8uanMvdjIuMy40L2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImV4YW1wbGUiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tYXRoLWpzL3ZlY3RvcnMvYWRkLmpzIiwibm9kZV9tb2R1bGVzL21hdGgtanMvdmVjdG9ycy9mcm9tQ29tcG9uZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9tYXRoLWpzL3ZlY3RvcnMvdG9Db21wb25lbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGRpcnZlY3RvciA9IHJlcXVpcmUoJy4uLycpO1xuXG52YXIgaG9yaXpvbnRhbERpcmVjdG9yID0gZGlydmVjdG9yKGRpcnZlY3Rvci5ob3Jpem9udGFsKTtcblxudmFyIG1vdXNlSXNEb3duID0gZmFsc2U7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKCl7XG4gICAgaG9yaXpvbnRhbERpcmVjdG9yLnJlc2V0KCk7XG4gICAgbW91c2VJc0Rvd24gPSB0cnVlO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpe1xuICAgIG1vdXNlSXNEb3duID0gZmFsc2U7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaG9yaXpvbnRhbERpcmVjdG9yKGZ1bmN0aW9uKCl7XG4gICAgaWYobW91c2VJc0Rvd24pe1xuICAgICAgICBjb25zb2xlLmxvZygnaG9yaXpvbnRhbCcpO1xuICAgIH1cbn0pKTsiLCJ2YXIgZnJvbUNvbXBvbmVudHMgPSByZXF1aXJlKCdtYXRoLWpzL3ZlY3RvcnMvZnJvbUNvbXBvbmVudHMnKTtcbnZhciBhZGRWZWN0b3JzID0gcmVxdWlyZSgnbWF0aC1qcy92ZWN0b3JzL2FkZCcpO1xuXG5mdW5jdGlvbiBkaXJ2ZWN0b3IodmFsaWRhdG9yLCBzZXR0aW5ncyl7XG4gICAgaWYoIXNldHRpbmdzKXtcbiAgICAgICAgc2V0dGluZ3MgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgdmFsaWQsXG4gICAgICAgIG1pbk1hZ25pdHVkZSA9IHNldHRpbmdzLm1hZ25pdHVkZSB8fCA1LFxuICAgICAgICBwcmV2aW91c1Bvc2l0aW9uLFxuICAgICAgICBuZXRWZWN0b3I7XG5cbiAgICBmdW5jdGlvbiBnZXRQb3NpdGlvbihldmVudCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgICAgeTogZXZlbnQueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBmaWx0ZXIgPSBmdW5jdGlvbihoYW5kbGVyKXtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50KXtcbiAgICAgICAgICAgIGlmKHZhbGlkID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2YWxpZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighcHJldmlvdXNQb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNQb3NpdGlvbiA9IGdldFBvc2l0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSBnZXRQb3NpdGlvbihldmVudCk7XG5cbiAgICAgICAgICAgIG5ldFZlY3RvciA9IGFkZFZlY3RvcnMobmV0VmVjdG9yLCBmcm9tQ29tcG9uZW50cyhcbiAgICAgICAgICAgICAgICBwcmV2aW91c1Bvc2l0aW9uLnggLSBjdXJyZW50UG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICBwcmV2aW91c1Bvc2l0aW9uLnkgLSBjdXJyZW50UG9zaXRpb24ueVxuICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG5cbiAgICAgICAgICAgIGlmKG1pbk1hZ25pdHVkZSA+IG5ldFZlY3Rvci5tYWduaXR1ZGUpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFsaWQgPSB2YWxpZGF0b3IobmV0VmVjdG9yKTtcbiAgICAgICAgICAgIGhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZmlsdGVyLnJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcHJldmlvdXNQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIG5ldFZlY3RvciA9IHtkaXJlY3Rpb246IDAsIG1hZ25pdHVkZTogMH07XG4gICAgICAgIHZhbGlkID0gbnVsbDtcbiAgICB9O1xuXG4gICAgZmlsdGVyLnJlc2V0KCk7XG5cbiAgICByZXR1cm4gZmlsdGVyO1xufTtcblxuZGlydmVjdG9yLmhvcml6b250YWwgPSBmdW5jdGlvbih2ZWN0b3Ipe1xuICAgIHZhciBxdWFydGVyUEkgPSBNYXRoLlBJIC8gNCxcbiAgICAgICAgUEkgPSBNYXRoLlBJO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgKFxuICAgICAgICAgICAgKFBJICsgdmVjdG9yLmRpcmVjdGlvbikgJSBQSSA8IHF1YXJ0ZXJQSSAmJlxuICAgICAgICAgICAgKFBJICsgdmVjdG9yLmRpcmVjdGlvbikgJSBQSSA+IC1xdWFydGVyUElcbiAgICAgICAgKSB8fFxuICAgICAgICAoXG4gICAgICAgICAgICAoUEkgKyB2ZWN0b3IuZGlyZWN0aW9uKSAlIFBJID4gcXVhcnRlclBJKjMgJiZcbiAgICAgICAgICAgIChQSSArIHZlY3Rvci5kaXJlY3Rpb24pICUgUEkgPCAtcXVhcnRlclBJKjNcbiAgICAgICAgKVxuICAgICk7XG59O1xuXG5kaXJ2ZWN0b3IudmVydGljYWwgPSBmdW5jdGlvbih2ZWN0b3Ipe1xuICAgIHJldHVybiAhZGlydmVjdG9yLmhvcml6b250YWwodmVjdG9yKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGlydmVjdG9yOyIsIi8qKlxuICAgICMjIFZlY3RvciBhZGRpdGlvbiAtIGFkZCB0d28gdmVjdG9ycyBleHByZXNzZWQgaW4gcG9sYXIgbm90YXRpb24gIyNcblxuICAgIGFkZCh2ZWN0b3JBIC0gYSBwb2xhciB2ZWN0b3IsIHZlY3RvckIgLSBhbm90aGVyIHBvbGFyIHZlY3RvcilcblxuICAgIHJldHVybnMge21hZ25pdHVkZSwgZGlyZWN0aW9uIGV4cHJlc3NlZCBhcyBhbiBhbmdsZSBpbiByYWRpYW5zfVxuXG4gICAgUmVhbCB3b3JsZCBleGFtcGxlOlxuXG4gICAgIC0gKDJEKSBBZGRpbmcgdHdvIHZlY3RvcnMgdG8gcHJvZHVjZSBhIHRoaXJkIHZlY3RvciB0aGF0IGRlc2NyaWJlcyB0aGUgdG90YWwgbWFnbml0dWRlIGFuZCBkaXJlY3Rpb24uXG5cbiAgICAgLSBDYW4gYmUgdXNlZCB0byBhcHBseSB0d28gZm9yY2VzIG9uIG9uZSBvYmplY3QgdG8gZ2V0IGEgY29tYmluZWQgdmVjdG9yXG5cbiAgICAgICAgLy8gcmV0dXJucyBhIG5ldyB2ZWN0b3IgdGhhdCBpcyB0aGUgYWRkaXRpb24gb2YgdGhlIHR3byBwYXNzZWQgdmVjdG9yc1xuICAgICAgICBhZGQodmVjdG9yMSwgdmVjdG9yMik7XG5cbiovXG5cbnZhciBmcm9tQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vZnJvbUNvbXBvbmVudHMnKSxcbiAgICB0b0NvbXBvbmVudHMgPSByZXF1aXJlKCcuL3RvQ29tcG9uZW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZlY3RvckEsIHZlY3RvckIpIHtcbiAgICB2YXIgY29tcG9uZW50c0EgPSB0b0NvbXBvbmVudHModmVjdG9yQS5tYWduaXR1ZGUsIHZlY3RvckEuZGlyZWN0aW9uKSxcbiAgICAgICAgY29tcG9uZW50c0IgPSB0b0NvbXBvbmVudHModmVjdG9yQi5tYWduaXR1ZGUsIHZlY3RvckIuZGlyZWN0aW9uKTtcblxuICAgIHJldHVybiBmcm9tQ29tcG9uZW50cyhjb21wb25lbnRzQS54ICsgY29tcG9uZW50c0IueCwgY29tcG9uZW50c0EueSArIGNvbXBvbmVudHNCLnkpO1xufTtcbiIsIi8qKlxuICMjIFZlY3RvciBmcm9tIENvbXBvbmVudHMgIyNcblxuICAgIGZyb21Db21wb25lbnRzKHgsIHkpXG5cbiByZXR1cm5zIHttYWduaXR1ZGUsIGRpcmVjdGlvbiBleHByZXNzZWQgYXMgYW4gYW5nbGUgaW4gcmFkaWFuc31cblxuIFJlYWwgd29ybGQgZXhhbXBsZTpcblxuIC0gKDJEKSBDb252ZXJ0IHZlY3RvciBjb21wb25lbnRzIGludG8gdGhlaXIgdmVjdG9yIGZvcm1cblxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciBzcXVhcmVkID0gTWF0aC5wb3coeCwgMikgKyBNYXRoLnBvdyh5LCAyKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1hZ25pdHVkZTogTWF0aC5zcXJ0KHNxdWFyZWQpLFxuICAgICAgICBkaXJlY3Rpb246IE1hdGguYXRhbjIoeSwgeClcbiAgICB9O1xufTsiLCIvKipcbiAgICAjIyBWZWN0b3IgdG8gQ29tcG9uZW50cyAjI1xuXG4gICAgICAgIHRvQ29tcG9uZW50cyhtYWduaXR1ZGUsIGRpcmVjdGlvbiBleHByZXNzZWQgYXMgYW4gYW5nbGUgaW4gcmFkaWFucylcblxuICAgIHJldHVybnMge3gsIHl9XG5cbiAgICBSZWFsIHdvcmxkIGV4YW1wbGU6XG5cbiAgICAtICgyRCkgY29udmVydCBhbiBhbmdsZSBhbmQgYSBkaXN0YW5jZSBpbnRvIGEgZGlmZmVyZW5jZSBpbiB4LHlcblxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtYWduaXR1ZGUsIGRpcmVjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBNYXRoLmNvcyhkaXJlY3Rpb24pICogbWFnbml0dWRlLFxuICAgICAgeTogTWF0aC5zaW4oZGlyZWN0aW9uKSAqIG1hZ25pdHVkZVxuICAgIH07XG59O1xuIl19
