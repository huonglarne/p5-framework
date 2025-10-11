function main_draw() {
  default_canvas_callback();

  let grid = default_grid_callback();

  default_flow_field_callback(grid);
}

function setup() {
  create_default_canvas_settings(main_draw, {
    title: { default: "Flow Field" },
  });

  create_default_grid_settings(main_draw, {
    show_outer_grid_lines: { default: true },
  });

  create_default_flow_field_settings(main_draw, {
    show_flow_field: { default: true },
  });

  main_draw();
}

function draw() {
  frameRate(1);
}
