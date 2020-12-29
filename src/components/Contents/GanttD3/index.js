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
      startTime: '2020-12-01', //year/month/day
      endTime: '2020-12-02',
      details: "This actually didn't take any conceptualization",
      progress: 90,
    },

    {
      id: 2,
      task: 'sketch',
      type: 'development',
      startTime: '2020-12-02', //year/month/day
      endTime: '2020-12-05',
      details: 'No sketching either, really',
      progress: 20,
    },

    {
      id: 3,
      task: 'color profiles',
      type: 'development',
      startTime: '2020-12-05', //year/month/day
      endTime: '2020-12-10',
      progress: 45,
    },

    {
      id: 4,
      task: 'HTML',
      type: 'coding',
      startTime: '2020-12-04', //year/month/day
      endTime: '2020-12-09',
      details: 'all three lines of it',
      progress: 25,
    },

    {
      id: 5,
      task: 'write the JS',
      type: 'coding',
      startTime: '2020-12-11', //year/month/day
      endTime: '2020-12-20',
      progress: 60,
    },

    {
      id: 6,
      task: 'advertise',
      type: 'promotion',
      startTime: '2020-12-15', //year/month/day
      endTime: '2020-12-18',
      details: 'This counts, right?',
      progress: 75,
    },

    {
      id: 7,
      task: 'spam links',
      type: 'promotion',
      startTime: '2020-12-17', //year/month/day
      endTime: '2020-12-25',
      progress: 100,
    },
    {
      id: 8,
      task: 'eat',
      type: 'celebration',
      startTime: '2020-12-25', //year/month/day
      endTime: '2020-12-27',
      details: 'All the things',
      progress: 50,
    },

    {
      id: 9,
      task: 'crying',
      type: 'celebration',
      startTime: '2020-12-24', //year/month/day
      endTime: '2020-12-27',
      progress: 20,
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
    ganttChart.current = new GanttChart(chartRef.current, width, window.innerHeight / 1.9, from, to);
    ganttChart.current.render(data);
  }, [width]);
  useEffect(() => {
    ganttChart.current.changeScale(from, to);
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
    startTime: '',
    endTime: '',
    details: '',
  });

  const [value, setValue] = React.useState('');
  const addTodo = (text) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    initData.push(infoForm);
    console.log(initData);
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
          <Modal
            isShowing={isShowing}
            hide={toggle}
            handleSubmit={handleSubmit}
            InputChange={InputChange}
            infoForm={infoForm}
          />

          <GanttTable data={data}></GanttTable>
        </div>
        <div id="dom" className={common.dom} ref={chartRef}></div>
      </div>
    </React.Fragment>
  );
};

export default GanttD3;
