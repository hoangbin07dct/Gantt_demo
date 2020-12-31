import React, { useEffect, useRef, useState } from 'react';
import period from '../../../styles/Period.module.scss';
import PeriodItem from './PeriodItem';

const PeriodList = (props) => {
  return (
    <ul className={period.list}>
      {/* <PeriodItem name={'作業日中'}></PeriodItem> */}
      <p className={period.text}>期間</p>
      <PeriodItem name={'月間工程'} type={'month'} setPeriod={props.setPeriod}></PeriodItem>
      <PeriodItem name={'週間工程'} type={'week'} setPeriod={props.setPeriod}></PeriodItem>
      <PeriodItem name={'作業日中'} type={'day'} setPeriod={props.setPeriod}></PeriodItem>
    </ul>
  );
};

export default PeriodList;
