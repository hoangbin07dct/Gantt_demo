export const initData = [
  {
    id: 1,
    isShow: true,
    task: 'Task1',
    type: 'Group1',
    startTimeCurrent: '2020-12-03', //year/month/day
    endTimeCurrent: '2020-12-10',
    startTimePlan: '2020-12-02', //year/month/day
    endTimePlan: '2020-12-10',
    startTimeInitialPlan: '2020-12-01', //year/month/day
    endTimeInitialPlan: '2020-12-05',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 1,
    hasChild: true,
    collapsed: false,
    isTimePlanUpdated: true,
    dependence: [4]
  },

  {
    id: 2,
    isShow: true,
    task: 'Task2',
    type: 'Group1',
    startTimeCurrent: '2020-12-20', //year/month/day
    endTimeCurrent: '2020-12-30',
    startTimePlan: '2020-12-20', //year/month/day
    endTimePlan: '2020-12-25',
    startTimeInitialPlan: '2020-12-20', //year/month/day
    endTimeInitialPlan: '2020-12-30',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 2,
    hasChild: true,
    collapsed: false,
    isTimePlanUpdated: true,
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
    startTimeInitialPlan: '2020-12-07', //year/month/day
    endTimeInitialPlan: '2020-12-10',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 3,
    hasChild: false,
    collapsed: false,
    isTimePlanUpdated: true,
  },

  {
    id: 4,
    isShow: true,
    task: 'Task4',
    type: 'Group2',
    startTimeCurrent: '2020-12-11', //year/month/day
    endTimeCurrent: '2020-12-15',
    startTimePlan: '2020-12-11', //year/month/day
    endTimePlan: '2020-12-15',
    startTimeInitialPlan: '2020-12-11', //year/month/day
    endTimeInitialPlan: '2020-12-16',
    details: "This actually didn't take any conceptualization",
    progress: 10,
    level: 1,
    hasChild: true,
    collapsed: false,
    isTimePlanUpdated: true,
    dependence: [6]
  },

  {
    id: 5,
    isShow: true,
    task: 'Task5',
    type: 'Group2',
    startTimeCurrent: '2020-12-15', //year/month/day
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
    isTimePlanUpdated: true,
  },

  {
    id: 6,
    isShow: true,
    task: 'Task6',
    type: 'Group3',
    startTimeCurrent: '2020-12-16', //year/month/day
    endTimeCurrent: '2020-12-20',
    startTimePlan: '2020-12-16', //year/month/day
    endTimePlan: '2020-12-20',
    startTimeInitialPlan: '2020-12-16', //year/month/day
    endTimeInitialPlan: '2020-12-20',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 1,
    hasChild: true,
    collapsed: false,
    isTimePlanUpdated: true,
    dependence: [10, 11]
  },

  {
    id: 7,
    isShow: true,
    task: 'Task7',
    type: 'Group3',
    startTimeCurrent: '2020-12-03', //year/month/day
    endTimeCurrent: '2020-12-10',
    startTimePlan: '2020-12-03', //year/month/day
    endTimePlan: '2020-12-07',
    startTimeInitialPlan: '2020-12-03', //year/month/day
    endTimeInitialPlan: '2020-12-05',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 2,
    hasChild: false,
    collapsed: false,
    isTimePlanUpdated: true,
  },
  {
    id: 8,
    isShow: true,
    task: 'Task8',
    type: 'Group4',
    startTimeCurrent: '2020-12-03', //year/month/day
    endTimeCurrent: '2020-12-10',
    startTimePlan: '2020-12-03', //year/month/day
    endTimePlan: '2020-12-15',
    startTimeInitialPlan: '2020-12-03', //year/month/day
    endTimeInitialPlan: '2020-12-05',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 1,
    hasChild: true,
    collapsed: false,
    isTimePlanUpdated: true,
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
    isTimePlanUpdated: true,
  },
  {
    id: 10,
    isShow: true,
    task: 'Task10',
    type: 'Group4',
    startTimeCurrent: '2020-12-21', //year/month/day
    endTimeCurrent: '2020-12-25',
    startTimePlan: '2020-12-21', //year/month/day
    endTimePlan: '2020-12-28',
    startTimeInitialPlan: '2020-12-21', //year/month/day
    endTimeInitialPlan: '2020-12-25',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 3,
    hasChild: false,
    collapsed: false,
    isTimePlanUpdated: true,
  },
  {
    id: 11,
    isShow: true,
    task: 'Task11',
    type: 'Group4',
    startTimeCurrent: '2020-12-21', //year/month/day
    endTimeCurrent: '2020-12-25',
    startTimePlan: '2020-12-21', //year/month/day
    endTimePlan: '2020-12-28',
    startTimeInitialPlan: '2020-12-21', //year/month/day
    endTimeInitialPlan: '2020-12-25',
    details: "This actually didn't take any conceptualization",
    progress: 90,
    level: 3,
    hasChild: false,
    collapsed: false,
    isTimePlanUpdated: true,
  },
];