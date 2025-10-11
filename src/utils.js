function drawWithPadding(horizontal_padding, vertical_padding, drawCallback) {
  push();
  translate(horizontal_padding, vertical_padding);
  drawCallback();
  pop();
}

function calculate_noise_angle(x, y, scale, multiplier = 4) {
  return noise(x * scale, y * scale) * TWO_PI * multiplier;
}

function calculate_flow_field_arrow_constant_length(
  x,
  y,
  line_length,
  through_point,
) {
  let angle = calculate_noise_angle(x, y, flow_field_scale);

  let x1, y1, x2, y2;

  if (through_point) {
    // center of line on point
    x1 = x - cos(angle) * (line_length / 2);
    y1 = y - sin(angle) * (line_length / 2);
    x2 = x + cos(angle) * (line_length / 2);
    y2 = y + sin(angle) * (line_length / 2);
  } else {
    // line starts from point
    x1 = x;
    y1 = y;
    x2 = x + cos(angle) * line_length;
    y2 = y + sin(angle) * line_length;
  }

  return { x1, y1, x2, y2, angle };
}

function calculate_flow_field_arrow_flexing_length(
  x,
  y,
  flex_width,
  flex_height,
  through_point,
) {
  let angle = calculate_noise_angle(x, y, flow_field_scale);

  let line_length = min(
    abs(flex_width / cos(angle)),
    abs(flex_height / sin(angle)),
  );

  return calculate_flow_field_arrow_constant_length(
    x,
    y,
    line_length,
    through_point,
  );
}

function draw_arrowhead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  line(0, 0, -5, -2);
  line(0, 0, -5, 2);
  pop();
}

function calculate_cell_size(width, height, n_cols, n_rows) {
  var cell_width = width / (n_cols > 1 ? n_cols - 1 : 1);
  var cell_height = height / (n_rows > 1 ? n_rows - 1 : 1);

  return { cell_width, cell_height };
}

function draw_grid_lines(points) {
  n_cols = points.length;
  n_rows = points[0].length;

  for (let c = 0; c < n_cols; c++) {
    for (let r = 0; r < n_rows; r++) {
      starting_point = points[c][r];

      let end_point;

      // Draw lines to the right
      if (c < n_cols - 1) {
        end_point = points[c + 1][r];
        line(starting_point.x, starting_point.y, end_point.x, end_point.y);
      }

      // Draw lines downwards
      if (r < n_rows - 1) {
        end_point = points[c][r + 1];
        line(starting_point.x, starting_point.y, end_point.x, end_point.y);
      }
    }
  }
}
