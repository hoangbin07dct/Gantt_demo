export const initData = [
  {
    id: 1,
    isShow: true,
    task: 'Task1',
    type: 'Group1',
    startTimeCurrent: '2020-12-03', //year/month/day
    endTimeCurrent: '2020-12-10',
    startTimePlan: '2020-12-02', //year/month/day
    endTimePlan: '2020-12-24',
    startTimeInitialPlan: '2020-12-01', //year/month/day
    endTimeInitialPlan: '2020-12-05',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 1,
    hasChild: true,
    collapsed: false,
    dependence: [2, 3]
  },

  {
    id: 2,
    isShow: true,
    task: 'Task2',
    type: 'Group1',
    startTimeCurrent: '2020-12-15', //year/month/day
    endTimeCurrent: '2020-12-20',
    startTimePlan: '2020-12-20', //year/month/day
    endTimePlan: '2020-12-25',
    startTimeInitialPlan: '2020-12-20', //year/month/day
    endTimeInitialPlan: '2020-12-30',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 2,
    hasChild: true,
    collapsed: false,
  },

  {
    id: 3,
    isShow: true,
    task: 'Task3',
    type: 'Group1',
    startTimeCurrent: '2020-12-07', //year/month/day
    endTimeCurrent: '2020-12-15',
    startTimePlan: '2020-12-07', //year/month/day
    endTimePlan: '2020-12-10',
    startTimeInitialPlan: '2020-12-13', //year/month/day
    endTimeInitialPlan: '2020-12-25',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 3,
    hasChild: false,
    collapsed: false,
  },

  {
    id: 4,
    isShow: true,
    task: 'Task4',
    type: 'Group2',
    startTimeCurrent: '2020-11-30', //year/month/day
    endTimeCurrent: '2020-12-10',
    startTimePlan: '2020-12-02', //year/month/day
    endTimePlan: '2020-12-12',
    startTimeInitialPlan: '2020-12-01', //year/month/day
    endTimeInitialPlan: '2020-12-10',
    details: "This actually didn't take any conceptualization",
    progress: 10,
    level: 1,
    hasChild: true,
    collapsed: false,
    dependence: [5, 6, 7, 8, 9]
  },

  {
    id: 5,
    isShow: true,
    task: 'Task5',
    type: 'Group2',
    startTimeCurrent: '2020-12-05', //year/month/day
    endTimeCurrent: '2020-12-21',
    startTimePlan: '2020-12-15', //year/month/day
    endTimePlan: '2020-12-24',
    startTimeInitialPlan: '2020-12-14', //year/month/day
    endTimeInitialPlan: '2020-12-21',
    details: "This actually didn't take any conceptualization",
    progress: 40,
    level: 2,
    hasChild: false,
    collapsed: false,
  },

  {
    id: 6,
    isShow: true,
    task: 'Task6',
    type: 'Group3',
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
    isShow: true,
    task: 'Task7',
    type: 'Group3',
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
    isShow: true,
    task: 'Task8',
    type: 'Group4',
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
    isShow: true,
    task: 'Task9',
    type: 'Group4',
    startTimeCurrent: '2020-12-05', //year/month/day
    endTimeCurrent: '2020-12-10',
    startTimePlan: '2020-12-05', //year/month/day
    endTimePlan: '2020-12-17',
    startTimeInitialPlan: '2020-12-15', //year/month/day
    endTimeInitialPlan: '2020-12-17',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 2,
    hasChild: true,
    collapsed: false,
  },
  {
    id: 10,
    isShow: true,
    task: 'Task10',
    type: 'Group4',
    startTimeCurrent: '2020-11-25', //year/month/day
    endTimeCurrent: '2020-12-10',
    startTimePlan: '2020-12-06', //year/month/day
    endTimePlan: '2020-12-28',
    startTimeInitialPlan: '2020-11-28', //year/month/day
    endTimeInitialPlan: '2020-12-05',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 3,
    hasChild: false,
    collapsed: false,
  },
  {
    id: 11,
    isShow: true,
    task: 'Task11',
    type: 'Group4',
    startTimeCurrent: '2020-12-15', //year/month/day
    endTimeCurrent: '2020-12-29',
    startTimePlan: '2020-12-16', //year/month/day
    endTimePlan: '2020-12-29',
    startTimeInitialPlan: '2020-12-10', //year/month/day
    endTimeInitialPlan: '2020-12-27',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 3,
    hasChild: false,
    collapsed: false,
  },
];