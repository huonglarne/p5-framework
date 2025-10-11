class CustomFlowField {
  constructor(grid, flow_field_scale) {
    this.grid = grid;
    this.flow_field_scale = flow_field_scale;
  }

  drawFlowField(
    show_flow_field_lines = true,
    show_flow_field_arrow_head = true,
    show_flow_field_through_center = true,
    length = null,
  ) {
    this.grid.inInnerGridContext(() => {
      this.grid.inner_grid.draw((point) => {
        let x1, y1, x2, y2, angle;

        if (length === null) {
          ({ x1, y1, x2, y2, angle } =
            calculate_flow_field_arrow_flexing_length(
              point.x,
              point.y,
              this.grid.cell_width,
              this.grid.cell_height,
              show_flow_field_through_center,
            ));
        } else {
          ({ x1, y1, x2, y2, angle } =
            calculate_flow_field_arrow_constant_length(
              point.x,
              point.y,
              length,
              show_flow_field_through_center,
            ));
        }

        if (show_flow_field_lines) {
          line(x1, y1, x2, y2);
        }
        if (show_flow_field_arrow_head) {
          draw_arrowhead(x2, y2, angle);
        }
      });
    });
  }
}
