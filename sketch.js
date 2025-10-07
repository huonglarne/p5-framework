let DEFAULT_CANVAS_WIDTH = 400;
let canvas_width = DEFAULT_CANVAS_WIDTH;

let DEFAULT_CANVAS_HEIGHT = 400;
let canvas_height = DEFAULT_CANVAS_HEIGHT;

let DEFAULT_TITLE = "Sketch";
let title = DEFAULT_TITLE;

let DEFAULT_N_ROWS = 3;
let n_rows = DEFAULT_N_ROWS;

let DEFAULT_N_COLS = 3;
let n_cols = DEFAULT_N_COLS;

let DEFAULT_CIRCLE_RADIUS = 20;
let circle_radius = DEFAULT_CIRCLE_RADIUS;

let DEFAULT_HORIZONTAL_PADDING = 40;
let horizontal_padding = DEFAULT_HORIZONTAL_PADDING;

let DEFAULT_VERTICAL_PADDING = 40;
let vertical_padding = DEFAULT_VERTICAL_PADDING;

let grid;

function setup() {
    createCanvas(canvas_width, canvas_height);

    grid = prettyGrid.createGrid(
        {
            rows: n_rows,
            cols: n_cols,
            width: canvas_width - (horizontal_padding * 2),
            height: canvas_height - (vertical_padding * 2)
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
                    canvas_width = value;
                    resizeCanvas(canvas_width, canvas_height);
                    grid = prettyGrid.createGrid({
                        rows: n_rows,
                        cols: n_cols,
                        width: canvas_width - (horizontal_padding * 2),
                        height: canvas_height - (vertical_padding * 2)
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
                    canvas_height = value;
                    resizeCanvas(canvas_width, canvas_height);
                    grid = prettyGrid.createGrid({
                        rows: n_rows,
                        cols: n_cols,
                        width: canvas_width - (horizontal_padding * 2),
                        height: canvas_height - (vertical_padding * 2)
                    });
                }
            },
            horizontal_padding: {
                type: RANGE_PARAMETER,
                default: DEFAULT_HORIZONTAL_PADDING,
                min: 0,
                max: 100,
                interval: 5,
                callback: function (value) {
                    horizontal_padding = value;
                    grid = prettyGrid.createGrid({
                        rows: n_rows,
                        cols: n_cols,
                        width: canvas_width - (horizontal_padding * 2),
                        height: canvas_height - (vertical_padding * 2)
                    });
                }
            },
            vertical_padding: {
                type: RANGE_PARAMETER,
                default: DEFAULT_VERTICAL_PADDING,
                min: 0,
                max: 100,
                interval: 5,
                callback: function (value) {
                    vertical_padding = value;
                    grid = prettyGrid.createGrid({
                        rows: n_rows,
                        cols: n_cols,
                        width: canvas_width - (horizontal_padding * 2),
                        height: canvas_height - (vertical_padding * 2)
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
                        width: canvas_width - (horizontal_padding * 2),
                        height: canvas_height - (vertical_padding * 2)
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
                        width: canvas_width - (horizontal_padding * 2),
                        height: canvas_height - (vertical_padding * 2)
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
            },
        },
        "Display Settings"
    );
}

function drawWithPadding(horizontal_padding, vertical_padding, drawCallback) {
    push();
    translate(horizontal_padding, vertical_padding);
    drawCallback();
    pop();
}

function main_draw() {
    let points = grid.getPoints();

    stroke(225);

    print("rows: " + points.length);
    print("cols: " + points[0].length);

    for (let i = 0; i < points.length-1; i++) {
        print("i: " + i);
        for (let j = 0; j < points[i].length-1; j++) {
            print("j: " + j);
            start_point = points[i][j];
            end_point = points[i+1][j+1];
            print("Start Point: ")
            print(start_point);
            print("End Point: ")
            print(end_point);
            line(start_point.x, start_point.y, end_point.x, end_point.y);
        }
    }

    // noFill();

    fill(50)

    grid.draw(
        (point) => {
            circle(point.x, point.y, circle_radius);
        }
    );
}

function draw() {
    background(50);

    frameRate(20);
    // noLoop();

    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
}
