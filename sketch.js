let DEFAULT_CANVAS_WIDTH = 400;
let canvas_width = DEFAULT_CANVAS_WIDTH;

let DEFAULT_CANVAS_HEIGHT = 400;
let canvas_height = DEFAULT_CANVAS_HEIGHT;

let DEFAULT_RANDOM_SEED = 1;
let random_seed = DEFAULT_RANDOM_SEED;

let DEFAULT_TITLE = "Sketch";
let title = DEFAULT_TITLE;

let DEFAULT_N_ROWS = 20;
let n_rows = DEFAULT_N_ROWS;

let DEFAULT_N_COLS = 20;
let n_cols = DEFAULT_N_COLS;

let DEFAULT_CIRCLE_RADIUS = 10;
let circle_radius = DEFAULT_CIRCLE_RADIUS;

let DEFAULT_HORIZONTAL_PADDING = 40;
let horizontal_padding = DEFAULT_HORIZONTAL_PADDING;

let DEFAULT_VERTICAL_PADDING = 40;
let vertical_padding = DEFAULT_VERTICAL_PADDING;

let grid;

function setup() {
    createCanvas(canvas_width, canvas_height);

    randomSeed(random_seed);

    grid = prettyGrid.createGrid(
        {
            rows: n_rows,
            cols: n_cols,
            width: canvas_width - (horizontal_padding * 2),
            height: canvas_height - (vertical_padding * 2)
        }
    )

    drawWithPadding(horizontal_padding, vertical_padding, main_draw);

    createParameterGroup(
        {
            seed: {
                type: RANDOM_PARAMETER,
                default: DEFAULT_RANDOM_SEED,
                min: 1,
                max: 1000,
                callback: function (value) {
                    random_seed = value;
                    randomSeed(random_seed);
                    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
                }
            },
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
                    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
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
                    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
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
                    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
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
                    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
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
                    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
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
                    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
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
                callback: function (value) {
                    circle_radius = value;
                    drawWithPadding(horizontal_padding, vertical_padding, main_draw);
                }
            },
        },
        "Display Settings"
    );
}

function main_draw() {
    background(50);

    let points = grid.getPoints();

    stroke(225);

    print("rows: " + points.length);
    print("cols: " + points[0].length);

    for (let i = 0; i < points.length - 1; i++) {
        print("i: " + i);
        for (let j = 0; j < points[i].length - 1; j++) {
            print("j: " + j);

            probability = random(0, 1);

            if (probability < 0.5) {
                start_point = points[i][j + 1];
                end_point = points[i + 1][j];
            }

            else if (probability >= 0.5) {
                start_point = points[i][j];
                end_point = points[i + 1][j + 1];
            }

            line(start_point.x, start_point.y, end_point.x, end_point.y);
        }
    }

    // noFill();
    fill(50)

    grid.draw(
        (point) => {
            probability = random(0, 1);

            if (probability < 0.5) {
                circle(point.x, point.y, circle_radius);
            }
            
        }
    );
}

function draw() {
    frameRate(1);
}
