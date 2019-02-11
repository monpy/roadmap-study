import moment from "moment";
const uuidv4 = require("uuid/v4");

export const reducer = (state = [{}], action) => {
  switch (action.type) {
    case "create":
      return createTask(state, action);

    case "update":
      return updateTask(state, action);

    default:
      return state;
  }
};

const updateTask = (state, { id, value }) => {
  const nextState = state.map(task => {
    if (task.id === id) {
      return Object.assign({}, task, value);
    }
    return task;
  });
  return nextState;
};

const createTask = (state, { value }) => {
  return state.concat(Object.assign({}, {id:  uuidv4()}, value));
};

export const initialState = [
  {
    id: uuidv4(),
    startAt: new Date(),
    endAt: moment()
      .add(4, "day")
      .toDate(),
    title: "Task Example",
    position: 0,
    isFinished: false
  },
  {
    id: uuidv4(),
    startAt: new Date(),
    endAt: moment()
      .add(20, "day")
      .toDate(),
    title: "Task Example",
    position: 1,
    isFinished: false
  }
];
