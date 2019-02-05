import React, { useReducer } from "react";
import * as milestones from "./milestones";

const Store = React.createContext();

const Provider = ({ children }) => {
  const milestonesState = useReducer(
    milestones.reducer,
    milestones.initialState
  );

  const provideValues = {
    milestones: {
      state: milestonesState[0],
      dispatch: milestonesState[1]
    }
  };
  return <Store.Provider value={provideValues}>{children}</Store.Provider>;
};

export { Store, Provider };
