import * as d3 from 'd3';
export default class Task {
  constructor(currentStart, currentWidth, planStart, planWidth, initialPlanStart, initialPlanWidth, y, height, progress) {
    
    this.currentStart = currentStart;
    this.currentWidth = currentWidth;
    this.planStart = planStart;
    this.planWidth = planWidth;
    this.initialPlanStart = initialPlanStart;
    this.initialPlanWidth = initialPlanWidth;
    this.height = height;
    this.progress = progress;
    // this.x = isNaN(x) ? 0 : x;
    this.y = y;
  }
  render() {
    let containElement = document.createElementNS(d3.namespaces.svg, 'g');
    let taskContainer = d3.select(containElement)
      .attr('class', 'task')
      .attr('transform', `translate(0,${this.y})`);

    // render plans
    let plans = taskContainer.append('rect')
      .attr('class', 'plans')
      .attr('x',`${this.planStart}`)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', 'orange')
      .attr('fill', 'orange')
      .attr('opacity', 1)
      .attr('transform', `translate(0,${this.height + 2})`)
      .transition().duration(1000)
      .attr('width', (d) => this.planWidth);

      // render init plan
    let initPlan = taskContainer.append('rect')
    .attr('class', 'init-plans')
    .attr('x',`${this.initialPlanStart}`)
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('width', 0)
    .attr('height', this.height)
    .attr('stroke', '#000000')
    .attr('stroke-width', '1')
    .attr('stroke-dasharray', '5,5')
    .attr('fill', 'none')
    .attr('transform', `translate(0,${this.height + 2})`)
    .transition().duration(1000)
    .attr('width', (d) => this.initialPlanWidth)
    .attr('opacity', 1);
    // render progress bar
    // let progress = taskContainer.append('rect')
    //   .attr('class', 'progress')
    //   .attr('x',`${this.planStart}`)
    //   .attr('rx', 3)
    //   .attr('ry', 3)
    //   .attr('width', 0)
    //   .attr('height', this.height)
    //   .attr('stroke', 'none')
    //   .attr('fill', '#2b3a6a')
    //   .attr('transform', `translate(0,${this.height + 2})`)
    //   .transition().duration(1000)
    //   .attr('width', (d) => this.progress);

    // render current
    let current = taskContainer.append('rect')
      .attr('class', 'current')
      .attr('x',`${this.initialPlanStart}`)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', '#2b3a6a')
      .attr('stroke-width', '1')
      .attr('fill', '#2b3a6a')
      .attr('transform', `translate(0,${2*this.height + 4})`)
      .transition().duration(1000)
      .attr('width', (d) => this.currentWidth)
      .attr('opacity', 1);

    // let current = taskContainer.append('line')
    //   .attr('class', 'current')
    //   .attr('stroke', '#2b3a6a')
    //   .attr('stroke-width', '10')
    //   // .attr('stroke-dasharray', '5,5')
    //   .attr("x1", `${this.currentStart}`)
    //   .attr("y1", 0)
    //   .attr("x2", `${this.currentStart}`)
    //   .attr("y2", 0)
    //   .attr('shape-rendering','crispEdges')
    //   .attr('transform', `translate(0,${2*this.height + 4})`)
    //   .transition().duration(1000)
    //   .attr("x2", `${this.currentStart + this.currentWidth}`);

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
