class CustomGrid {
  constructor(origin_x, origin_y, width, height, n_cells_horizontal, n_cells_vertical) {
    this.origin_x = origin_x;
    this.origin_y = origin_y;
    this.width = width;
    this.height = height;
    this.n_cells_horizontal = n_cells_horizontal;
    this.n_cells_vertical = n_cells_vertical;

    this.cell_width = width / n_cells_horizontal;
    this.cell_height = height / n_cells_vertical;

    this.n_rows_inner = n_cells_vertical;
    this.n_cols_inner = n_cells_horizontal;

    this.n_rows_outer = n_cells_vertical + 1;
    this.n_cols_outer = n_cells_horizontal + 1;

    this.inner_grid = prettyGrid.createGrid({
      rows: this.n_rows_inner,
      cols: this.n_cols_inner,
      width: width - this.cell_width,
      height: height - this.cell_height,
    });

    this.inner_points = this.inner_grid.getPoints();

    this.outer_grid = prettyGrid.createGrid({
      rows: this.n_rows_outer,
      cols: this.n_cols_outer,
      width: width,
      height: height,
    });

    this.outer_points = this.outer_grid.getPoints();
  }

  drawOuterGridLines() {
    push();
    translate(this.origin_x, this.origin_y);
    draw_grid_lines(this.outer_points);
    pop();
  }

  drawInnerGridLines() {
    push();
    translate(this.origin_x + this.cell_width / 2, this.origin_y + this.cell_height / 2);
    draw_grid_lines(this.inner_points);
    pop();
  }

  drawOuterCorners() {
    push();
    translate(this.origin_x, this.origin_y);
    this.outer_grid.draw(
      point => ellipse(point.x, point.y, 2, 2),
    );
    pop();
  }

  drawInnerCorners() {
    push();
    translate(this.origin_x + this.cell_width / 2, this.origin_y + this.cell_height / 2);
    this.inner_grid.draw(
      point => ellipse(point.x, point.y, 2, 2),
    );
    pop();
  }

}