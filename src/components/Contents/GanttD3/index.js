import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import _, { debounce } from 'lodash';
import GanttChart from './ganttChart';
import withRouter from './index';
import GanttTable from './GanttTable';
import common from '../../../styles/Common.module.scss';



const GanttD3 = (props) => {
  const getWidth = () => {
    // return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    console.log(document.getElementById('dom').getBoundingClientRect().width);
    return document.getElementById('dom').getBoundingClientRect().width;
  };
  var initData = [
    {
      task: 'conceptualize',
      type: 'development',
      startTime: '2013-1-28', //year/month/day
      endTime: '2013-2-1',
      details: "This actually didn't take any conceptualization",
    },

    {
      task: 'sketch',
      type: 'development',
      startTime: '2013-2-1',
      endTime: '2013-2-6',
      details: 'No sketching either, really',
    },

    {
      task: 'color profiles',
      type: 'development',
      startTime: '2013-2-6',
      endTime: '2013-2-9',
    },

    {
      task: 'HTML',
      type: 'coding',
      startTime: '2013-2-2',
      endTime: '2013-2-6',
      details: 'all three lines of it',
    },

    {
      task: 'write the JS',
      type: 'coding',
      startTime: '2013-2-6',
      endTime: '2013-2-9',
    },

    {
      task: 'advertise',
      type: 'promotion',
      startTime: '2013-2-9',
      endTime: '2013-2-12',
      details: 'This counts, right?',
    },

    {
      task: 'spam links',
      type: 'promotion',
      startTime: '2013-2-12',
      endTime: '2013-2-14',
    },
    {
      task: 'eat',
      type: 'celebration',
      startTime: '2013-2-8',
      endTime: '2013-2-13',
      details: 'All the things',
    },

    {
      task: 'crying',
      type: 'celebration',
      startTime: '2013-2-13',
      endTime: '2013-2-16',
    },
  ];
  const [width, setWidth] = useState();
  const [data, setData] = useState(initData);
  const chartRef = useRef();

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
    const ganttChart = new GanttChart(chartRef.current, width, window.innerHeight / 1.9);
    ganttChart.render(data);
  }, [width]);

  useEffect(() => {
    setData(initData);
    setWidth();

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <React.Fragment>
      <GanttTable data={data}></GanttTable>
      <div id="dom" className={common.dom} ref={chartRef}></div>
    </React.Fragment>
  );
};

export default GanttD3;
