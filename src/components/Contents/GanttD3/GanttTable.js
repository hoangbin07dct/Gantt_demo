import React, { useEffect } from 'react';
import common from "../../../styles/Common.module.scss";


const GanttTable = ({ ...props }) => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <table className={common.taskTable}>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((element, key) => {
          return (
            <tr key={key}>
              <td>{element.task}</td>
              <td>100</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default GanttTable;
