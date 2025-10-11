const DEFAULT_FLOW_FIELD_SCALE = 0.002;
const DEFAULT_FLOW_FIELD_SCALE_MIN = 0.0005;
const DEFAULT_FLOW_FIELD_SCALE_MAX = 0.025;
const DEFAULT_FLOW_field_SCALE_INTERVAL = 0.0001;
let flow_field_scale = DEFAULT_FLOW_FIELD_SCALE;

const DEFAULT_FLOW_FIELD_flow_field_ARROW_LENGTH = 15;
let flow_field_arrow_length = DEFAULT_FLOW_FIELD_flow_field_ARROW_LENGTH;

const DEFAULT_SHOW_FLOW_FIELD = false;
let show_flow_field = DEFAULT_SHOW_FLOW_FIELD;

const DEFAULT_SHOW_FLOW_FIELD_ARROW_HEAD = false;
let show_flow_field_arrow_head = DEFAULT_SHOW_FLOW_FIELD_ARROW_HEAD;

const DEFAULT_SHOW_FLOW_FIELD_THROUGH_CENTER = true;
let show_flow_field_through_center = DEFAULT_SHOW_FLOW_FIELD_THROUGH_CENTER;

const DEFAULT_FLOW_FIELD_COLOR = [180, 180, 180];
let flow_field_color = DEFAULT_FLOW_FIELD_COLOR;

function draw_flow_field() {
  if (!show_flow_field) return;

  stroke(flow_field_color);
  strokeWeight(1);

  let points = grid.getPoints();

  for (let c = 0; c < n_cols; c++) {
    for (let r = 0; r < n_rows; r++) {
      let point = points[c][r];

      let x, y;

      x = point.x;
      y = point.y;

      let { x1, y1, x2, y2, angle } = calculate_flow_field_arrow(
        x,
        y,
        flow_field_arrow_length,
        show_flow_field_through_center,
      );

      print("flow field line", x1, y1, x2, y2);

      line(x1, y1, x2, y2);

      if (!show_flow_field_arrow_head) continue;

      draw_arrowhead(x2, y2, angle);
    }
  }
}

function default_flow_field_callback() {
  draw_flow_field();
}

function create_default_flow_field_settings(main_draw, options = {}) {
  const get = (param, key, fallback) => options[param]?.[key] ?? fallback;

  flow_field_scale = get(
    "flow_field_scale",
    "default",
    DEFAULT_FLOW_FIELD_SCALE,
  );
  flow_field_arrow_length = get(
    "flow_field_arrow_length",
    "default",
    DEFAULT_FLOW_FIELD_flow_field_ARROW_LENGTH,
  );
  show_flow_field = get("show_flow_field", "default", DEFAULT_SHOW_FLOW_FIELD);
  flow_field_color = get(
    "flow_field_color",
    "default",
    DEFAULT_FLOW_FIELD_COLOR,
  );
  show_flow_field_arrow_head = get(
    "show_flow_field_arrow_head",
    "default",
    DEFAULT_SHOW_FLOW_FIELD_ARROW_HEAD,
  );
  show_flow_field_through_center = get(
    "show_flow_field_through_center",
    "default",
    DEFAULT_SHOW_FLOW_FIELD_THROUGH_CENTER,
  );

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
      show_flow_field_arrow_head: {
        type: BOOLEAN_PARAMETER,
        default: get(
          "show_flow_field_arrow_head",
          "default",
          DEFAULT_SHOW_FLOW_FIELD_ARROW_HEAD,
        ),
        callback: function (value) {
          show_flow_field_arrow_head = value;
          main_draw();
        },
      },
      show_flow_field_through_center: {
        type: BOOLEAN_PARAMETER,
        default: get(
          "show_flow_field_through_center",
          "default",
          DEFAULT_SHOW_FLOW_FIELD_THROUGH_CENTER,
        ),
        callback: function (value) {
          show_flow_field_through_center = value;
          main_draw();
        },
      },
      flow_field_scale: {
        type: RANGE_PARAMETER,
        default: get("flow_field_scale", "default", DEFAULT_FLOW_FIELD_SCALE),
        min: get("flow_field_scale", "min", DEFAULT_FLOW_FIELD_SCALE_MIN),
        max: get("flow_field_scale", "max", DEFAULT_FLOW_FIELD_SCALE_MAX),
        interval: get(
          "flow_field_scale",
          "interval",
          DEFAULT_FLOW_field_SCALE_INTERVAL,
        ),
        callback: function (value) {
          flow_field_scale = value;
          main_draw();
        },
      },
      flow_field_arrow_length: {
        type: RANGE_PARAMETER,
        default: get(
          "flow_field_arrow_length",
          "default",
          DEFAULT_FLOW_FIELD_flow_field_ARROW_LENGTH,
        ),
        min: get("flow_field_arrow_length", "min", 5),
        max: get("flow_field_arrow_length", "max", 50),
        interval: get("flow_field_arrow_length", "interval", 1),
        callback: function (value) {
          flow_field_arrow_length = value;
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
