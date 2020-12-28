import * as d3 from 'd3';
export default class GroupTasks {
  constructor(width, gap, data, categories, colorScale) {
    this.width = width;
    this.gap = gap;
    this.data = data;
    this.categories = categories;
    this.colorScale = colorScale;
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
        for (var i = 0; i < this.categories.length; i++) {
          if (d.type == this.categories[i]) {
            return d3.rgb(this.colorScale(i));
          }
        }
      })
      .attr('opacity', 0.2);
    return groupTasksContainer.node();
  }
}
