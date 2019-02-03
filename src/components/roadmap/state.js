import { useState } from "react";
export const stateDateRangeFuture = () => {
  const { state, action } = useState(30);

  return {
    dateRangeFuture: state,
    slideFuture: action(state + 30)
  };
};
