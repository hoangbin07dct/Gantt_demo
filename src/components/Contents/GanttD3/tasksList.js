import * as d3 from 'd3';
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
    let task = tasksList.append('rect')
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('x', (d) => {
      return this.timeScale(dateFormat(d.startTime));
    })
    .attr('y', (d, i) => {
      return i * this.gap;
    })
    .attr('width', 0)
    .attr('height', this.gap - 4)
    .attr('stroke', 'none')
    .attr('fill', (d) => {
      for (var i = 0; i < this.categories.length; i++) {
        if (d.type == this.categories[i]) {
          return d3.rgb(this.colorScale(i));
        }
      }
    })
    .transition().duration(1000)
    .attr('width', (d) => {
      return this.timeScale(dateFormat(d.endTime)) - this.timeScale(dateFormat(d.startTime));
    });
    return tasksListContainer.node();
  }
}
