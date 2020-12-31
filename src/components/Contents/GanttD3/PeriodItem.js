import React, { useEffect, useRef, useState } from 'react';
import period from '../../../styles/Period.module.scss';

const PeriodItem = (props) => {
  return <li className={period.item} onClick={() => props.setPeriod(props.type)}>{props.name}</li>;
};

export default PeriodItem;
