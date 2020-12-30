import * as d3 from 'd3';
export default class Task {
  constructor(currentStart, currentWidth, planStart, planWidth, initialPlanStart, initialPlanWidth, y, height, progress, d, group) {
    
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
    this.taskDetail = d;
    this.group = group;
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
      // .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', 'orange')
      .attr('fill', 'orange')
      .attr('opacity', 1)
      // .attr('transform', `translate(0,${this.height + 2})`)
      // .transition().duration(1000)
      .attr('width', (d) => this.planWidth);

      // render init plan
    let initPlan = taskContainer.append('rect')
    .attr('class', 'init-plans')
    .attr('x',`${this.initialPlanStart}`)
    .attr('rx', 3)
    .attr('ry', 3)
    // .attr('width', 0)
    .attr('height', this.height)
    .attr('stroke', '#000000')
    .attr('stroke-width', '1')
    .attr('stroke-dasharray', '5,5')
    .attr('fill', 'none')
    // .attr('transform', `translate(0,${this.height + 2})`)
    // .transition().duration(1000)
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
      .attr('x',`${this.currentStart}`)
      .attr('rx', 3)
      .attr('ry', 3)
      // .attr('width', 0)
      .attr('height', this.height)
      .attr('stroke', '#2b3a6a')
      .attr('stroke-width', '1')
      .attr('fill', '#2b3a6a')
      .attr('transform', `translate(0,${this.height + 4})`)
      // .transition().duration(1000)
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

    // if (this.group) {
    //   // console.log(taskContainer);
    //   console.log(containElement.getBoundingClientRect().width);
    //   let arr = [this.currentStart, this.currentWidth, this.initialPlanStart, this.initialPlanWidth, this.planStart, this.planWidth];
    //   let startX = d3.max(arr) - d3.min(arr);
    //   let startW = d3.max(arr) + (d3.max(arr) - startX);
    //   console.log(startW);
    //   let start = [271, 22];
    //   let end = [57, 78];
    //   this.group.forEach((d, i) => {
    //     // console.log(this);
    //     this.drawBaseline(start, end, taskContainer);
    //   });
    // }

    // event hover
    taskContainer.on('mouseover', () => {
       // taskContainer.style("cursor", "move");
       taskContainer.style("cursor", "move");
       taskContainer.style('opacity', 0.7);
       let tooltip = d3.select(".tooltip");
       tooltip.style('opacity', 1)
       d3.select(".tooltipInner").html(this.taskDetail.task);
       d3.select(".tooltip").style("left", (d3.event.pageX) + "px")        
       .style("top", (d3.event.pageY - 80) + "px");  


    });
    taskContainer.on('mouseout', () => {
      taskContainer.style('opacity', 1);
    });

    return taskContainer.node();
  }

  drawBaseline = (start, end, taskContainer) => {
    taskContainer.append('path').datum([start, end])
      .classed('baseline', true)
      .style("stroke", "#000")
      .style("stroke-width", "2")
      .attr('d', d3.line());
  }
}
