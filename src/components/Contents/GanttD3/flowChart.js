import * as d3 from 'd3';

export default class FlowChart {
  constructor(taskContainer, containElement, dependence, taskDetail, arrDepend, tasksListContainer) {
    this.taskContainer = taskContainer;
    this.containElement = containElement;
    this.dependence = dependence;
    this.taskDetail = taskDetail;
    this.arrDepend = arrDepend;
    this.tasksListContainer = tasksListContainer;
    
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
      let hw = this.taskContainer._groups[0][0].transform.baseVal[0].matrix.f;
      this.dependence.forEach((d, i) => {
        let startX = x + w;
        let start = [startX, hw + (h/2)];
        let endX = this.arrDepend[i][0];
        let endY = hw + this.arrDepend[i][2];
        console.log(endY);
        let end = [endX, endY];
        endX && endY && this.drawBaseline(start, end, d);
      });
    }
  }
  
  drawBaseline = (start, end, stt) => {
    let point = [start, [(start[0]+(this.t*3)), start[1]], [(end[0]-(this.t*3)), end[1]-this.t], [(end[0]), end[1]+(this.t*2)]];
    // let point = [start, end];
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
    this.tasksListContainer.insert('path', 'g.task').datum(point)
      .classed('baseline', true)
      .style("stroke", "#000")
      .style("stroke-width", "2")
      .style("fill","none")
      .style('pointer-events', 'none')
      .attr('marker-end', 'url(#arrow)')
      .attr('stt', stt)
      .attr('d', 
        d3.line()
          .x((d) => {return d[0];})
          .y((d) => {return d[1];})
          .curve(d3.curveStepBefore)
      );
  }
}
