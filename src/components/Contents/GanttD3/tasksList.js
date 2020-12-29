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
      let x = this.timeScale(dateFormat(d.startTime));
      let y = i * this.gap + 2;
      let width = this.timeScale(dateFormat(d.endTime)) - this.timeScale(dateFormat(d.startTime));
      let height = this.gap - 4;
      let progress = width * d.progress/100;
      return new Task(x, y, width, height, progress).render();
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
