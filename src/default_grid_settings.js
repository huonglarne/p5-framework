const DEFAULT_GRID_SIZE = 3;
const DEFAULT_MAX_GRID_SIZE = 50;
const DEFAULT_MIN_GRID_SIZE = 1;

let grid_n_cells_horizontal = DEFAULT_GRID_SIZE;
let grid_n_cells_vertical = DEFAULT_GRID_SIZE;

const DEFAULT_GRID_WIDTH = 400;
const DEFAULT_GRID_HEIGHT = 400;

let grid_width = DEFAULT_GRID_WIDTH;
let grid_height = DEFAULT_GRID_HEIGHT;

const DEFAULT_SHOW_INNER_GRID_LINES = false;
let show_inner_grid_lines = DEFAULT_SHOW_INNER_GRID_LINES;

const DEFAULT_SHOW_OUTER_GRID_LINES = false;
let show_outer_grid_lines = DEFAULT_SHOW_OUTER_GRID_LINES;

const DEFAULT_SHOW_INNER_GRID_CORNERS = false;
let show_inner_grid_corners = DEFAULT_SHOW_INNER_GRID_CORNERS;

const DEFAULT_SHOW_OUTER_GRID_CORNERS = false;
let show_outer_grid_corners = DEFAULT_SHOW_OUTER_GRID_CORNERS;

const DEFAULT_GRID_COLOR = [180, 180, 180];
let grid_color = DEFAULT_GRID_COLOR;

const DEFAULT_FLEX_GRID_TO_CANVAS = true;
let flex_grid_to_canvas = DEFAULT_FLEX_GRID_TO_CANVAS;

function adjust_grid_to_canvas() {
  grid_width = canvas_width - horizontal_padding * 2;
  grid_height = canvas_height - vertical_padding * 2;
}

function default_grid_callback() {
  if (flex_grid_to_canvas) {
    adjust_grid_to_canvas();
  }

  let grid = new CustomGrid(
    horizontal_padding,
    vertical_padding,
    grid_width,
    grid_height,
    grid_n_cells_horizontal,
    grid_n_cells_vertical,
  );

  stroke(grid_color);

  if (show_inner_grid_lines) {
    grid.drawInnerGridLines();
  }

  if (show_inner_grid_corners) {
    grid.drawInnerCorners();
  }

  if (show_outer_grid_lines) {
    grid.drawOuterGridLines();
  }

  if (show_outer_grid_corners) {
    grid.drawOuterCorners();
  }

  return grid;
}

function create_default_grid_settings(main_draw, options = {}) {
  const get = (param, key, fallback) => options[param]?.[key] ?? fallback;  

  grid_n_cells_vertical = get("grid_n_rows", "default", DEFAULT_GRID_SIZE);
  grid_n_cells_horizontal = get("grid_n_cols", "default", DEFAULT_GRID_SIZE);

  flex_grid_to_canvas = get(
    "flex_grid_to_canvas",
    "default",
    DEFAULT_FLEX_GRID_TO_CANVAS,
  );

  if (flex_grid_to_canvas) {
    adjust_grid_to_canvas(
      canvas_width,
      canvas_height,
      horizontal_padding,
      vertical_padding,
    );
  } else {
    grid_width = get("grid_width", "default", DEFAULT_GRID_WIDTH);
    grid_height = get("grid_height", "default", DEFAULT_GRID_HEIGHT);
  }

  show_inner_grid_lines = get("show_inner_grid", "default", DEFAULT_SHOW_INNER_GRID_LINES);
  grid_color = get("grid_color", "default", DEFAULT_GRID_COLOR);

  createParameterGroup(
    {
      show_inner_grid_lines: {
        type: BOOLEAN_PARAMETER,
        default: get("show_inner_grid_lines", "default", DEFAULT_SHOW_INNER_GRID_LINES),
        callback: function (value) {
          show_inner_grid_lines = value;
          main_draw();
        },
      },
      show_inner_grid_corners: {
        type: BOOLEAN_PARAMETER,
        default: get(
          "show_inner_grid_corners",
          "default",
          DEFAULT_SHOW_INNER_GRID_CORNERS,
        ),
        callback: function (value) {
          show_inner_grid_corners = value;
          main_draw();
        },
      },
      show_outer_grid_lines: {
        type: BOOLEAN_PARAMETER,
        default: get(
          "show_outer_grid_lines",
          "default",
          DEFAULT_SHOW_OUTER_GRID_LINES,
        ),
        callback: function (value) {
          show_outer_grid_lines = value;
          main_draw();
        },
      },
      show_outer_grid_corners: {
        type: BOOLEAN_PARAMETER,
        default: get(
          "show_outer_grid_corners",
          "default",
          DEFAULT_SHOW_OUTER_GRID_CORNERS,
        ),
        callback: function (value) {
          show_outer_grid_corners = value;
          main_draw();
        },
      },
      flex_grid_to_canvas: {
        type: BOOLEAN_PARAMETER,
        default: get(
          "flex_grid_to_canvas",
          "default",
          DEFAULT_FLEX_GRID_TO_CANVAS,
        ),
        callback: function (value) {
          flex_grid_to_canvas = value;
          main_draw();
        },
      },
      grid_color: {
        type: COLOR_PARAMETER,
        default: get("grid_color", "default", DEFAULT_GRID_COLOR),
        callback: function (value) {
          grid_color = value;
          main_draw();
        },
      },
      grid_n_cols: {
        type: RANGE_PARAMETER,
        default: get("grid_n_cols", "default", DEFAULT_GRID_SIZE),
        min: get("grid_n_cols", "min", DEFAULT_MIN_GRID_SIZE),
        max: get("grid_n_cols", "max", DEFAULT_MAX_GRID_SIZE),
        interval: 1,
        callback: function (value) {
          grid_n_cells_horizontal = value;
          main_draw();
        },
      },
      grid_n_rows: {
        type: RANGE_PARAMETER,
        default: get("grid_n_rows", "default", DEFAULT_GRID_SIZE),
        min: get("grid_n_rows", "min", DEFAULT_MIN_GRID_SIZE),
        max: get("grid_n_rows", "max", DEFAULT_MAX_GRID_SIZE),
        interval: 1,
        callback: function (value) {
          grid_n_cells_vertical = value;
          main_draw();
        },
      },
    },
    "Grid Settings",
  );
}
