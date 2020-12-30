import React, { useEffect } from 'react';
import table from '../../../styles/Table.module.scss';

import exp_collapse from '../../../images/toggle_collapse.png';
import exp_expand from '../../../images/toggle_expand.png';
import plus_sign from '../../../images/plus.png';

console.log(exp_collapse);

const GanttTable = ({ ...props }) => {
  useEffect(() => {
    console.log(props);
  }, []);

  let group = props.data;

  let currentGroup = '';

  return (
    <table className={table.taskTable}>
      <thead>
        <tr>
          <th>Group</th>
          <th>Task Name</th>
          <th>Progress</th>
          <td>
            <div className={`${table.flexCenter} ${table.justifyCenter}`}>
              <img src={plus_sign} alt="Add Task" />
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        {props.data.map((element, key) => {
          let td;

          if (element.type !== currentGroup) {
            currentGroup = element.type;
            td = (
              <td
                className={table.vertAlign}
                rowSpan={props.data.filter((el) => el.type === currentGroup && el.isShow).length}>
                {element.type}
              </td>
            );
          }
          return (
            element.isShow && (
              <tr key={key}>
                {td}
                <td style={{ paddingLeft: (element.level - 1) * 20 + 5 + 'px' }}>
                  <div className={table.flexCenter}>
                    {element.hasChild ? (
                      <span id={element.id} className={table.expController} onClick={props.handleCollapse}>
                        <img src={!element.collapsed ? exp_collapse : exp_expand} alt="expController" />
                      </span>
                    ) : (
                      <span className={table.emptyController}></span>
                    )}
                    <span>{element.task}</span>
                  </div>
                </td>
                <td>{element.progress}%</td>
                <td>
                  <div className={`${table.flexCenter} ${table.justifyCenter}`}>
                    <img src={plus_sign} alt="Add Task" />
                  </div>
                </td>
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
};
export default GanttTable;
