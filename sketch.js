let num_circles = 1;

let circle_size = 100;

let color = [255, 60, 70];

let title = "My Sketch";

function setup() {
    createCanvas(400, 400);

    createParameterGroup(
        {
            width: {
                type: 'range',
                default: 400,
                min: 0,
                max: 800,
                interval: 10,
                callback: function (value) {
                    width = value;
                    resizeCanvas(width, height);
                }
            },
            height: {
                type: 'range',
                default: 400,
                min: 0,
                max: 800,
                interval: 10,
                callback: function (value) {
                    height = value;
                    resizeCanvas(width, height);
                }
            },
            title: {
                type: 'input',
                default: "My Sketch",
                callback: function (value) { title = value; }
            }
        },
        "Canvas Settings"
    );

    createParameterGroup(
        {
            num_circles: {
                type: 'range',
                default: 1,
                min: 1,
                max: 5,
                interval: 1,
                callback: function (value) { num_circles = value; }
            },
            circle_size: {
                type: 'range',
                default: 100,
                min: 10,
                max: 300,
                interval: 5,
                callback: function (value) { circle_size = value; }
            },
            color: {
                type: 'color',
                default: [255, 60, 70],
                callback: function (colorArray) { color = colorArray; }
            }
        },
        "Main Parameters"
    );
}

function draw() {
    background(220);

    fill(color[0], color[1], color[2]);
    noStroke();

    for (let i = 0; i < num_circles; i++) {
        let angle = map(i, 0, num_circles, 0, TWO_PI);
        let x = width / 2 + cos(angle) * 100;
        let y = height / 2 + sin(angle) * 100;
        ellipse(x, y, circle_size, circle_size);
    }
}
