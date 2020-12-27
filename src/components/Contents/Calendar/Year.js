import React, {useState, useEffect} from 'react';
// import d3 from 'react-d3-library';
import styles from "../../../styles/Calendar/Styles.module.scss";

const Year = (props) => {
  const [stateYear, setStateYear] = useState({
    year: null,
    endMoth: null,
    endDate: null
  });

  useEffect(() => {
    setStateYear(props.propsYear)
  },[props.propsYear])
  
  return (
    <div className={styles.calendarYear}>
      <div className={styles.yearLabel}>{stateYear.year}</div>
    </div>
  );
}
export default Year;