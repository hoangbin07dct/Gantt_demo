import * as d3 from 'd3';
import Task from './task';
import DragChart from './dragChart';
import moment from 'moment';
export default class TasksList {
  constructor(gap, data, categories, timeScale) {
    this.gap = gap;
    this.data = data;
    this.categories = categories;
    this.timeScale = timeScale;
    this.tasksListContainer = null;
    this.tasksList = null;

    this.dateFormat = d3.timeParse('%Y-%m-%d');
    this.containElement = document.createElementNS(d3.namespaces.svg, 'g');
    this.tasksListContainer = d3.select(this.containElement).attr('class', 'tasks-list-container');
    this.tasksList = this.tasksListContainer
      .selectAll('g')
      .data(this.data)
      .enter();
  }
  render() {
    this.task();
    // new DragChart(tasksList, this.tasksListContainer);

    return this.tasksListContainer.node();
  }

  task = () => {
    this.tasksList.append((d, i) => {
      const minDate = d3.min([this.dateFormat(d.startTimeCurrent), this.dateFormat(d.startTimePlan), this.dateFormat(d.startTimeInitialPlan)]);
      let x = this.timeScale(minDate);
      let y = i * this.gap + 4;
      let currentStart = this.timeScale(this.dateFormat(d.startTimeCurrent))
      let planStart = this.timeScale(this.dateFormat(d.startTimePlan))
      let initialPlanStart = this.timeScale(this.dateFormat(d.startTimeInitialPlan))
      let currentWidth = this.timeScale(d3.timeDay.offset(this.dateFormat(d.endTimeCurrent), 1)) - this.timeScale(this.dateFormat(d.startTimeCurrent));
      let planWidth = this.timeScale(d3.timeDay.offset(this.dateFormat(d.endTimePlan), 1)) - this.timeScale(this.dateFormat(d.startTimePlan));
      let initialPlanWidth = this.timeScale(d3.timeDay.offset(this.dateFormat(d.endTimeInitialPlan), 1)) - this.timeScale(this.dateFormat(d.startTimeInitialPlan));
      let height = 20;
      let progress = planWidth * d.progress/100;
      let dependence = null;
      let arrDepend = [];
      let planStartChild = null;
      let planWidthChild = null;
      let yChild = null;
      if (d.dependence) {
        dependence = d.dependence;
        dependence.forEach((d, i) => {
          const test = this.data.find((a) => a.id === d);
          planStartChild = test && this.timeScale(this.dateFormat(test.startTimePlan));
          planWidthChild = test && this.timeScale(d3.timeDay.offset(this.dateFormat(test.endTimePlan), 1)) - this.timeScale(this.dateFormat(test.startTimePlan));
          yChild = test && (this.data.indexOf(test) * this.gap + 4) - y;
          arrDepend.push([planStartChild, planWidthChild, yChild]);
        });
      }
      return new Task(currentStart, currentWidth, planStart, planWidth, initialPlanStart, initialPlanWidth, y, height, progress, d, dependence, arrDepend).render();
    });
  }

  changeScale(timeScale) {
    this.timeScale = timeScale;
    this.containElement.innerHTML = "";
    this.task();
    
    // TODO later
    // this.tasksListContainer
    //   .selectAll('.init-plans')
    //   .data(this.data)
    //   .attr('x', d => this.timeScale(this.dateFormat(d.startTimeInitialPlan)))
    //   .attr('width', (d) => this.timeScale(this.dateFormat(d.endTimeInitialPlan)) - this.timeScale(this.dateFormat(d.startTimeInitialPlan)));
    // this.tasksListContainer
    //   .selectAll('.plans')
    //   .data(this.data)
    //   .attr('x', d => this.timeScale(this.dateFormat(d.startTimePlan)))
    //   .attr('width', (d) => this.timeScale(this.dateFormat(d.endTimePlan)) - this.timeScale(this.dateFormat(d.startTimePlan)));
    // // this.tasksListContainer
    // //   .selectAll('.progress')
    // //   .data(this.data)
    // //   .attr('x', d => this.timeScale(this.dateFormat(d.startTimePlan)))
    // //   .attr('width', (d) => (this.timeScale(this.dateFormat(d.endTimePlan)) - this.timeScale(this.dateFormat(d.startTimePlan))) * d.progress/100);
    // this.tasksListContainer
    //   .selectAll('.current')
    //   .data(this.data)
    //   .attr('x', d => this.timeScale(this.dateFormat(d.startTimeCurrent)))
    //   .attr('width', (d) => this.timeScale(this.dateFormat(d.endTimeCurrent)) - this.timeScale(this.dateFormat(d.startTimeCurrent)));

  }
}
