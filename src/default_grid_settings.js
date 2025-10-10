const DEFAULT_GRID_SIZE = 3;
const DEFAULT_MAX_GRID_SIZE = 50;
const DEFAULT_MIN_GRID_SIZE = 1;

let n_cols = DEFAULT_GRID_SIZE;
let n_rows = DEFAULT_GRID_SIZE;

const DEFAULT_GRID_WIDTH = 400;
const DEFAULT_GRID_HEIGHT = 400;

let grid_width = DEFAULT_GRID_WIDTH;
let grid_height = DEFAULT_GRID_HEIGHT;

const DEFAULT_SHOW_GRID = false;

// red
const DEFAULT_GRID_COLOR = [180, 180, 180];
let show_grid = DEFAULT_SHOW_GRID;
let grid_color = DEFAULT_GRID_COLOR;

function draw_grid_lines(grid, n_rows, n_cols, show_grid, grid_color) {
  if (!show_grid) return;

  stroke(grid_color);

  let points = grid.getPoints();

  for (let c = 0; c < n_cols; c++) {
    for (let r = 0; r < n_rows; r++) {
      print("r,c", r, c);

      starting_point = points[c][r];

      print("starting point", starting_point);

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

function default_grid_callback() {
  grid = prettyGrid.createGrid({
    rows: n_rows,
    cols: n_cols,
    width: grid_width,
    height: grid_height,
  });
  draw_grid_lines(grid, n_rows, n_cols, show_grid, grid_color);
}

function create_default_grid_settings(options = {}, main_draw) {
  const get = (param, key, fallback) => options[param]?.[key] ?? fallback;

  print("options", options);

  n_rows = get("n_rows", "default", DEFAULT_GRID_SIZE);
  n_cols = get("n_cols", "default", DEFAULT_GRID_SIZE);
  grid_width = get("grid_width", "default", DEFAULT_GRID_WIDTH);
  grid_height = get("grid_height", "default", DEFAULT_GRID_HEIGHT);
  show_grid = get("show_grid", "default", DEFAULT_SHOW_GRID);
  grid_color = get("grid_color", "default", DEFAULT_GRID_COLOR);

  createParameterGroup(
    {
      show_grid: {
        type: BOOLEAN_PARAMETER,
        default: get("show_grid", "default", DEFAULT_SHOW_GRID),
        callback: function (value) {
          show_grid = value;
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
      n_cols: {
        type: RANGE_PARAMETER,
        default: get("n_cols", "default", DEFAULT_GRID_SIZE),
        min: get("n_cols", "min", DEFAULT_MIN_GRID_SIZE),
        max: get("n_cols", "max", DEFAULT_MAX_GRID_SIZE),
        interval: 1,
        callback: function (value) {
          n_cols = value;
          main_draw();
        },
      },
      n_rows: {
        type: RANGE_PARAMETER,
        default: get("n_rows", "default", DEFAULT_GRID_SIZE),
        min: get("n_rows", "min", DEFAULT_MIN_GRID_SIZE),
        max: get("n_rows", "max", DEFAULT_MAX_GRID_SIZE),
        interval: 1,
        callback: function (value) {
          n_rows = value;
          main_draw();
        },
      },
    },
    "Grid Settings",
  );
}
