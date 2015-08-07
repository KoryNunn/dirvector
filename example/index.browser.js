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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvaW8uanMvdjIuMy40L2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImV4YW1wbGUiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tYXRoLWpzL3ZlY3RvcnMvYWRkLmpzIiwibm9kZV9tb2R1bGVzL21hdGgtanMvdmVjdG9ycy9mcm9tQ29tcG9uZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9tYXRoLWpzL3ZlY3RvcnMvdG9Db21wb25lbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZGlydmVjdG9yID0gcmVxdWlyZSgnLi4vJyk7XG5cbnZhciBob3Jpem9udGFsRGlyZWN0b3IgPSBkaXJ2ZWN0b3IoZGlydmVjdG9yLmhvcml6b250YWwpO1xuXG52YXIgbW91c2VJc0Rvd24gPSBmYWxzZTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oKXtcbiAgICBob3Jpem9udGFsRGlyZWN0b3IucmVzZXQoKTtcbiAgICBtb3VzZUlzRG93biA9IHRydWU7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCl7XG4gICAgbW91c2VJc0Rvd24gPSBmYWxzZTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBob3Jpem9udGFsRGlyZWN0b3IoZnVuY3Rpb24oKXtcbiAgICBpZihtb3VzZUlzRG93bil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdob3Jpem9udGFsJyk7XG4gICAgfVxufSkpOyIsInZhciBmcm9tQ29tcG9uZW50cyA9IHJlcXVpcmUoJ21hdGgtanMvdmVjdG9ycy9mcm9tQ29tcG9uZW50cycpO1xudmFyIGFkZFZlY3RvcnMgPSByZXF1aXJlKCdtYXRoLWpzL3ZlY3RvcnMvYWRkJyk7XG5cbmZ1bmN0aW9uIGRpcnZlY3Rvcih2YWxpZGF0b3IsIHNldHRpbmdzKXtcbiAgICBpZighc2V0dGluZ3Mpe1xuICAgICAgICBzZXR0aW5ncyA9IHt9O1xuICAgIH1cblxuICAgIHZhciB2YWxpZCxcbiAgICAgICAgbWluTWFnbml0dWRlID0gc2V0dGluZ3MubWFnbml0dWRlIHx8IDUsXG4gICAgICAgIHByZXZpb3VzUG9zaXRpb24sXG4gICAgICAgIG5ldFZlY3RvcjtcblxuICAgIHZhciBnZXRQb3NpdGlvbiA9IHNldHRpbmdzLmdldFBvc2l0aW9uIHx8IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGV2ZW50LnggIT0gbnVsbCA/IGV2ZW50LnggOiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnkgIT0gbnVsbCA/IGV2ZW50LnkgOiBldmVudC5wYWdlWVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZmlsdGVyID0gZnVuY3Rpb24oaGFuZGxlcil7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCl7XG4gICAgICAgICAgICBpZih2YWxpZCA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodmFsaWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIXByZXZpb3VzUG9zaXRpb24pe1xuICAgICAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb24gPSBnZXRQb3NpdGlvbihldmVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gZ2V0UG9zaXRpb24oZXZlbnQpO1xuXG4gICAgICAgICAgICBuZXRWZWN0b3IgPSBhZGRWZWN0b3JzKG5ldFZlY3RvciwgZnJvbUNvbXBvbmVudHMoXG4gICAgICAgICAgICAgICAgcHJldmlvdXNQb3NpdGlvbi54IC0gY3VycmVudFBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgcHJldmlvdXNQb3NpdGlvbi55IC0gY3VycmVudFBvc2l0aW9uLnlcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICBwcmV2aW91c1Bvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuXG4gICAgICAgICAgICBpZihtaW5NYWduaXR1ZGUgPiBuZXRWZWN0b3IubWFnbml0dWRlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbGlkID0gdmFsaWRhdG9yKG5ldFZlY3Rvcik7XG4gICAgICAgICAgICBoYW5kbGVFdmVudChldmVudCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZpbHRlci5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHByZXZpb3VzUG9zaXRpb24gPSBudWxsO1xuICAgICAgICBuZXRWZWN0b3IgPSB7ZGlyZWN0aW9uOiAwLCBtYWduaXR1ZGU6IDB9O1xuICAgICAgICB2YWxpZCA9IG51bGw7XG4gICAgfTtcblxuICAgIGZpbHRlci5yZXNldCgpO1xuXG4gICAgcmV0dXJuIGZpbHRlcjtcbn07XG5cbmRpcnZlY3Rvci5ob3Jpem9udGFsID0gZnVuY3Rpb24odmVjdG9yKXtcbiAgICB2YXIgcXVhcnRlclBJID0gTWF0aC5QSSAvIDQsXG4gICAgICAgIFBJID0gTWF0aC5QSTtcblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgKFxuICAgICAgICAgICAgdmVjdG9yLmRpcmVjdGlvbiA8IHF1YXJ0ZXJQSSAmJlxuICAgICAgICAgICAgdmVjdG9yLmRpcmVjdGlvbiA+IC1xdWFydGVyUElcbiAgICAgICAgKSB8fFxuICAgICAgICAoXG4gICAgICAgICAgICB2ZWN0b3IuZGlyZWN0aW9uID4gcXVhcnRlclBJKjMgfHxcbiAgICAgICAgICAgIHZlY3Rvci5kaXJlY3Rpb24gPCAtcXVhcnRlclBJKjNcbiAgICAgICAgKVxuICAgICk7XG59O1xuXG5kaXJ2ZWN0b3IudmVydGljYWwgPSBmdW5jdGlvbih2ZWN0b3Ipe1xuICAgIHJldHVybiAhZGlydmVjdG9yLmhvcml6b250YWwodmVjdG9yKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGlydmVjdG9yOyIsIi8qKlxuICAgICMjIFZlY3RvciBhZGRpdGlvbiAtIGFkZCB0d28gdmVjdG9ycyBleHByZXNzZWQgaW4gcG9sYXIgbm90YXRpb24gIyNcblxuICAgIGFkZCh2ZWN0b3JBIC0gYSBwb2xhciB2ZWN0b3IsIHZlY3RvckIgLSBhbm90aGVyIHBvbGFyIHZlY3RvcilcblxuICAgIHJldHVybnMge21hZ25pdHVkZSwgZGlyZWN0aW9uIGV4cHJlc3NlZCBhcyBhbiBhbmdsZSBpbiByYWRpYW5zfVxuXG4gICAgUmVhbCB3b3JsZCBleGFtcGxlOlxuXG4gICAgIC0gKDJEKSBBZGRpbmcgdHdvIHZlY3RvcnMgdG8gcHJvZHVjZSBhIHRoaXJkIHZlY3RvciB0aGF0IGRlc2NyaWJlcyB0aGUgdG90YWwgbWFnbml0dWRlIGFuZCBkaXJlY3Rpb24uXG5cbiAgICAgLSBDYW4gYmUgdXNlZCB0byBhcHBseSB0d28gZm9yY2VzIG9uIG9uZSBvYmplY3QgdG8gZ2V0IGEgY29tYmluZWQgdmVjdG9yXG5cbiAgICAgICAgLy8gcmV0dXJucyBhIG5ldyB2ZWN0b3IgdGhhdCBpcyB0aGUgYWRkaXRpb24gb2YgdGhlIHR3byBwYXNzZWQgdmVjdG9yc1xuICAgICAgICBhZGQodmVjdG9yMSwgdmVjdG9yMik7XG5cbiovXG5cbnZhciBmcm9tQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vZnJvbUNvbXBvbmVudHMnKSxcbiAgICB0b0NvbXBvbmVudHMgPSByZXF1aXJlKCcuL3RvQ29tcG9uZW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZlY3RvckEsIHZlY3RvckIpIHtcbiAgICB2YXIgY29tcG9uZW50c0EgPSB0b0NvbXBvbmVudHModmVjdG9yQS5tYWduaXR1ZGUsIHZlY3RvckEuZGlyZWN0aW9uKSxcbiAgICAgICAgY29tcG9uZW50c0IgPSB0b0NvbXBvbmVudHModmVjdG9yQi5tYWduaXR1ZGUsIHZlY3RvckIuZGlyZWN0aW9uKTtcblxuICAgIHJldHVybiBmcm9tQ29tcG9uZW50cyhjb21wb25lbnRzQS54ICsgY29tcG9uZW50c0IueCwgY29tcG9uZW50c0EueSArIGNvbXBvbmVudHNCLnkpO1xufTtcbiIsIi8qKlxuICMjIFZlY3RvciBmcm9tIENvbXBvbmVudHMgIyNcblxuICAgIGZyb21Db21wb25lbnRzKHgsIHkpXG5cbiByZXR1cm5zIHttYWduaXR1ZGUsIGRpcmVjdGlvbiBleHByZXNzZWQgYXMgYW4gYW5nbGUgaW4gcmFkaWFuc31cblxuIFJlYWwgd29ybGQgZXhhbXBsZTpcblxuIC0gKDJEKSBDb252ZXJ0IHZlY3RvciBjb21wb25lbnRzIGludG8gdGhlaXIgdmVjdG9yIGZvcm1cblxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciBzcXVhcmVkID0gTWF0aC5wb3coeCwgMikgKyBNYXRoLnBvdyh5LCAyKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1hZ25pdHVkZTogTWF0aC5zcXJ0KHNxdWFyZWQpLFxuICAgICAgICBkaXJlY3Rpb246IE1hdGguYXRhbjIoeSwgeClcbiAgICB9O1xufTsiLCIvKipcbiAgICAjIyBWZWN0b3IgdG8gQ29tcG9uZW50cyAjI1xuXG4gICAgICAgIHRvQ29tcG9uZW50cyhtYWduaXR1ZGUsIGRpcmVjdGlvbiBleHByZXNzZWQgYXMgYW4gYW5nbGUgaW4gcmFkaWFucylcblxuICAgIHJldHVybnMge3gsIHl9XG5cbiAgICBSZWFsIHdvcmxkIGV4YW1wbGU6XG5cbiAgICAtICgyRCkgY29udmVydCBhbiBhbmdsZSBhbmQgYSBkaXN0YW5jZSBpbnRvIGEgZGlmZmVyZW5jZSBpbiB4LHlcblxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtYWduaXR1ZGUsIGRpcmVjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBNYXRoLmNvcyhkaXJlY3Rpb24pICogbWFnbml0dWRlLFxuICAgICAgeTogTWF0aC5zaW4oZGlyZWN0aW9uKSAqIG1hZ25pdHVkZVxuICAgIH07XG59O1xuIl19
