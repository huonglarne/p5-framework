const DEFAULT_FLOW_FIELD_SCALE = 0.002;
const DEFAULT_FLOW_FIELD_SCALE_MIN = 0.0005;
const DEFAULT_FLOW_FIELD_SCALE_MAX = 0.025;
const DEFAULT_FLOW_field_SCALE_INTERVAL = 0.0001;
let flow_field_scale = DEFAULT_FLOW_FIELD_SCALE;

const DEFAULT_FLOW_FIELD_LINE_LENGTH = 30;
const DEFAULT_FLOW_FIELD_LINE_LENGTH_MIN = 1;
const DEFAULT_FLOW_FIELD_LINE_LENGTH_MAX = 200;
const DEFAULT_FLOW_FIELD_LINE_LENGTH_INTERVAL = 1;
let flow_field_line_length = DEFAULT_FLOW_FIELD_LINE_LENGTH;

const DEFAULT_FLEX_FLOW_FIELD_LINE_TO_CELL = true;
let flex_flow_field_line_to_cell =
  DEFAULT_FLEX_FLOW_FIELD_LINE_TO_CELL;

const DEFAULT_SHOW_FLOW_FIELD_LINES = false;
let show_flow_field_lines = DEFAULT_SHOW_FLOW_FIELD_LINES;

const DEFAULT_SHOW_FLOW_FIELD_ARROW_HEAD = false;
let show_flow_field_arrow_head = DEFAULT_SHOW_FLOW_FIELD_ARROW_HEAD;

const DEFAULT_SHOW_FLOW_FIELD_THROUGH_CENTER = true;
let show_flow_field_through_center = DEFAULT_SHOW_FLOW_FIELD_THROUGH_CENTER;

const DEFAULT_FLOW_FIELD_COLOR = [180, 180, 180];
let flow_field_color = DEFAULT_FLOW_FIELD_COLOR;

function default_flow_field_callback(grid = null) {
  if (grid === null) {
    grid = default_grid_callback();
  }

  let flow_field = new CustomFlowField(grid, flow_field_scale);

  if (show_flow_field_lines) {
    stroke(flow_field_color);

    if (flex_flow_field_line_to_cell) {
      length = null;
    } else {
      length = flow_field_line_length;
    }

    flow_field.drawFlowField(
      show_flow_field_lines,
      show_flow_field_arrow_head,
      show_flow_field_through_center,
      length,
    );
  }
}

function create_default_flow_field_settings(main_draw, options = {}) {
  const get = (param, key, fallback) => options[param]?.[key] ?? fallback;

  flow_field_scale = get(
    "flow_field_scale",
    "default",
    DEFAULT_FLOW_FIELD_SCALE,
  );
  flow_field_line_length = get(
    "flow_field_line_length",
    "default",
    DEFAULT_FLOW_FIELD_LINE_LENGTH,
  );
  flex_flow_field_line_to_cell = get(
    "flex_flow_field_line_to_cell",
    "default",
    DEFAULT_FLEX_FLOW_FIELD_LINE_TO_CELL,
  );
  show_flow_field_lines = get(
    "show_flow_field_lines",
    "default",
    DEFAULT_SHOW_FLOW_FIELD_LINES,
  );
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
      show_flow_field_lines: {
        type: BOOLEAN_PARAMETER,
        default: get(
          "show_flow_field_lines",
          "default",
          DEFAULT_SHOW_FLOW_FIELD_LINES,
        ),
        callback: function (value) {
          show_flow_field_lines = value;
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
      flex_flow_field_line_to_cell: {
        type: BOOLEAN_PARAMETER,
        default: get(
          "flex_flow_field_line_to_cell",
          "default",
          DEFAULT_FLEX_FLOW_FIELD_LINE_TO_CELL,
        ),
        callback: function (value) {
          flex_flow_field_line_to_cell = value;
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
      flow_field_line_length: {
        type: RANGE_PARAMETER,
        default: get(
          "flow_field_line_length",
          "default",
          DEFAULT_FLOW_FIELD_LINE_LENGTH,
        ),
        min: get(
          "flow_field_line_length",
          "min",
          DEFAULT_FLOW_FIELD_LINE_LENGTH_MIN,
        ),
        max: get(
          "flow_field_line_length",
          "max",
          DEFAULT_FLOW_FIELD_LINE_LENGTH_MAX,
        ),
        interval: get(
          "flow_field_line_length",
          "interval",
          DEFAULT_FLOW_FIELD_LINE_LENGTH_INTERVAL,
        ),
        callback: function (value) {
          flow_field_line_length = value;
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
