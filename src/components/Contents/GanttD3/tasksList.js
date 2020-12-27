import * as d3 from 'd3';
import Task from './task';
import DragChart from './dragChart';
export default class TasksList {
  constructor(gap, data, categories, timeScale) {
    this.gap = gap;
    this.data = data;
    this.categories = categories;
    this.timeScale = timeScale;
    
  }
  render() {
    let dateFormat = d3.timeParse('%Y-%m-%d');
    let containElement = document.createElementNS(d3.namespaces.svg, 'g');
    let tasksListContainer = d3.select(containElement).attr('class', 'tasks-list-container');
    let tasksList = tasksListContainer
      .selectAll('rect')
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

    new DragChart(tasksList, tasksListContainer);

    return tasksListContainer.node();
  }
}
