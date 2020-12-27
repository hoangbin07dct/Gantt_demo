import React, {useState, useEffect} from 'react';
// import d3 from 'react-d3-library';
// import styles from "../../../styles/Calendar/Styles.module.scss";

const Month = (props) => {
  const [txtMonth, setTxtMoth] = useState({
    txtMonth: null,
    txtYear: null
  });

  useEffect(() => {
    setTxtMoth({
      txtMonth: props.month,
      txtYear: props.year
    })
  },[props.month, props.year])

  return (
    <div></div>
  )
}
export default Month;