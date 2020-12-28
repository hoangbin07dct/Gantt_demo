import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
 
export default class Gantt extends Component {
  componentDidMount() {
    // reordering tasks within the whole gantt
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.init(this.ganttContainer);
    gantt.parse(this.props.tasks);
  }
  
  render() {
    return (
      <div
        ref={(input) => { this.ganttContainer = input }}
        style={{width: '100%', height: '100%'}}>
      </div>
    );
  }
}