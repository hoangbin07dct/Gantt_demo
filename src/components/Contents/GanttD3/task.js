import * as d3 from 'd3';
export default class Task {
  constructor(x, y, width, height, progress) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.progress = progress;
  }
  render() {
    let containElement = document.createElementNS(d3.namespaces.svg, 'g');
    let taskContainer = d3.select(containElement)
      .attr('class', 'task')
      .attr('transform', `translate(${this.x},${this.y})`);
    let task = taskContainer.append('rect')
      .attr('class', 'plans')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', '#2b3a6a')
      .attr('fill', '#2b3a6a')
      .transition().duration(1000)
      .attr('width', (d) => this.width)
      .attr('opacity', 0.5);

    // render progress bar
    let progress = taskContainer.append('rect')
      .attr('class', 'progress')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', 'none')
      .attr('fill', '#2b3a6a')
      .transition().duration(1000)
      .attr('width', (d) => this.progress);

    // event hover
    taskContainer.on('mouseover', () => {
      taskContainer.style("cursor", "move");
      taskContainer.style('opacity', 0.7);
    });
    taskContainer.on('mouseout', () => {
      taskContainer.style('opacity', 1);
    });

    return taskContainer.node();
  }
}
