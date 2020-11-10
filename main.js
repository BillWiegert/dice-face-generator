// Algorithm for creating the faces of a die.
// Based on the observations that an odd value is represented by adding a center dot to
// the value one less that it and higher even values are built from lower even values.
// Sometimes I do this instead of sleeping at 4:00 AM.

document.addEventListener("DOMContentLoaded", (event) => {
  const CANVAS = document.querySelector("#canvas");
  const STAGE = new createjs.Stage("canvas");
  const INPUT = document.querySelector("#value");
  const DOT_RADIUS = CANVAS.width * 0.1;    // Radius of each dot
  const DOT_SPACING = CANVAS.width * 0.3;   // Spacing between centers of dots
  const EDGE_OFFSET = CANVAS.width * 0.1;   // Offset to center dot formation

  // Positions of non-center dots in the order they should appear
  const DOT_POSITIONS = [
    [1,1],
    [3,3], // 1 2 3
    [3,1], // .   . 1
    [1,3], // . . . 2
    [1,2], // .   . 3
    [3,2]
  ];

  INPUT.addEventListener("change", () => representValue(parseInt(INPUT.value)));

  // Clear any existing content
  function clear() {
    STAGE.removeAllChildren();
    STAGE.update();
  }

  // Draw a dot at the specified position scaled by canvas size
  function drawDot([x,y]) {
    x = x * DOT_SPACING - EDGE_OFFSET;
    y = y * DOT_SPACING - EDGE_OFFSET;
    let dot = new createjs.Shape();

    dot.graphics.beginFill("Black").drawCircle(x, y, DOT_RADIUS);
    STAGE.addChild(dot);
    STAGE.update();
  }

  // Represent given value by drawing the face of a die with the given value
  function representValue(value) {
    if (typeof value != 'number') throw "Not a number!"
    clear();
    if (value < 1 || value > 6) return; // Not representable

    // Draw center dot for odd numbers
    if (value % 2 !== 0) {
      drawDot([2,2]);
      --value;
    }

    // Draw outer dots
    while (value > 0) {
      --value;
      drawDot(DOT_POSITIONS[value]);
    }
  }
});
