import React, { useEffect } from 'react';
import table from '../../../styles/Table.module.scss';

import exp_collapse from '../../../images/toggle_collapse.png';
import exp_expand from '../../../images/toggle_expand.png';
import plus_sign from '../../../images/plus.png';

const GanttTable = ({ ...props }) => {
  useEffect(() => {}, []);
  let currentGroup = '';

  return (
    <table className={table.taskTable}>
      <thead>
        <tr>
          <th>グループ</th>
          <th>タスク</th>
          <th>進捗</th>
          <td>
            <div className={`${table.flexCenter} ${table.justifyCenter}`}>
              <img
                className={table.pointerCursor}
                src={plus_sign}
                alt="Add Task"
                onClick={(e) => props.toggleModal(e,'create')}
              />
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
              <tr key={key} className={table.hoverRow}>
                {td}
                <td style={{ paddingLeft: (element.level - 1) * 20 + 5 + 'px' }}>
                  <div className={table.flexCenter} onDoubleClick={(e) => props.toggleModal(e,'update', element.id)}>
                    {element.hasChild ? (
                      <span
                        id={element.id}
                        className={table.expController}
                        onClick={props.handleCollapse}>
                        <img src={!element.collapsed ? exp_collapse : exp_expand} alt="expController" />
                      </span>
                    ) : (
                      <span className={table.emptyController}></span>
                    )}
                    <span>{element.task}</span>
                  </div>
                </td>
                <td className={table.textCenter}>{element.progress}%</td>
                <td>
                  <div className={`${table.flexCenter} ${table.justifyCenter}`}>
                    <img
                      className={table.pointerCursor}
                      src={plus_sign}
                      alt="Add Task"
                      onClick={(e) => props.toggleModal(e, 'create', element.id)}
                    />
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
