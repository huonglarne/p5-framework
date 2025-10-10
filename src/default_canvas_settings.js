const DEFAULT_CANVAS_SIZE = 400;
const DEFAULT_CANVAS_SIZE_MIN = 50;
const DEFAULT_CANVAS_SIZE_MAX = 1800;
const DEFAULT_CANVAS_SIZE_INTERVAL = 50;

let canvas_width = DEFAULT_CANVAS_SIZE;

let canvas_height = DEFAULT_CANVAS_SIZE;

const DEFAULT_PADDING = 50;
const DEFAULT_PADDING_INTERVAL = 10;

let horizontal_padding = DEFAULT_PADDING;

let vertical_padding = DEFAULT_PADDING;

const DEFAULT_SEED = 1;
const DEFAULT_SEED_MIN = 1;
const DEFAULT_SEED_MAX = 1000;

let seed = DEFAULT_SEED;

const DEFAULT_TITLE = "sketch";

let title = DEFAULT_TITLE;

const DEFAULT_BACKGROUND_COLOR = [80, 80, 80];

let background_color = DEFAULT_BACKGROUND_COLOR;

function default_canvas_callback() {
  randomSeed(seed);
  noiseSeed(seed);
  resizeCanvas(canvas_width, canvas_height);
  background(background_color);
}

function create_default_canvas_settings(main_draw, options = {}) {
  const get = (param, key, fallback) => options[param]?.[key] ?? fallback;

  canvas_width = get("canvas_width", "default", DEFAULT_CANVAS_SIZE);
  canvas_height = get("canvas_height", "default", DEFAULT_CANVAS_SIZE);
  horizontal_padding = get("horizontal_padding", "default", DEFAULT_PADDING);
  vertical_padding = get("vertical_padding", "default", DEFAULT_PADDING);
  seed = get("seed", "default", DEFAULT_SEED);
  title = get("title", "default", DEFAULT_TITLE);

  createCanvas(canvas_width, canvas_height);

  createParameterGroup(
    {
      seed: {
        type: RANDOM_PARAMETER,
        default: get("seed", "default", DEFAULT_SEED),
        min: get("seed", "min", DEFAULT_SEED_MIN),
        max: get("seed", "max", DEFAULT_SEED_MAX),
        callback: function (value) {
          seed = value;
          main_draw();
        },
      },
      title: {
        type: INPUT_PARAMETER,
        default: get("title", "default", DEFAULT_TITLE),
        callback: function (value) {
          title = value;
          main_draw();
        },
      },
      canvas_width: {
        type: RANGE_PARAMETER,
        default: get("canvas_width", "default", DEFAULT_CANVAS_SIZE),
        min: get("canvas_width", "min", DEFAULT_CANVAS_SIZE_MIN),
        max: get("canvas_width", "max", DEFAULT_CANVAS_SIZE_MAX),
        interval: get("canvas_width", "interval", DEFAULT_CANVAS_SIZE_INTERVAL),
        callback: function (value) {
          canvas_width = value;
          main_draw();
        },
      },
      canvas_height: {
        type: RANGE_PARAMETER,
        default: get("canvas_height", "default", DEFAULT_CANVAS_SIZE),
        min: get("canvas_height", "min", DEFAULT_CANVAS_SIZE_MIN),
        max: get("canvas_height", "max", DEFAULT_CANVAS_SIZE_MAX),
        interval: get(
          "canvas_height",
          "interval",
          DEFAULT_CANVAS_SIZE_INTERVAL,
        ),
        callback: function (value) {
          canvas_height = value;
          main_draw();
        },
      },
      horizontal_padding: {
        type: RANGE_PARAMETER,
        default: get("horizontal_padding", "default", DEFAULT_PADDING),
        min: 0,
        max: canvas_width,
        interval: get(
          "horizontal_padding",
          "interval",
          DEFAULT_PADDING_INTERVAL,
        ),
        callback: function (value) {
          horizontal_padding = value;
          main_draw();
        },
      },
      vertical_padding: {
        type: RANGE_PARAMETER,
        default: get("vertical_padding", "default", DEFAULT_PADDING),
        min: 0,
        max: canvas_height,
        interval: get("vertical_padding", "interval", DEFAULT_PADDING_INTERVAL),
        callback: function (value) {
          vertical_padding = value;
          main_draw();
        },
      },
      background_color: {
        type: COLOR_PARAMETER,
        default: get("background_color", "default", DEFAULT_BACKGROUND_COLOR),
        callback: function (value) {
          background_color = value;
          main_draw();
        },
      },
    },
    "Canvas Settings",
  );
}
