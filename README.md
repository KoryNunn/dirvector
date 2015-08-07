# dirvector

Only allow events to a handler if the gesture is headding in a certain direction.

## Usage

`director = dirvector(validator[, settings])`

where `validator` is a function that takes a vector `{direction: [PI ... -Pi], magnitude: [px]}`
and returns `true` or `false` if the vector is acceptable.

`director` is a function that takes takes a handler function (like a normal event handler)
and returns a function that takes a component vector, like a `MouseEvent` our `TouchMove`,
or anything that looks like `{x: value, y: value}`, validates the event using the `validator`,
and if valid, calls the handler.

## Example (much easier to understand..)

```
// require
var dirvector = require('dirvector');

//Make a director
var horizontalDirector = dirvector(dirvector.horizontal);

document.addEventListener('mousemove', horizontalDirector(function(){
    // Handler will only be called if the gesture is heading in a horizontal plane.
    console.log('horizontal');
}))

document.addEventListener('mouseup', horizontalDirector.reset);

```

## Settings

 - `settings.magnitude`: How far a stream of events must move before deciding whether they are valid or not.

 - `settings.getPosition`: A function that takes the handler input (usually `event`) and returns a componant vector `{x, y}`