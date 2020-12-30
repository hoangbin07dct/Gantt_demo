import * as d3 from 'd3';
export default class DragChart {
  constructor(tasksList, tasksListContainer) {
    this.tasksList = tasksList;
    this.tasksListContainer = tasksListContainer;
    this.target = this.tasksList.selectAll('.task')._groups[0];
    this.resizeMargin = 10;
    this.resize = true;
    this.drag = true;
    this.tasksListContainer.selectAll('.task')
      .on("mousemove", (d, i) => {this.typeHandle(d, i)})
      .call(this.dragHandle());
  }

  dragHandle = () => {
    const dragStart = (d, i) => {
      d3.select(this.target[i]).attr("stroke", "black");
    }  
    const dragMove = (d, i) => {
      let x = this.target[i].transform.baseVal[0].matrix.e,
          y = this.target[i].transform.baseVal[0].matrix.f,
          w = this.target[i].getBoundingClientRect().width,
          x1 = x + w;
      
      if ((x + this.resizeMargin >= d3.event.x) || (x1 - this.resizeMargin <= d3.event.x)) {
        // console.log(this.target[i].children[0]);
        this.resizeHandle(x, x1, w, this.target[i], y);
      }
      else {
        d3.select(this.target[i]).attr('transform', `translate(${x + d3.event.dx}, ${y})`);
      }
    } 
    const dragend = (d, i) => {
      d3.select(this.target[i]).attr("stroke", null);
    }
    return d3.drag()
      .on("start", dragStart)
      .on("drag", dragMove)
      .on("end", dragend);
  };

  typeHandle = (d, i) => {
    // let x = this.target[i].transform.baseVal[0].matrix.e,
    //     w = this.target[i].getBoundingClientRect().width,
    //     x1 = x + w;
    // if ((x + this.resizeMargin >= d3.mouse(this.target[i])[0] + x) || (x1 - this.resizeMargin <= d3.mouse(this.target[i])[0] + x)) {
    //   d3.select(this.target[i]).attr("class", d.class + ((this.resize) ? " cursor-resize" : " cursor-default"));
    // } else {
    //   d3.select(this.target[i]).attr("class", d.class + ((this.drag) ? " cursor-move" : " cursor-default"));
    // }
  };

  resizeHandle = (x, x1, w, target, y) => {
    if (x + this.resizeMargin >= d3.event.x && x <= x1 - this.resizeMargin) {
      d3.select(target)
        .attr('transform', `translate(${x + d3.event.dx}, ${y})`);
      d3.select(target.children[0])
        .attr("width", w - d3.event.dx);
      return;
    }
    if (x1 - this.resizeMargin <= d3.event.x && x + 5 <= x1) {
      d3.select(target.children[0])
        .attr("width", w + d3.event.dx);
      return;
    }
  }
}
