import * as d3 from 'd3';
import GroupTasks from './groupTasks';
import TasksList from './tasksList';

export default class GanttChart {
  constructor(containerElement, width, length, from, to) {
    this.gap = 54;
    this.containerElement = containerElement;
    this.margin = {
      top: 40,
      right: 20,
      bottom: 0,
      left: 0,
    };
    this.width = width - this.margin.left - this.margin.right;
    this.height = this.gap * length + this.margin.top;
    this.from = from.format('YYYY-MM-DD');
    this.to = to.format('YYYY-MM-DD');
    this.svg = d3
      .select(containerElement)
      .append('svg')
      .attr('width', width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    this.mainChart = null;
    this.timeScale = null;
    this.groupTasks = null;
    this.tasksList = null;
  }
  render(data) {
    let categories = data.map((d) => d.type);
    categories = checkUnique(categories);

    let dateFormat = d3.timeParse('%Y-%m-%d');
    this.timeScale = d3
      .scaleTime()
      .domain([dateFormat(this.from), dateFormat(this.to)])
      .range([0, this.width]);

    // SubAxis
    this.subAxisX = d3
      .axisTop()
      .scale(this.timeScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat((date) => d3.timeFormat('%Y/%m')(date));
    // render SubAxis
    this.svg
      .append('g')
      .attr('class', 'subAxisX')
      .attr('transform', `translate(0, -20)`)
      .transition()
      .duration(1000)
      .call(this.subAxisX);

    // axisX
    this.axisX = d3
      .axisTop()
      .scale(this.timeScale)
      .ticks(d3.timeDay.every(1))
      .tickSize(-this.height)
      .tickFormat((date) => d3.timeFormat('%d')(date));

    this.mainChart = this.svg.append('g').attr('class', 'main-chart');

    // render groupTasks
    this.groupTasks = new GroupTasks(this.width, this.gap, data, categories);
    // let groupTasks = this.mainChart.node().appendChild(this.groupTasks.render());

    // render TasksList
    this.tasksList = new TasksList(this.gap, data, categories, this.timeScale);
    let tasksList = this.mainChart.node().appendChild(this.tasksList.render());

    // render axis X
    this.svg
      .append('g')
      .attr('class', 'axisX')
      .transition()
      .duration(1000)
      .call(this.axisX)
      .call((g) => {
        g.select('.domain').attr('shape-rendering', 'crispEdges').attr('stroke', 'rgba(0, 0, 0, 0.2)');
        g.selectAll('line').attr('shape-rendering', 'crispEdges').attr('stroke', 'rgba(0, 0, 0, 0.2)');
        g.selectAll('text').attr('transform', 'translate(10,0)');
      });
    let grid = this.svg.append('g');
    grid
      .selectAll('line')
      .data(data)
      .enter()
      .append('line')
      .attr('stroke', 'rgba(0, 0, 0, 0.2)')
      .attr('stroke-width', '1')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', `${this.width}`)
      .attr('y2', 0)
      .attr('shape-rendering', 'crispEdges')
      .attr('transform', (d, i) => `translate(0,${(i + 1) * this.gap})`);

    //add clip path to the svg
    this.mainChart
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
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
    this.svg
      .select('.axisX')
      .call(this.axisX.scale(this.timeScale))
      .call((g) => {
        g.selectAll('line').attr('stroke', 'rgba(0, 0, 0, 0.2)');
      });
    this.svg.select('.subAxisX').call(this.subAxisX.scale(this.timeScale));
    this.tasksList.changeScale(this.timeScale);
  }
}
