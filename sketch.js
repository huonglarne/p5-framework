let DEFAULT_FLOW_SCALE = 0.02;
let flow_scale = DEFAULT_FLOW_SCALE;

let DEFAULT_ARROW_LENGTH = 15;
let arrow_length = DEFAULT_ARROW_LENGTH;

let grid;

function main_draw() {
  default_canvas_callback();

  drawWithPadding(horizontal_padding, vertical_padding, () => {
    default_grid_callback();
  });
}

function setup() {
  create_default_canvas_settings(main_draw, {
    title: { default: "Flow Field" },
  });

  create_default_grid_settings(main_draw);

  main_draw();

  // createParameterGroup(
  //   {
  //     flow_scale: {
  //       type: RANGE_PARAMETER,
  //       default: DEFAULT_FLOW_SCALE,
  //       min: 0.0005,
  //       max: 0.03,
  //       interval: 0.00001,
  //       callback: function (value) {
  //         flow_scale = value;
  //         drawWithPadding(horizontal_padding, vertical_padding, main_draw);
  //       },
  //     },
  //     arrow_length: {
  //       type: RANGE_PARAMETER,
  //       default: DEFAULT_ARROW_LENGTH,
  //       min: 5,
  //       max: 50,
  //       interval: 1,
  //       callback: function (value) {
  //         arrow_length = value;
  //         drawWithPadding(horizontal_padding, vertical_padding, main_draw);
  //       },
  //     },
  //   },
  //   "Flow Field Settings",
  // );
}

// function main_draw() {
//   background(70);

//   stroke(225);
//   strokeWeight(1);
//   noFill();

//   // generate random starting points
//   for (let i = 0; i < 500; i++) {
//     let x = random(0, canvas_width - horizontal_padding * 2);
//     let y = random(0, canvas_height - vertical_padding * 2);

//     // draw flow line
//     beginShape();
//     for (let j = 0; j < 100; j++) {
//       vertex(x, y);

//       let angle =
//         noise(
//           (x + horizontal_padding) * flow_scale,
//           (y + vertical_padding) * flow_scale,
//         ) *
//         TWO_PI *
//         2;
//       x += cos(angle) * 2;
//       y += sin(angle) * 2;

//       // stop if out of bounds
//       if (
//         x < 0 ||
//         x > canvas_width - horizontal_padding * 2 ||
//         y < 0 ||
//         y > canvas_height - vertical_padding * 2
//       ) {
//         break;
//       }
//     }
//     endShape();
//   }

//   // Draw flow field
//   stroke(150);
//   strokeWeight(1);
//   noFill();

// grid.draw(
//   (point) => {
//     // Calculate flow direction using Perlin noise
//     let angle =
//       noise(point.x * flow_scale, point.y * flow_scale) * TWO_PI * 2;

//     // Calculate end point of the arrow
//     let endX = point.x + cos(angle) * arrow_length;
//     let endY = point.y + sin(angle) * arrow_length;

//     // Draw the flow line
//     line(point.x, point.y, endX, endY);

//     // Draw arrowhead
//     push();
//     translate(endX, endY);
//     rotate(angle);
//     line(0, 0, -5, -2);
//     line(0, 0, -5, 2);
//     pop();
//   },

// );
// }

function draw() {
  frameRate(1);
}
