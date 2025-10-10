function main_draw() {
  default_canvas_callback();

  drawWithPadding(horizontal_padding, vertical_padding, () => {
    default_grid_callback();
    default_flow_field_callback();
  });
}

function setup() {
  create_default_canvas_settings(main_draw, {
    title: { default: "Flow Field" },
  });

  create_default_grid_settings(main_draw, {
    n_rows: { default: 20 },
    n_cols: { default: 20 },
  });

  create_default_flow_field_settings(main_draw);

  main_draw();
}

function draw() {
  frameRate(1);
}
