function drawWithPadding(horizontal_padding, vertical_padding, drawCallback) {
  push();
  translate(horizontal_padding, vertical_padding);
  drawCallback();
  pop();
}

function calculate_flow_field_arrow(x, y, line_length, through_point) {
  let angle = noise(x * flow_field_scale, y * flow_field_scale) * TWO_PI * 4;

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

function draw_arrowhead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  line(0, 0, -5, -2);
  line(0, 0, -5, 2);
  pop();
}
