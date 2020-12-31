import * as d3 from 'd3';
import PlansBar from './plansBar';
import InitPlansBar from './initPlansBar';
import CurrentBar from './currentBar';
import ToolTip from './toolTip';
import FlowChart from './flowChart';
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
  }
  render() {
    let _y = this.y;
    let _toolTip = this.toolTip;
    let containElement = document.createElementNS(d3.namespaces.svg, 'g');
    let taskContainer = d3.select(containElement)
      .attr('class', 'task')
      .attr('transform', `translate(0,${this.y})`);

    // render plans
    taskContainer.append(d => new PlansBar(this.planStart, this.planWidth, this.height, this.taskDetail).render());

    // render init plan
    if(this.taskDetail.isTimePlanUpdated) {
      taskContainer.append(d => new InitPlansBar(this.initialPlanStart, this.initialPlanWidth, this.height, this.taskDetail).render());
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
    taskContainer.append(d => new CurrentBar(this.currentStart, this.currentWidth, this.height, this.taskDetail).render());

    // render flow line
    this.flowChart = new FlowChart(taskContainer, containElement, this.dependence, this.taskDetail, this.arrDepend);
    this.flowChart.init();

    // event hover
    taskContainer
      .on('mouseout', mouseoutHandle)
      .on('mousemove', mouseMoveHandle);

    // hidden toolTip
    function mouseoutHandle() {
      _toolTip.visible = false;
      _toolTip.render();
    }

    // update toolTip
    function mouseMoveHandle() {
      let mouse = d3.mouse(this);
      _toolTip.setPosition(mouse[0], _y + 50);
      _toolTip.visible = true;
      _toolTip.render();
    }

    return taskContainer.node();
  }
}
