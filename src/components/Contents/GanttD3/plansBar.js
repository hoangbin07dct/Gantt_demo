import * as d3 from 'd3';
export default class PlansBar {
  constructor(planStart, planWidth, height, d) {
    this.planStart = planStart;
    this.planWidth = planWidth;
    this.height = height;
    this.taskDetail = d;
  }
  render() {
    let containElement = document.createElementNS(d3.namespaces.svg, 'rect');

    // render plans
    let plans = d3.select(containElement)
      .attr('class', 'plans')
      .attr('x',`${this.planStart}`)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('height', this.height)
      .attr('stroke', 'orange')
      .attr('fill', 'orange')
      .attr('opacity', 1)
      .attr('width', (d) => this.planWidth);

    return plans.node();
  }
}
