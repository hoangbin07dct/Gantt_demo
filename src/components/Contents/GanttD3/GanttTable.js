import React, { useEffect } from 'react';
import common from '../../../styles/Common.module.scss';

import exp_collapse from '../../../images/toggle_collapse.png';
import exp_expand from '../../../images/toggle_expand.png';

console.log(exp_collapse);

const GanttTable = ({ ...props }) => {
  useEffect(() => {
    console.log(props);
  }, []);

  let group = props.data;

  let currentGroup = '';

  return (
    <table className={common.taskTable}>
      <thead>
        <tr>
          <th>Group</th>
          <th>Task Name</th>
          <th>Progress</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((element, key) => {
          let td;

          if (element.type !== currentGroup) {
            currentGroup = element.type;
            td = (
              <td className={common.vertAlign} rowSpan={props.data.filter((el) => el.type === currentGroup).length}>
                {element.type}
              </td>
            );
          }
          return (
            <tr key={key}>
              {td}
              <td style={{ paddingLeft: (element.level - 1) * 20 + 5 + 'px' }}>
                <div className={common.flexCenter}>
                  {element.hasChild ? (
                    <span className={common.expController}>
                      <img src={!element.collapsed ? exp_collapse : exp_expand} alt="expController" />
                    </span>
                  ) : <span className={common.emptyController}></span>}
                  <span>{element.task}</span>
                </div>
              </td>
              <td>{element.progress}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default GanttTable;
