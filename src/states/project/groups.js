const uuidv4 = require("uuid/v4");

export const reducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const initialState = [
  {
    id: uuidv4(),
    position: 1,
    label: "Groups Test"
  }
];
