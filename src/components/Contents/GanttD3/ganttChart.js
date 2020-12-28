import * as d3 from 'd3';
import GroupTasks from './groupTasks';
import TasksList from './tasksList';

export default class GanttChart {
  constructor(containerElement, width, height) {
    this.margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    };
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;
    this.svg = d3.select(containerElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#f5f5f5')
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }
  render(data) {
    let gap = 24;
    let categories = data.map((d) => d.type);
    categories = checkUnique(categories);
    let colorScale = d3.scaleLinear().domain([0, categories.length]).range(['#00B9FA', '#F95002']).interpolate(d3.interpolateHcl);

    let dateFormat = d3.timeParse('%Y-%m-%d');
    let timeScale = d3
      .scaleTime()
      .domain([
        d3.min(data, function (d) {
          return dateFormat(d.startTime);
        }),
        d3.max(data, function (d) {
          return dateFormat(d.endTime);
        }),
      ])
      .range([0, this.width]);

    // axisX
    this.axisX = d3
      .axisTop()
      .scale(timeScale)
      .ticks(d3.timeDay.every(1))
      .tickFormat((date) => d3.timeFormat('%Y/%m/%d')(date));

    // render axis X
    this.svg.append('g').attr('class', 'axis').transition().duration(1000).call(this.axisX);

    // render groupTasks
    let groupTasks = this.svg.node().appendChild(new GroupTasks(this.width, gap, data, categories, colorScale).render());

    // render TasksList
    let tasksList = this.svg.node().appendChild(new TasksList(gap, data, categories, timeScale, colorScale).render());

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
}
