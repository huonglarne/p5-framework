let DEFAULT_CANVAS_WIDTH = 400;
let canvas_width = DEFAULT_CANVAS_WIDTH;

let DEFAULT_CANVAS_HEIGHT = 400;
let canvas_height = DEFAULT_CANVAS_HEIGHT;

let DEFAULT_TITLE = "Sketch";
let title = DEFAULT_TITLE;

let DEFAULT_N_ROWS = 7;
let n_rows = DEFAULT_N_ROWS;

let DEFAULT_N_COLS = 7;
let n_cols = DEFAULT_N_COLS;

let DEFAULT_CIRCLE_RADIUS = 20;
let circle_radius = DEFAULT_CIRCLE_RADIUS;

let grid;

function setup() {
    createCanvas(canvas_width, canvas_height);

    grid = prettyGrid.createGrid(
        {
            rows: n_rows,
            cols: n_cols,
            width: canvas_width,
            height: canvas_height
        }
    )

    createParameterGroup(
        {
            title: {
                type: INPUT_PARAMETER,
                default: DEFAULT_TITLE,
                callback: function (value) { title = value; }
            },
            canvas_width: {
                type: RANGE_PARAMETER,
                default: DEFAULT_CANVAS_WIDTH,
                min: 0,
                max: 800,
                interval: 50,
                callback: function (value) {
                    canvas_height = value;
                    resizeCanvas(canvas_height, canvas_width);
                    grid = prettyGrid.createGrid({
                        rows: n_rows,
                        cols: n_cols,
                        width: canvas_width,
                        height: canvas_height
                    });
                }
            },
            canvas_height: {
                type: RANGE_PARAMETER,
                default: DEFAULT_CANVAS_HEIGHT,
                min: 0,
                max: 800,
                interval: 50,
                callback: function (value) {
                    canvas_width = value;
                    resizeCanvas(canvas_height, canvas_width);
                    grid = prettyGrid.createGrid({
                        rows: n_rows,
                        cols: n_cols,
                        width: canvas_width,
                        height: canvas_height
                    });
                }
            }
        },
        "Canvas Settings"
    );

    createParameterGroup(
        {
            n_rows: {
                type: RANGE_PARAMETER,
                default: DEFAULT_N_ROWS,
                min: 1,
                max: 20,
                interval: 1,
                callback: function (value) {
                    n_rows = value;
                    grid = prettyGrid.createGrid({
                        rows: n_rows,
                        cols: n_cols,
                        width: canvas_width,
                        height: canvas_height
                    });
                }
            },
            n_cols: {
                type: RANGE_PARAMETER,
                default: DEFAULT_N_COLS,
                min: 1,
                max: 20,
                interval: 1,
                callback: function (value) {
                    n_cols = value;
                    grid = prettyGrid.createGrid({
                        rows: n_rows,
                        cols: n_cols,
                        width: canvas_width,
                        height: canvas_height
                    });
                }
            }
        },
        "Grid Settings"
    );

    createParameterGroup(
        {
            circle_radius: {
                type: RANGE_PARAMETER,
                default: DEFAULT_CIRCLE_RADIUS,
                min: 1,
                max: 100,
                interval: 1,
                callback: function (value) { circle_radius = value; }
            }
        },
        "Circle Settings"
    );

}

function draw() {
    background(50);

    noFill();
    stroke(225);

    grid.draw(point => ellipse(point.x, point.y, circle_radius) );
}
