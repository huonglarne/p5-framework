class CustomFlowField {
  constructor(
    grid, // CustomGrid,
    flow_field_scale,
    flow_field_arrow_length,
  ) {
    this.grid = grid;
    this.flow_field_scale = flow_field_scale;
    this.flow_field_arrow_length = flow_field_arrow_length;
  }

  drawFlowField() {
    push();
        
    translate(this.grid.origin_x + this.grid.cell_width / 2, this.grid.origin_y + this.grid.cell_height / 2);

    this.grid.inner_grid.draw(
      point => {
        let { x1, y1, x2, y2, angle } = calculate_flow_field_arrow_flexing_length(
            point.x,
            point.y,
            this.grid.cell_width,
            this.grid.cell_height,
            show_flow_field_through_center,
          );

        line(x1, y1, x2, y2);
      }
    )

    pop();
  }
}