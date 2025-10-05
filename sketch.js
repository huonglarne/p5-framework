let num_circles = 1;

let circle_size = 100;

let color = [255, 60, 70];

let title = "My Sketch";

function setup() {
    createCanvas(400, 400);
    
    background(255);
    
    createParameterGroup({
        num_circles: {
            value: 1, 
            min: 1, 
            max: 10, 
            interval: 1, 
            default: 1,
            callback: function(value) { num_circles = value; }
        },
        circle_size: {
            value: 100, 
            min: 10, 
            max: 300, 
            interval: 5, 
            default: 100,
            callback: function(value) { circle_size = value; }
        },
        color: {
            value: [255, 60, 70], 
            min: 0, 
            max: 255, 
            interval: 1, 
            default: [255, 60, 70],
            type: 'color',
            callback: function(colorArray) { color = colorArray; }
        },
        title: {
            value: "My Sketch",
            default: "My Sketch",
            type: 'input',
            callback: function(value) { title = value; }
        }
    });
}

function draw() {
    background(255);
    
    fill(color[0], color[1], color[2]);
    noStroke();

    for (let i = 0; i < num_circles; i++) {
        let angle = map(i, 0, num_circles, 0, TWO_PI);
        let x = width / 2 + cos(angle) * 100;
        let y = height / 2 + sin(angle) * 100;
        ellipse(x, y, circle_size, circle_size);
    }
}
