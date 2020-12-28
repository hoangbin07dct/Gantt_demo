import * as d3 from 'd3';
export default class DragChart {
  constructor(tasksList, tasksListContainer) {
    this.tasksList = tasksList;
    this.tasksListContainer = tasksListContainer;
    this.target = this.tasksList.selectAll('.task')._groups[0];
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

  render() {
    let test = this.tasksListContainer.selectAll('.task')
      .on("mouseover", (d, i) => {d3.select(this.target[i]).style("cursor", "move");})
      // .on("mouseout", (d, i) => {}) // TODO later
      .call(this.dragHandle());
    return test.node();
  }
}
