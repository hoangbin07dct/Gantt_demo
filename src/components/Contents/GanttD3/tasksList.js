import * as d3 from 'd3';
import Task from './task';
import DragChart from './dragChart';
export default class TasksList {
  constructor(gap, data, categories, timeScale) {
    this.gap = gap;
    this.data = data;
    this.categories = categories;
    this.timeScale = timeScale;
    this.tasksListContainer = null;
  }
  render() {
    let dateFormat = d3.timeParse('%Y-%m-%d');
    let containElement = document.createElementNS(d3.namespaces.svg, 'g');
    this.tasksListContainer = d3.select(containElement).attr('class', 'tasks-list-container');
    let tasksList = this.tasksListContainer
      .selectAll('g')
      .data(this.data)
      .enter();
    let task = tasksList.append((d,i) => {
      const minDate = d3.min([dateFormat(d.startTimeCurrent), dateFormat(d.startTimePlan), dateFormat(d.startTimeInitialPlan)]);
      let x = this.timeScale(minDate);
      let y = i * this.gap + 2;
      let currentStart = this.timeScale(dateFormat(d.startTimeCurrent))
      let planStart = this.timeScale(dateFormat(d.startTimePlan))
      let initialPlanStart = this.timeScale(dateFormat(d.startTimeInitialPlan))
      let currentWidth = this.timeScale(dateFormat(d.endTimeCurrent)) - this.timeScale(dateFormat(d.startTimeCurrent));
      let planWidth = this.timeScale(dateFormat(d.endTimePlan)) - this.timeScale(dateFormat(d.startTimePlan));
      let initialPlanWidth = this.timeScale(dateFormat(d.endTimeInitialPlan)) - this.timeScale(dateFormat(d.startTimeInitialPlan));
      let height = 10;
      let progress = planWidth * d.progress/100;
      return new Task(currentStart, currentWidth, planStart, planWidth, initialPlanStart, initialPlanWidth, y, height, progress).render();
    });

    // new DragChart(tasksList, this.tasksListContainer);

    return this.tasksListContainer.node();
  }
  changeScale(timeScale) {
    let dateFormat = d3.timeParse('%Y-%m-%d');
    this.timeScale = timeScale;

    this.tasksListContainer
      .selectAll('.init-plans')
      .data(this.data)
      .attr('x', d => this.timeScale(dateFormat(d.startTimeInitialPlan)))
      .attr('width', (d) => this.timeScale(dateFormat(d.endTimeInitialPlan)) - this.timeScale(dateFormat(d.startTimeInitialPlan)));

    this.tasksListContainer
      .selectAll('.plans')
      .data(this.data)
      .attr('x', d => this.timeScale(dateFormat(d.startTimePlan)))
      .attr('width', (d) => this.timeScale(dateFormat(d.endTimePlan)) - this.timeScale(dateFormat(d.startTimePlan)));

    // this.tasksListContainer
    //   .selectAll('.progress')
    //   .data(this.data)
    //   .attr('x', d => this.timeScale(dateFormat(d.startTimePlan)))
    //   .attr('width', (d) => (this.timeScale(dateFormat(d.endTimePlan)) - this.timeScale(dateFormat(d.startTimePlan))) * d.progress/100);

    this.tasksListContainer
      .selectAll('.current')
      .data(this.data)
      .attr('x', d => this.timeScale(dateFormat(d.startTimeCurrent)))
      .attr('width', (d) => this.timeScale(dateFormat(d.endTimeCurrent)) - this.timeScale(dateFormat(d.startTimeCurrent)));
  //   this.tasksListContainer
  //     .selectAll('.current')
  //     .data(this.data)
  //     .attr("x1", d => this.timeScale(dateFormat(d.startTimeCurrent)))
  //     .attr("x2", d => this.timeScale(dateFormat(d.endTimeCurrent)));
  }
}
