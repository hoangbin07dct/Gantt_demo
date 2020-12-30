import * as d3 from 'd3';
export default class InitPlansBar {
  constructor(initialPlanStart, initialPlanWidth, height, d) {
    this.initialPlanStart = initialPlanStart;
    this.initialPlanWidth = initialPlanWidth;
    this.height = height;
    this.taskDetail = d;
  }
  render() {
    let containElement = document.createElementNS(d3.namespaces.svg, 'rect');

    // render plans
    let initPlans = d3.select(containElement)
      .attr('class', 'init-plans')
      .attr('x', `${this.initialPlanStart}`)
      // .attr('rx', 3)
      // .attr('ry', 3)
      .attr('box-sizing', 'border-box')
      .attr('height', this.height)
      .attr('stroke', '#000000')
      .attr('stroke-width', '1')
      .attr('stroke-dasharray', '8,8')
      .attr('fill', 'none')
      .style('pointer-events', 'none')
      .attr('width', (d) => this.initialPlanWidth)
      .attr('opacity', 1);

    return initPlans.node();
  }
}
