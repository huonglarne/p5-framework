function drawWithPadding(horizontal_padding, vertical_padding, drawCallback) {
    push();
    translate(horizontal_padding, vertical_padding);
    drawCallback();
    pop();
}