import * as d3 from 'd3';
export default class CurrentBar {
  constructor(currentStart, currentWidth, height, d) {
    this.currentStart = currentStart;
    this.currentWidth = currentWidth;
    this.height = height;
    this.taskDetail = d;
  }
  render() {
    let containElement = document.createElementNS(d3.namespaces.svg, 'rect');

    // render current
    let current = d3.select(containElement)
      .attr('class', 'current')
      .attr('x', `${this.currentStart}`)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('height', this.height)
      .attr('stroke', '#2b3a6a')
      .attr('stroke-width', '1')
      .attr('fill', '#2b3a6a')
      .attr('transform', `translate(0,${this.height + 4})`)
      .attr('width', (d) => this.currentWidth)
      .attr('opacity', 1);

    current.on('mouseover', () => {
      current.style('opacity', 0.8);
    });
    current.on('mouseout', () => {
      current.style('opacity', 1);
    });

    return current.node();
  }
}
