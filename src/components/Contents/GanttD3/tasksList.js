import * as d3 from 'd3';
import Task from './task';
export default class TasksList {
  constructor(gap, data, categories, timeScale, colorScale) {
    this.gap = gap;
    this.data = data;
    this.categories = categories;
    this.timeScale = timeScale;
    this.colorScale = colorScale;
    
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
      let color;
      for (var i = 0; i < this.categories.length; i++) {
        if (d.type == this.categories[i]) {
          color = d3.rgb(this.colorScale(i));
        }
      }
      return new Task(x, y, width, height, color).render();
    });

    return tasksListContainer.node();
  }
}
