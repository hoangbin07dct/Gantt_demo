import * as d3 from 'd3';
export default class Task {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  render() {
    let containElement = document.createElementNS(d3.namespaces.svg, 'rect');
    let task = d3.select(containElement).attr('class', 'task')
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('x', (d) => {
      return this.x;
    })
    .attr('y', (d) => {
      return this.y;
    })
    .attr('width', 0)
    .attr('height', this.height)
    .attr('stroke', 'none')
    .attr('fill', (d) => this.color)
    .transition().duration(1000)
    .attr('width', (d) => this.width);
    return task.node();
  }
}
