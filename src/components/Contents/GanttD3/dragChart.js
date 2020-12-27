import * as d3 from 'd3';
export default class DragChart {
  constructor(tasksList, tasksListContainer) {
    this.tasksList = tasksList;
    this.tasksListContainer = tasksListContainer;
    this.target = this.tasksList.selectAll('.task')._groups[0];
    this.tasksListContainer.selectAll('.task')
      // .on("mouseout", (d, i) => {}) // TODO later
      .call(this.dragHandle());
  }

  dragHandle = () => {
    const dragStart = (d, i) => {
      d3.select(this.target[i]).attr("stroke", "black");
    }  
    const dragMove = (d, i) => {
      let x = this.target[i].transform.baseVal[0].matrix.e;
      let y = this.target[i].transform.baseVal[0].matrix.f;
      d3.select(this.target[i]).attr('transform', `translate(${x + d3.event.dx}, ${y})`);
    } 
    const dragend = (d, i) => {
      d3.select(this.target[i]).attr("stroke", null);
    }
    return d3.drag()
        .on("start", dragStart)
        .on("drag", dragMove)
        .on("end", dragend);
  };
}
