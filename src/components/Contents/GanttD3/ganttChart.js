import * as d3 from 'd3';
import GroupTasks from './groupTasks';
import TasksList from './tasksList';

export default class GanttChart {
  constructor(containerElement, width, height, from, to) {
    this.containerElement = containerElement;
    this.margin = {
      top: 50,
      right: 40,
      bottom: 50,
      left: 40,
    };
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;
    this.from = from.format('YYYY-MM-DD');
    this.to = to.format('YYYY-MM-DD');
    this.svg = d3.select(containerElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    this.mainChart = null;
    this.timeScale = null;
    this.groupTasks = null;
    this.tasksList = null;
  }
  render(data) {
    let gap = 24;
    let categories = data.map((d) => d.type);
    categories = checkUnique(categories);

    let dateFormat = d3.timeParse('%Y-%m-%d');
    this.timeScale = d3
      .scaleTime()
      .domain([dateFormat(this.from), dateFormat(this.to)])
      .range([0, this.width]);

    // axisX
    this.axisX = d3
      .axisTop()
      .scale(this.timeScale)
      .ticks(d3.timeDay.every(1))
      .tickFormat((date) => d3.timeFormat('%d')(date));

    // render axis X
    this.svg.append('g').attr('class', 'axisX').transition().duration(1000).call(this.axisX);

    this.mainChart = this.svg.append('g').attr('class', 'main-chart');

    // render groupTasks
    this.groupTasks = new GroupTasks(this.width, gap, data, categories);
    let groupTasks = this.mainChart.node().appendChild(this.groupTasks.render());

    // render TasksList
    this.tasksList = new TasksList(gap, data, categories, this.timeScale);
    let tasksList = this.mainChart.node().appendChild(this.tasksList.render());

    //add clip path to the svg
    this.mainChart.append('defs').append('clipPath').attr('id', 'clip')
      .append('rect').attr('width', this.width).attr('height', this.height)
      .attr('x', 0)
      .attr('y', 0);
    this.mainChart.selectAll('*').attr('clip-path', 'url(#clip)');

    function checkUnique(arr) {
      let hash = {},
        result = [];
      for (let i = 0, l = arr.length; i < l; ++i) {
        if (!hash.hasOwnProperty(arr[i])) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }
      return result;
    }
  }
  changeScale(from, to) {
    this.from = from.format('YYYY-MM-DD');
    this.to = to.format('YYYY-MM-DD');
    this.timeScale.domain([d3.timeParse('%Y-%m-%d')(this.from), d3.timeParse('%Y-%m-%d')(this.to)]);
    this.svg.select('.axisX')
        .call(this.axisX.scale(this.timeScale));
    this.tasksList.changeScale(this.timeScale);
  }
}
