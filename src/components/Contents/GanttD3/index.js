import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import GanttChart from './ganttChart';
import GanttTable from './GanttTable';
import common from '../../../styles/Common.module.scss';
import modal from '../../../styles/Modal.module.scss';
import Modal from './Modal';
import useModal from './useModal';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { initData } from './data';

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

  const handleCreateTask = (e, form, appendIndex) => {
    e.preventDefault();
    let obj = {
      ...form,
      startTimeInitialPlan: form.startTimePlan,
      endTimeInitialPlan: form.endTimePlan,
      isUpdated: false
    }
    setData((data) => {
      const temp = [...data];
      if (!appendIndex) {
        let index = temp
          .slice()
          .reverse()
          .findIndex((el) => el.type === obj.type);
        if (index > -1) {
          temp.splice(index - 1, 0, obj);
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
    let obj = {
      ...form,
      isUpdated: true
    }
    setData((data) => {
      const temp = [...data];
      const index = temp.findIndex((el) => el.id === appendIndex);
      temp.splice(index, 1, obj);
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
