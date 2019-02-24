import React, { useReducer } from "react";
import * as milestones from "./milestones";
import * as tasks from "./tasks";
import * as range from "./range";
import * as groups from "./groups";

const Store = React.createContext();

const Provider = ({ children }) => {
  const milestonesState = useReducer(
    milestones.reducer,
    milestones.initialState
  );

  const tasksState = useReducer(tasks.reducer, tasks.initialState);
  const rangeState = useReducer(range.reducer, range.initialState);
  const groupsState = useReducer(groups.reducer, groups.initialState);

  const provideValues = {
    milestones: {
      state: milestonesState[0],
      dispatch: milestonesState[1]
    },
    tasks: {
      state: tasksState[0],
      dispatch: tasksState[1]
    },
    range: {
      state: rangeState[0],
      dispatch: rangeState[1]
    },
    groupsState: {
      state: groupsState[0],
      dispatch: groupsState[1]
    }
  };
  return <Store.Provider value={provideValues}>{children}</Store.Provider>;
};

export { Store, Provider };
