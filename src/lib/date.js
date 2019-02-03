import moment from "moment";

export const getDatesFromRange = (start, end) => {
  const arr = [];
  let curDate = moment(start);
  let endDate = moment(end);
  while (curDate <= endDate) {
    arr.push(curDate.toDate());
    curDate = curDate.add(1, "days");
  }
  return arr;
};

export const getDateFromToday = relativeNum => {
  let current = moment(new Date());
  return current.add(relativeNum, "days").toDate();
};
