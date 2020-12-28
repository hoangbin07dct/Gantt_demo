import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import _, { debounce } from 'lodash';
import GanttChart from './ganttChart';
import withRouter from './index';
import GanttTable from './GanttTable';
import common from '../../../styles/Common.module.scss';
import Modal from "./Modal";
import useModal from './useModal';


const GanttD3 = (props) => {
  const getWidth = () => {
    // return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    console.log(document.getElementById('dom').getBoundingClientRect().width);
    return document.getElementById('dom').getBoundingClientRect().width;
  };
  var initData = [
    {
      id: 1,
      task: 'conceptualize',
      type: 'development',
      startTime: '2013-1-28', //year/month/day
      endTime: '2013-2-1',
      details: "This actually didn't take any conceptualization",
      progress: 90
    },

    {
      id: 2,
      task: 'sketch',
      type: 'development',
      startTime: '2013-2-1',
      endTime: '2013-2-6',
      details: 'No sketching either, really',
      progress: 20
    },

    {
      id: 3,
      task: 'color profiles',
      type: 'development',
      startTime: '2013-2-6',
      endTime: '2013-2-9',
      progress: 45
    },

    {
      id: 4,
      task: 'HTML',
      type: 'coding',
      startTime: '2013-2-2',
      endTime: '2013-2-6',
      details: 'all three lines of it',
      progress: 25
    },

    {
      id: 5,
      task: 'write the JS',
      type: 'coding',
      startTime: '2013-2-6',
      endTime: '2013-2-9',
      progress: 60
    },

    {
      id: 6,
      task: 'advertise',
      type: 'promotion',
      startTime: '2013-2-9',
      endTime: '2013-2-12',
      details: 'This counts, right?',
      progress: 75
    },

    {
      id: 7,
      task: 'spam links',
      type: 'promotion',
      startTime: '2013-2-12',
      endTime: '2013-2-14',
      progress: 100
    },
    {
      id: 8,
      task: 'eat',
      type: 'celebration',
      startTime: '2013-2-8',
      endTime: '2013-2-13',
      details: 'All the things',
      progress: 50
    },

    {
      id: 9,
      task: 'crying',
      type: 'celebration',
      startTime: '2013-2-13',
      endTime: '2013-2-16',
      progress: 20
    },
  ];
  const [width, setWidth] = useState();
  const [data, setData] = useState(initData);
  const chartRef = useRef();
  const {isShowing, toggle} = useModal();
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
    console.log(width);
    const ganttChart = new GanttChart(chartRef.current, width, window.innerHeight / 1.9);
    ganttChart.render(data);
  }, [width]);

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
    type:'',
    startTime: '',
    endTime: '',
    details: ''
  });


  const [value, setValue] = React.useState("");
  const addTodo = text => {
    
  };

  const handleSubmit = e => {
    e.preventDefault();
    initData.push(infoForm);
    console.log(initData);
    document.querySelector('#dom svg').remove();
    const ganttChart = new GanttChart(chartRef.current, width, window.innerHeight / 1.9);
    ganttChart.render(initData);


  };

  console.log(initData);
  const InputChange = (e) => {
    setInfoForm({
      ...infoForm,
      [e.target.name]: e.target.value
    });
    
  };
  console.log(infoForm);

  return (
    <React.Fragment>
      <button className={common.button_default} onClick={toggle}>Add New Task</button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        handleSubmit={handleSubmit}
        InputChange={InputChange}
        infoForm={infoForm}
      />
      <GanttTable data={data}></GanttTable>
      <div id="dom" className={common.dom} ref={chartRef}></div>
    </React.Fragment>
  );
};

export default GanttD3;
