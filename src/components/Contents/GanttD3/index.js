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
      task: 'conceptualize',
      type: 'development',
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
      id: 2,
      task: 'sketch',
      type: 'development',
      startTimeCurrent: '2020-11-15', //year/month/day
      endTimeCurrent: '2020-12-10',
      startTimePlan: '2020-12-20', //year/month/day
      endTimePlan: '2020-12-25',
      startTimeInitialPlan: '2020-12-05', //year/month/day
      endTimeInitialPlan: '2020-12-15',
      details: "This actually didn't take any conceptualization",
      progress: 90,
      level: 2,
      hasChild: true,
      collapsed: false,
    },

    {
      id: 3,
      task: 'color profiles',
      type: 'development',
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
      id: 4,
      task: 'HTML',
      type: 'coding',
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
      id: 5,
      task: 'write the JS',
      type: 'coding',
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
      id: 6,
      task: 'advertise',
      type: 'promotion',
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
      task: 'spam links',
      type: 'promotion',
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
      task: 'eat',
      type: 'celebration',
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
      task: 'crying',
      type: 'celebration',
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
      task: 'crying',
      type: 'celebration',
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
      task: 'crying',
      type: 'celebration',
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
    if (chartRef.current) {
      chartRef.current.innerHTML = '';
    }
    ganttChart.current = new GanttChart(chartRef.current, width, window.innerHeight, from, to);
    ganttChart.current.render(data);
  }, [width]);
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

  const [infoForm, setInfoForm] = useState({
    task: '',
    type: '',
    startTimeCurrent: '', //year/month/day
    endTimeCurrent: '',
    startTimePlan: '', //year/month/day
    endTimePlan: '',
    startTimeInitialPlan: '', //year/month/day
    endTimeInitialPlan: '',
    details: '',
    progress: '',
    level: 3,
    hasChild: false,
  });

  const [value, setValue] = React.useState('');
  const addTodo = (text) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    initData.push(infoForm);
    console.log(initData);
    toggle();
    document.querySelector('#dom svg').remove();
    const ganttChart = new GanttChart(chartRef.current, width, window.innerHeight / 1.9, from, to);
    ganttChart.render(initData);
  };

  const InputChange = (e) => {
    setInfoForm({
      ...infoForm,
      [e.target.name]: e.target.value,
    });
  };

  const getStartTimeCurrent = (e) => {
    setInfoForm({
      ...infoForm,
      startTimeCurrent: e.format('YYYY-MM-DD'),
    });
  };

  const getEndTimeCurrent = (e) => {
    setInfoForm({
      ...infoForm,
      endTimeCurrent: e.format('YYYY-MM-DD'),
    });
  };

  const getStartTimePlan = (e) => {
    setInfoForm({
      ...infoForm,
      startTimePlan: e.format('YYYY-MM-DD'),
    });
  };

  const getEndTimePlan = (e) => {
    setInfoForm({
      ...infoForm,
      endTimePlan: e.format('YYYY-MM-DD'),
    });
  };
  const getStartTimeInitialPlan = (e) => {
    setInfoForm({
      ...infoForm,
      startTimeInitialPlan: e.format('YYYY-MM-DD'),
    });
  };
  const getEndTimeInitialPlan = (e) => {
    setInfoForm({
      ...infoForm,
      endTimeInitialPlan: e.format('YYYY-MM-DD'),
    });
  };
  const updateFrom = (e) => {
    setFrom(e);
  };
  const updateTo = (e) => {
    setTo(e);
  };

  return (
    <React.Fragment>
      <div className={common.FormInput}>
        <Datetime
          // ref={dateFromRef}
          locale='ja-JP'
          value={from}
          dateFormat='YYYY/MM/DD'
          timeFormat={false}
          onChange={updateFrom}
          closeOnSelect={true}
        />
        <span>〜</span>
        <Datetime
          // ref={dateToRef}
          locale='ja-JP'
          value={to}
          dateFormat='YYYY/MM/DD'
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
          <Modal
            isShowing={isShowing}
            hide={toggle}
            handleSubmit={handleSubmit}
            InputChange={InputChange}
            infoForm={infoForm}
            getStartTimeCurrent={getStartTimeCurrent}
            getEndTimeCurrent={getEndTimeCurrent}
            getStartTimePlan={getStartTimePlan}
            getEndTimePlan={getEndTimePlan}
            getStartTimeInitialPlan={getStartTimeInitialPlan}
            getEndTimeInitialPlan={getEndTimeInitialPlan}
          />

          <GanttTable data={data}></GanttTable>
        </div>
        <div id='dom' className={common.dom} ref={chartRef}></div>
      </div>
    </React.Fragment>
  );
};

export default GanttD3;
