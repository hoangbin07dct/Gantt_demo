import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import GanttChart from './ganttChart';
import GanttTable from './GanttTable';
import common from '../../../styles/Common.module.scss';
import Modal from './Modal';
import useModal from './useModal';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { initData } from './data';
import PeriodList from './PeriodList';

const GanttD3 = (props) => {
  const getWidth = () => {
    return document.getElementById('dom').getBoundingClientRect().width;
  };
  const [width, setWidth] = useState(0);
  const [data, setData] = useState(initData);
  const [from, setFrom] = useState(moment().subtract(30, 'days'));
  const [to, setTo] = useState(moment());
  const chartRef = useRef();
  const ganttChart = useRef();
  const { modal, toggleModal } = useModal();
  const resizeListener = useCallback(
    debounce(() => {
      setWidth(getWidth());
    }, 150),
    []
  );

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.innerHTML = '';
    }
    const dataRender = [...data].filter((d) => d.isShow === true);
    ganttChart.current = new GanttChart(chartRef.current, width, dataRender.length, from, to);
    ganttChart.current.render(dataRender);
  }, [width, data]);

  useEffect(() => {
    ganttChart.current.changeScale(from, to);
  }, [from, to]);

  useEffect(() => {
    setData(initData);
    setWidth(getWidth());

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const setPeriod = useCallback(
    (type) => {
      let date = moment(to);
      switch (type) {
        case 'day':
          setFrom(date.subtract(1, 'days'));
          break;
        case 'week':
          setFrom(date.subtract(7, 'days'));
          break;
        case 'month':
          setFrom(date.subtract(1, 'months'));
          break;
        default:
          break;
      }
    },
    [to]
  );

  const handleCreateTask = (e, form, appendIndex) => {
    e.preventDefault();
    let obj = {
      ...form,
      startTimeInitialPlan: form.startTimePlan,
      endTimeInitialPlan: form.endTimePlan,
    };
    setData((data) => {
      const temp = [...data];
      if (!appendIndex) {
        let index = temp
          .slice()
          .reverse()
          .findIndex((el) => {
            return el.type === obj.type;
          });
        if (index > -1) {
          temp.splice(temp.length - index, 0, obj);
          return temp;
        }
        temp.push(obj);
        return temp;
      }
      const index = temp.findIndex((el) => el.id === appendIndex);
      temp[index].hasChild = true;
      temp.splice(index + 1, 0, obj);
      return temp;
    });
    toggleModal(e);
  };

  const handleUpdateTask = (e, form, appendIndex) => {
    e.preventDefault();
    let diffInStartTime = moment(form.startTimeInitialPlan).diff(moment(form.startTimePlan));
    let diffInEndTime = moment(form.endTimeInitialPlan).diff(moment(form.endTimePlan));
    let obj = {
      ...form,
      isTimePlanUpdated: diffInStartTime !== 0 || diffInEndTime !== 0,
    };
    setData((data) => {
      const temp = [...data];
      const index = temp.findIndex((el) => el.id === appendIndex);
      temp.splice(index, 1, obj);
      return temp;
    });
    toggleModal(e);
  };

  const handleDeleteTask = (e, id) => {
    e.preventDefault();
    setData((data) => {
      const temp = [...data];
      const index = temp.findIndex((el) => el.id === id);
      //If element hasChild -> Delete all Child
      if (temp[index].hasChild) {
        const childIdList = [];
        for (let i = index + 1; i < temp.length; i++) {
          if (temp[i].level > temp[index].level) {
            childIdList.push(temp[i].id);
          } else break;
        }
        childIdList.forEach((childId) => {
          let childIndex = temp.findIndex((el) => el.id === childId);
          temp.splice(childIndex, 1);
        });
      }
      ///Find if the element is the only Child
      if (temp[index].level > 1) {
        let isOnlyChild = true;
        let parentIndex;
        //loop reverse upward
        for (let i = index - 1; i >= 0; i--) {
          if (temp[i].level === temp[index].level) {
            isOnlyChild = false;
            break;
          }
          if (temp[i].level < temp[index].level) {
            parentIndex = i;
            break;
          }
        }
        //loop forward
        for (let i = index + 1; i < temp.length; i++) {
          if (temp[i].level === temp[index].level) {
            isOnlyChild = false;
            break;
          }
          if (temp[i].level < temp[index].level) {
            break;
          }
        }
        //if OnlyChild then update it's parent
        if (isOnlyChild) {
          temp[parentIndex].collapsed = false;
          temp[parentIndex].hasChild = false;
        }
      }
      //remove element
      temp.splice(index, 1);
      return temp;
    });
    toggleModal(e);
  };

  const updateFrom = (e) => {
    setFrom(e);
  };
  const updateTo = (e) => {
    setTo(e);
  };

  const handleCollapse = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    let temp = [...data];
    const index = temp.findIndex((el) => el.id == target.id);

    for (let i = index + 1; i < temp.length; i++) {
      if (temp[i].level > temp[index].level) {
        temp[i].isShow = temp[index].collapsed;
      } else break;
      if (temp[i].collapsed === true) {
        break;
      }
    }
    if (index > -1) {
      temp[index].collapsed = !temp[index].collapsed;
    }
    setData(temp);
  };

  return (
    <React.Fragment>
      <div className={common.FormInput}>
        <Datetime
          // ref={dateFromRef}
          locale="ja-JP"
          value={from}
          dateFormat="YYYY/MM/DD"
          timeFormat={false}
          onChange={updateFrom}
          closeOnSelect={true}
        />
        <span>〜</span>
        <Datetime
          // ref={dateToRef}
          locale="ja-JP"
          value={to}
          dateFormat="YYYY/MM/DD"
          timeFormat={false}
          onChange={updateTo}
          closeOnSelect={true}
        />
      </div>
      <PeriodList setPeriod={setPeriod} />
      <div className={common.container}>
        <div className={common.tableWrapper}>
          {/* <ul className={common.btnList}>
            <li>
              <button className={common.button_default} onClick={toggleModal}>
                Add New Task
              </button>
            </li>
          </ul> */}
          {modal.isShowing && (
            <Modal
              data={data}
              modal={modal}
              toggleModal={toggleModal}
              handleCreateTask={handleCreateTask}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
            />
          )}
          <GanttTable data={data} toggleModal={toggleModal} handleCollapse={handleCollapse}></GanttTable>
        </div>
        <div id="dom" className={common.dom} ref={chartRef}></div>
      </div>
    </React.Fragment>
  );
};

export default GanttD3;
