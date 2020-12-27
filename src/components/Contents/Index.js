import React from 'react';
// import Calendar from "./Calendar/Index";
import Gantt from './Gantt/Index';
import common from "../../styles/Common.module.scss";
// const times = {
//   start: '2020-01-01',
//   end: '2021-01-01'
// }

const data = {
  data: [
    {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
    {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
  ],
  links: [
    {id: 1, source: 1, target: 2, type: '0'}
  ]
};
const Contents = () => {
  return (
    <main className={common.contents}>
      <div className={common.wrap}>
        <div className={common.gantt_container}>
          <Gantt tasks={data}/>
        </div>
      </div>
    </main>
  )
}
export default Contents;