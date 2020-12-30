import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import _, { debounce } from 'lodash';
import GanttChart from './ganttChart';
import withRouter from './index';
import GanttTable from './GanttTable';
import common from '../../../styles/Common.module.scss';
import Modal from './Modal';
import useModal from './useModal';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const GanttD3 = (props) => {
  const getWidth = () => {
    return document.getElementById('dom').getBoundingClientRect().width;
  };
  var initData = [
    {
      id: 1,
      isShow: true,
      task: 'Task1',
      type: 'Group1',
      startTimeCurrent: '2020-12-03', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-07',
      startTimeInitialPlan: '2020-12-01', //year/month/day
      endTimeInitialPlan: '2020-12-05',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 1,
      hasChild: true,
      collapsed: false,
      group: [2, 3],
    },
    {
      id: 2,
      isShow: true,
      task: 'Task2',
      type: 'Group1',
      startTimeCurrent: '2020-12-15', //year/month/day
      endTimeCurrent: '2020-12-20',
      startTimePlan: '2020-12-20', //year/month/day
      endTimePlan: '2020-12-25',
      startTimeInitialPlan: '2020-12-20', //year/month/day
      endTimeInitialPlan: '2020-12-30',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 2,
      hasChild: true,
      collapsed: false,
    },

    {
      id: 3,
      isShow: true,
      task: 'Task3',
      type: 'Group1',
      startTimeCurrent: '2020-12-05', //year/month/day
      endTimeCurrent: '2020-12-15',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-07',
      startTimeInitialPlan: '2020-12-13', //year/month/day
      endTimeInitialPlan: '2020-12-25',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 3,
      hasChild: false,
      collapsed: false,
    },

    {
      id: 4,
      isShow: true,
      task: 'Task4',
      type: 'Group2',
      startTimeCurrent: '2020-11-30', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-12',
      startTimeInitialPlan: '2020-12-01', //year/month/day
      endTimeInitialPlan: '2020-12-10',
      details: "This actually didn't take any conceptualization",
      progress: 10,
      level: 1,
      hasChild: true,
      collapsed: false,
      group: [5, 6],
    },

    {
      id: 5,
      isShow: true,
      task: 'Task5',
      type: 'Group2',
      startTimeCurrent: '2020-12-05', //year/month/day
      endTimeCurrent: '2020-12-21',
      startTimePlan: '2020-12-15', //year/month/day
      endTimePlan: '2020-12-24',
      startTimeInitialPlan: '2020-12-14', //year/month/day
      endTimeInitialPlan: '2020-12-21',
      details: "This actually didn't take any conceptualization",
      progress: 40,
      level: 2,
      hasChild: false,
      collapsed: false,
    },

    {
      id: 6,
      isShow: true,
      task: 'Task6',
      type: 'Group3',
      startTimeCurrent: '2020-12-03', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-07',
      startTimeInitialPlan: '2020-12-01', //year/month/day
      endTimeInitialPlan: '2020-12-05',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 1,
      hasChild: true,
      collapsed: false,
    },

    {
      id: 7,
      isShow: true,
      task: 'Task7',
      type: 'Group3',
      startTimeCurrent: '2020-12-03', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-07',
      startTimeInitialPlan: '2020-12-01', //year/month/day
      endTimeInitialPlan: '2020-12-05',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 2,
      hasChild: false,
      collapsed: false,
    },
    {
      id: 8,
      isShow: true,
      task: 'Task8',
      type: 'Group4',
      startTimeCurrent: '2020-12-03', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-07',
      startTimeInitialPlan: '2020-12-01', //year/month/day
      endTimeInitialPlan: '2020-12-05',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 1,
      hasChild: true,
      collapsed: false,
    },

    {
      id: 9,
      isShow: true,
      task: 'Task9',
      type: 'Group4',
      startTimeCurrent: '2020-12-03', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-07',
      startTimeInitialPlan: '2020-12-01', //year/month/day
      endTimeInitialPlan: '2020-12-05',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 2,
      hasChild: true,
      collapsed: false,
    },
    {
      id: 10,
      isShow: true,
      task: 'Task10',
      type: 'Group4',
      startTimeCurrent: '2020-12-03', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-07',
      startTimeInitialPlan: '2020-12-01', //year/month/day
      endTimeInitialPlan: '2020-12-05',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 3,
      hasChild: false,
      collapsed: false,
    },
    {
      id: 11,
      isShow: true,
      task: 'Task11',
      type: 'Group4',
      startTimeCurrent: '2020-12-03', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-02', //year/month/day
      endTimePlan: '2020-12-07',
      startTimeInitialPlan: '2020-12-01', //year/month/day
      endTimeInitialPlan: '2020-12-05',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 3,
      hasChild: false,
      collapsed: false,
    },
  ];
  const [width, setWidth] = useState();
  const [data, setData] = useState(initData);
  const [from, setFrom] = useState(moment().subtract(30, 'days'));
  const [to, setTo] = useState(moment());
  const chartRef = useRef();
  const ganttChart = useRef();
  const { isShowing, toggle } = useModal();
  const resizeListener = useCallback(
    debounce(() => {
      setWidth(getWidth());
    }, 150),
    []
  );

  useEffect(() => {
    console.log(data);
    if (chartRef.current) {
      chartRef.current.innerHTML = '';
    }
    const dataRender = [...data].filter((d) => d.isShow === true);
    ganttChart.current = new GanttChart(chartRef.current, width, dataRender.length, from, to);
    ganttChart.current.render(dataRender);
  }, [width, data]);

  useEffect(() => {
    ganttChart.current.changeScale(from, to);
    //  if (chartRef.current) {
    //   chartRef.current.innerHTML = '';
    // }
    // ganttChart.current = new GanttChart(chartRef.current, width, window.innerHeight, from, to);
    // ganttChart.current.render(data);
    // ganttChart.current.changeScale(from, to);
    // if (chartRef.current) {
    //   chartRef.current.innerHTML = '';
    // }
    // ganttChart.current = new GanttChart(chartRef.current, width, window.innerHeight / 1.9, from, to);
    // ganttChart.current.render(data);
  }, [from, to]);

  useEffect(() => {
    setData(initData);
    setWidth(getWidth());

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const handleSubmit = (e, form, appendIndex) => {
    e.preventDefault();
    setData((data) => {
      const temp = [...data];
      if (!appendIndex) {
        temp.push(form);
      } else {
        temp.splice(appendIndex, 0, form);
      }
      return temp;
    });
    toggle();
  };

  const updateFrom = (e) => {
    setFrom(e);
  };
  const updateTo = (e) => {
    setTo(e);
  };

  const handleCollapse = (e) => {
    const target = e.currentTarget;
    let temp = [...data];
    const index = temp.findIndex((el) => el.id === Number(target.id));
    for (let i = index + 1; i < temp.length; i++) {
      if (temp[i].level > temp[index].level) {
        temp[i].isShow = temp[index].collapsed;
      } else break;
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
          <ul className={common.btnList}>
            <li>
              <button className={common.button_default} onClick={toggle}>
                Add New Task
              </button>
            </li>
          </ul>
          {isShowing && <Modal hide={toggle} handleSubmit={handleSubmit} />}
          <GanttTable data={data} handleCollapse={handleCollapse}></GanttTable>
        </div>
        <div id="dom" className={common.dom} ref={chartRef}></div>
      </div>
    </React.Fragment>
  );
};

export default GanttD3;
