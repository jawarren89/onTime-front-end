// TimeDropdown Data provides the options for hours, minutes, and meridiem to the
// TimeSelector component, where they are mapped to the TimeDropdown selectors.

export const defaultRoutine = {
  routine_id: 0,
  title: "",
  description: "",
  destination: "",
  complete_time: { hour: 0, minute: 0, meridiem: "" },
  start_time: { hour: 0, minute: 0, meridiem: "" },
  total_time: 0,
  tasks: [],
};

export const defaultTask = {
  task_id: 0,
  routine_id: 0,
  title: "",
  time: 0,
  start_time: { hour: 0, minute: 0, meridiem: "" },
};

export const hoursOptions = [
  "--",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export const minutesOptions = [
  "--",
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];

export const meridiemOptions = ["AM", "PM"];