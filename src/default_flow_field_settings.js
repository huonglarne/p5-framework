const DEFAULT_FLOW_SCALE = 0.002;
const DEFAULT_FLOW_SCALE_MIN = 0.0005;
const DEFAULT_FLOW_SCALE_MAX = 0.025;
const DEFAULT_FLOW_SCALE_INTERVAL = 0.0001;
let flow_scale = DEFAULT_FLOW_SCALE;

const DEFAULT_ARROW_LENGTH = 15;
let arrow_length = DEFAULT_ARROW_LENGTH;

const DEFAULT_SHOW_FLOW_FIELD = false;
let show_flow_field = DEFAULT_SHOW_FLOW_FIELD;

const DEFAULT_SHOW_ARROW_HEAD = false;
let show_arrow_head = DEFAULT_SHOW_ARROW_HEAD;

const DEFAULT_FLOW_FIELD_COLOR = [180, 180, 180];
let flow_field_color = DEFAULT_FLOW_FIELD_COLOR;

function draw_flow_field() {
  if (!show_flow_field) return;

  stroke(flow_field_color);
  strokeWeight(1);
  fill(flow_field_color);

  let points = grid.getPoints();

  for (let c = 0; c < n_cols; c++) {
    for (let r = 0; r < n_rows; r++) {
      let point = points[c][r];
      let angle =
        noise(point.x * flow_scale, point.y * flow_scale) * TWO_PI * 4;

      let x2 = point.x + cos(angle) * arrow_length;
      let y2 = point.y + sin(angle) * arrow_length;

      // Draw line
      line(point.x, point.y, x2, y2);

      if (!show_arrow_head) continue;
      // Draw arrowhead
      push();
      translate(x2, y2);
      rotate(angle);
      line(0, 0, -5, -2);
      line(0, 0, -5, 2);
      pop();
    }
  }
}

function default_flow_field_callback() {
  draw_flow_field();
}

function create_default_flow_field_settings(main_draw, options = {}) {
  const get = (param, key, fallback) => options[param]?.[key] ?? fallback;

  flow_scale = get("flow_scale", "default", DEFAULT_FLOW_SCALE);
  arrow_length = get("arrow_length", "default", DEFAULT_ARROW_LENGTH);
  show_flow_field = get("show_flow_field", "default", DEFAULT_SHOW_FLOW_FIELD);
  flow_field_color = get(
    "flow_field_color",
    "default",
    DEFAULT_FLOW_FIELD_COLOR,
  );
  show_arrow_head = get("show_arrow_head", "default", DEFAULT_SHOW_ARROW_HEAD);

  createParameterGroup(
    {
      show_flow_field: {
        type: BOOLEAN_PARAMETER,
        default: get("show_flow_field", "default", DEFAULT_SHOW_FLOW_FIELD),
        callback: function (value) {
          show_flow_field = value;
          main_draw();
        },
      },
      show_arrow_head: {
        type: BOOLEAN_PARAMETER,
        default: get("show_arrow_head", "default", DEFAULT_SHOW_ARROW_HEAD),
        callback: function (value) {
          show_arrow_head = value;
          main_draw();
        },
      },
      flow_scale: {
        type: RANGE_PARAMETER,
        default: get("flow_scale", "default", DEFAULT_FLOW_SCALE),
        min: get("flow_scale", "min", DEFAULT_FLOW_SCALE_MIN),
        max: get("flow_scale", "max", DEFAULT_FLOW_SCALE_MAX),
        interval: get("flow_scale", "interval", DEFAULT_FLOW_SCALE_INTERVAL),
        callback: function (value) {
          flow_scale = value;
          main_draw();
        },
      },
      arrow_length: {
        type: RANGE_PARAMETER,
        default: get("arrow_length", "default", DEFAULT_ARROW_LENGTH),
        min: get("arrow_length", "min", 5),
        max: get("arrow_length", "max", 50),
        interval: get("arrow_length", "interval", 1),
        callback: function (value) {
          arrow_length = value;
          main_draw();
        },
      },
      flow_field_color: {
        type: COLOR_PARAMETER,
        default: get("flow_field_color", "default", DEFAULT_FLOW_FIELD_COLOR),
        callback: function (value) {
          flow_field_color = value;
          main_draw();
        },
      },
    },
    "Flow Field Settings",
  );
}
