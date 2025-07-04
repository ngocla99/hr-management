// DUMMY DATA ARRAYS
export const KPI_CARDS = [
  {
    titleKey: 'kpi.totalProjects',
    value: '12',
    change: 8.3,
    changeTextKey: 'kpi.changeText.thisMonth',
    bgColor: 'bg-orange-50',
  },
  {
    titleKey: 'kpi.tasksCompleted',
    value: '154',
    change: 12.5,
    changeTextKey: 'kpi.changeText.percent',
    bgColor: 'bg-green-50',
  },
  {
    titleKey: 'kpi.tasksInProgress',
    value: '37',
    change: -5.1,
    changeTextKey: 'kpi.changeText.minus',
    bgColor: 'bg-blue-50',
  },
  {
    titleKey: 'kpi.overdueTasks',
    value: '6',
    change: 2.0,
    changeTextKey: 'kpi.changeText.plus',
    bgColor: 'bg-red-50',
  },
  {
    titleKey: 'kpi.activeEmployees',
    value: '9',
    change: 0,
    changeTextKey: '',
    bgColor: 'bg-purple-50',
  },
]

export const TOP_EMPLOYEES = [
  {
    image: '/avatars/06.png',
    name: 'Alice Johnson',
    id: 1001,
    salesCount: 23,
  },
  {
    image: '/avatars/07.png',
    name: 'Bob Smith',
    id: 1002,
    salesCount: 19,
  },
  {
    image: '/avatars/08.png',
    name: 'Carol Lee',
    id: 1003,
    salesCount: 17,
  },
  {
    image: '/avatars/09.png',
    name: 'David Brown',
    id: 1004,
    salesCount: 15,
  },
  {
    image: '/avatars/10.png',
    name: 'Eve White',
    id: 1005,
    salesCount: 13,
  },
]

export const RECENT_TASKS = [
  {
    task: 'Design Landing Page',
    assignedTo: 'Alice Johnson',
    project: 'Website Redesign',
    dueDate: '27 Jun 2025',
    status: 'In Progress',
    statusColor: 'yellow',
  },
  {
    task: 'Setup Database',
    assignedTo: 'Bob Smith',
    project: 'Internal Tools',
    dueDate: '26 Jun 2025',
    status: 'Completed',
    statusColor: 'green',
  },
  {
    task: 'Client Meeting',
    assignedTo: 'Carol Lee',
    project: 'Client Onboarding',
    dueDate: '20 Jun 2025',
    status: 'Overdue',
    statusColor: 'red',
  },
]

export const ACTIVE_PROJECTS = [
  {
    image: '/avatars/01.png',
    name: 'Website Redesign',
    ordersCount: 8,
  },
  {
    image: '/avatars/02.png',
    name: 'Internal Tools',
    ordersCount: 5,
  },
  {
    image: '/avatars/03.png',
    name: 'Client Onboarding',
    ordersCount: 3,
  },
  {
    image: '/avatars/04.png',
    name: 'Product Launch',
    ordersCount: 10,
  },
  {
    image: '/avatars/05.png',
    name: 'Marketing Campaign',
    ordersCount: 7,
  },
]
