import * as d3 from 'd3';
export default class GroupTasks {
  constructor(width, gap, data, categories) {
    this.width = width;
    this.gap = gap;
    this.data = data;
    this.categories = categories;
    this.render();
  }
  render() {
    let containElement = document.createElementNS(d3.namespaces.svg, 'g');
    let groupTasksContainer = d3.select(containElement).attr('class', 'group-task-container');
    groupTasksContainer
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => {
        return i * this.gap;
      })
      .attr('width', (d) => {
        return this.width;
      })
      .attr('height', this.gap)
      .attr('stroke', 'none')
      .attr('fill', (d) => {
        if(this.categories.indexOf(d.type) % 2 !== 0) {
          return '#C0C7D7';
        } else {
          return '#E0E5F1';
        }
      });
    return groupTasksContainer.node();
  }
}
