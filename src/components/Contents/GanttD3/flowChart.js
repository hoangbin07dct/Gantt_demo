import * as d3 from 'd3';

export default class FlowChart {
  constructor(taskContainer, containElement, dependence, taskDetail, arrDepend) {
    this.taskContainer = taskContainer;
    this.containElement = containElement;
    this.dependence = dependence;
    this.taskDetail = taskDetail;
    this.arrDepend = arrDepend;
    
    // arrow setting
    this.t = 5;
    this.arr = 4;
    this.markerBoxHeight = this.arr;
    this.markerBoxWidth = this.arr*2;
    this.refX = this.markerBoxWidth / 2;
    this.refY = this.markerBoxHeight / 2;
    this.arrowPoints = [[0, 0], [0, this.arr], [this.arr, (this.arr/2)]];
  }

  init = () => {
    if (this.dependence && this.taskDetail.isShow) {
      let x = parseFloat(this.containElement.children[0].getAttribute('x'));
      let w = parseFloat(this.containElement.children[0].getAttribute('width'));
      let h = parseFloat(this.containElement.children[0].getAttribute('height'));
      let startX = x + w;
      let start = [startX, h/2];
      this.dependence.forEach((d, i) => {
        let endX = this.arrDepend[i][0];
        let endY = this.arrDepend[i][2];
        let end = [endX, endY];
        endX && endY && this.drawBaseline(start, end);
      });
    }
  }
  
  drawBaseline = (start, end) => {
    let point = [start, [(start[0]+(this.t*3)), start[1]], [(end[0]-(this.t*3)), end[1]-this.t], [(end[0]), end[1]+(this.t*2)]];
    // draw arrow
    this.taskContainer.append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', [0, 0, this.markerBoxWidth, this.markerBoxHeight])
      .attr('refX', this.refX)
      .attr('refY', this.refY)
      .attr('markerWidth', this.markerBoxWidth)
      .attr('markerHeight', this.markerBoxHeight)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', d3.line()(this.arrowPoints))
      .attr('stroke', 'black');
    
    // draw line
    this.taskContainer.insert('path').datum(point)
      .classed('baseline', true)
      .style("stroke", "#000")
      .style("stroke-width", "2")
      .style("fill","none")
      .style('pointer-events', 'none')
      .attr('marker-end', 'url(#arrow)')
      .attr('d', 
        d3.line()
          .x((d) => {return d[0];})
          .y((d) => {return d[1];})
          .curve(d3.curveStepBefore)
      );
  }
}
