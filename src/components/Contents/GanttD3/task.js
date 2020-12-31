import * as d3 from 'd3';
import PlansBar from './plansBar';
import InitPlansBar from './initPlansBar';
import CurrentBar from './currentBar';
import ToolTip from './toolTip';
export default class Task {
  constructor(currentStart, currentWidth, planStart, planWidth, initialPlanStart, initialPlanWidth, y, height, progress, d, dependence, arrDepend) {
    
    this.currentStart = currentStart;
    this.currentWidth = currentWidth;
    this.planStart = planStart;
    this.planWidth = planWidth;
    this.initialPlanStart = initialPlanStart;
    this.initialPlanWidth = initialPlanWidth;
    this.height = height;
    this.progress = progress;
    this.y = y;
    this.taskDetail = d;
    this.dependence = dependence;
    this.arrDepend = arrDepend;
    this.toolTip = new ToolTip(this.taskDetail, 0, 0);
    document.getElementById('dom').appendChild(this.toolTip.render());

    this.t = 5;
    this.arr = 4;
    this.markerBoxHeight = this.arr;
    this.markerBoxWidth = this.arr*2;
    this.refX = this.markerBoxWidth / 2;
    this.refY = this.markerBoxHeight / 2;
    this.arrowPoints = [[0, 0], [0, this.arr], [this.arr, (this.arr/2)]];
  }
  render() {
    let _y = this.y;
    let _toolTip = this.toolTip;
    let containElement = document.createElementNS(d3.namespaces.svg, 'g');
    let taskContainer = d3.select(containElement)
      .attr('class', 'task')
      .attr('transform', `translate(0,${this.y})`);

    // render plans
    let plans = taskContainer.append(d => new PlansBar(this.planStart, this.planWidth, this.height, this.taskDetail).render());

    // render init plan
    if(this.taskDetail.isTimePlanUpdated) {
      let initPlan = taskContainer.append(d => new InitPlansBar(this.initialPlanStart, this.initialPlanWidth, this.height, this.taskDetail).render());
    }

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
    let current = taskContainer.append(d => new CurrentBar(this.currentStart, this.currentWidth, this.height, this.taskDetail).render());

    if (this.dependence && this.taskDetail.isShow) {
      let x = parseFloat(containElement.children[0].getAttribute('x'));
      let w = parseFloat(containElement.children[0].getAttribute('width'));
      let h = parseFloat(containElement.children[0].getAttribute('height'));
      let startX = x + w;
      let start = [startX, h/2];
      this.dependence.forEach((d, i) => {
        let endX = this.arrDepend[i][0];
        let endY = this.arrDepend[i][2];
        let end = [endX, this.arrDepend[i][2]];
        endX && endY && this.drawBaseline(start, end, taskContainer);
      });
    }

    // event hover
    taskContainer
      .on('mouseout', mouseoutHandle)
      .on('mousemove', mouseMoveHandle);

    function mouseoutHandle() {
      // hidden toolTip
      _toolTip.visible = false;
      _toolTip.render();
    }
    function mouseMoveHandle() {
      let mouse = d3.mouse(this);
      // update toolTip
      _toolTip.setPosition(mouse[0], _y + 50);
      _toolTip.visible = true;
      _toolTip.render();
    }
    return taskContainer.node();
  }

  drawBaseline = (start, end, taskContainer) => {
    // draw arrow
    taskContainer.append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', [0, 0, this.markerBoxWidth, this.markerBoxHeight])
      .attr('refX', this.refX)
      .attr('refY', this.refY)
      .attr('markerWidth', this.markerBoxWidth)
      .attr('markerHeight', this.markerBoxHeight)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', d3.line()(this.arrowPoints))
      .attr('stroke', 'black');
    
    // draw line
    taskContainer.append('path').datum([start, [(start[0]+(this.t*3)), start[1]], [(end[0]-(this.t*3)), end[1]-this.t], [(end[0]), end[1]+(this.t*2)]])
      .classed('baseline', true)
      .style("stroke", "#000")
      .style("stroke-width", "2")
      .style("fill","none")
      .style('pointer-events', 'none')
      .attr('marker-end', 'url(#arrow)')
      .attr('d', 
        d3.line()
          .x((d) => {return d[0];})
          .y((d) => {return d[1];})
          .curve(d3.curveStepBefore)
      );
  }
}
