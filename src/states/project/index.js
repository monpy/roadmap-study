import React, { useReducer } from "react";
import * as milestones from "./milestones";
import * as tasks from "./tasks";

const Store = React.createContext();

const Provider = ({ children }) => {
  const milestonesState = useReducer(
    milestones.reducer,
    milestones.initialState
  );

  const tasksState = useReducer(tasks.reducer, tasks.initialState);

  const provideValues = {
    milestones: {
      state: milestonesState[0],
      dispatch: milestonesState[1]
    },
    tasks: {
      state: tasksState[0],
      dispatch: tasksState[1]
    }
  };
  return <Store.Provider value={provideValues}>{children}</Store.Provider>;
};

export { Store, Provider };
