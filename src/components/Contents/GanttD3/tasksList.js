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
      let currentEnd = this.timeScale(dateFormat(d.endTimeCurrent))
      let planStart = this.timeScale(dateFormat(d.startTimePlan))
      let planEnd = this.timeScale(dateFormat(d.endTimePlan))
      let initialPlanStart = this.timeScale(dateFormat(d.startTimeInitialPlan))
      let initialPlanEnd = this.timeScale(dateFormat(d.endTimeInitialPlan))
      let currentWidth = this.timeScale(dateFormat(d.endTimeCurrent)) - this.timeScale(dateFormat(d.startTimeCurrent));
      let planWidth = this.timeScale(dateFormat(d.endTimePlan)) - this.timeScale(dateFormat(d.startTimePlan));
      let initialPlanWidth = this.timeScale(dateFormat(d.endTimeInitialPlan)) - this.timeScale(dateFormat(d.startTimeInitialPlan));
      let height = this.gap/4;
      let progress = planWidth * d.progress/100;
      return new Task(currentStart, currentWidth, planStart, planWidth, initialPlanStart, initialPlanWidth, x, y , height, progress).render();
    });

    // console.log(this.tasksListContainer.selectAll('g')); 
    new DragChart(tasksList, this.tasksListContainer);

    return this.tasksListContainer.node();
  }
  changeScale(timeScale) {
    let dateFormat = d3.timeParse('%Y-%m-%d');
    this.timeScale = timeScale;
    let tasksList = this.tasksListContainer
      .selectAll('.task')
      .data(this.data)
      .attr('transform', (d,i) => `translate(${this.timeScale(dateFormat(d.startTime))},${i * this.gap + 2})`);
    this.tasksListContainer
      .selectAll('.plans')
      .data(this.data)
      .attr('width', (d) => this.timeScale(dateFormat(d.endTime)) - this.timeScale(dateFormat(d.startTime)));

    this.tasksListContainer
      .selectAll('.progress')
      .data(this.data)
      .attr('width', (d) => (this.timeScale(dateFormat(d.endTime)) - this.timeScale(dateFormat(d.startTime))) * d.progress/100);
  }
}
