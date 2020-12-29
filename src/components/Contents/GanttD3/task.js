import * as d3 from 'd3';
export default class Task {
  constructor(currentStart, currentWidth, planStart, planWidth, initialPlanStart, initialPlanWidth, x, y , height, progress) {
    
    this.currentStart = currentStart;
    this.currentWidth = currentWidth;
    this.planStart = planStart;
    this.planWidth = planWidth;
    this.initialPlanStart = initialPlanStart;
    this.initialPlanWidth = initialPlanWidth;
    this.height = height;
    this.progress = progress;
    this.x = isNaN(x) ? 0 : x;
    this.y = y;
  }
  render() {
    let containElement = document.createElementNS(d3.namespaces.svg, 'g');
    let taskContainer = d3.select(containElement)
      .attr('class', 'task')
      .attr('transform', `translate(${this.x},${this.y})`);

    // render init plan
    let initPlan = taskContainer.append('rect')
      .attr('class', 'plans')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', '#000000')
      .attr('fill', '#000000')
      .attr('transform', `translate(${this.initialPlanStart},0)`)
      .transition().duration(1000)
      .attr('width', (d) => this.planWidth)
      .attr('opacity', 1);

    // render plans
    let plans = taskContainer.append('rect')
      .attr('class', 'plans')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', '#2b3a6a')
      .attr('fill', '#2b3a6a')
      .attr('opacity', 0.5)
      .attr('transform', `translate(${this.planStart},${this.height})`)
      .transition().duration(1000)
      .attr('width', (d) => this.planWidth);

    // render progress bar
    let progress = taskContainer.append('rect')
      .attr('class', 'progress')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', 'none')
      .attr('fill', '#2b3a6a')
      .attr('transform', `translate(${this.planStart},${this.height})`)
      .transition().duration(1000)
      .attr('width', (d) => this.progress);
      
    // render current
    let current = taskContainer.append('rect')
      .attr('class', 'plans')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', 'red')
      .attr('fill', 'red')
      .attr('transform', `translate(${this.currentStart},${2*this.height})`)
      .transition().duration(1000)
      .attr('width', (d) => this.currentWidth)
      .attr('opacity', 1);

    

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
