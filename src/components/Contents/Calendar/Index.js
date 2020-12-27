import React, {useState, useEffect} from 'react';
// import d3 from 'react-d3-library';
import Year from "./Year";
import styles from "../../../styles/Calendar/Styles.module.scss";

const Calendar = (props) => {

  const [times ,setTimes] = useState({
    start: '',
    end: ''
  });

  useEffect(() => {
    setTimes(props.times);
  }, [props.times])
  const propsYear = [{year: 2020, endMoth: 12, endDate: 31},{year: 2021, endMoth: 12, endDate: 31},{year: 2022, endMoth: 10, endDate: 20}]
  return (
    <div className={styles.calendar}>
      <h1 className={styles.tl}>Test Calendar D3js</h1>
      <div className={styles.calendarInner}>
        <Year propsYear={propsYear[0]}/>
        <Year propsYear={propsYear[1]}/>
        <Year propsYear={propsYear[2]}/>
      </div>
    </div>
  )
}
export default Calendar;