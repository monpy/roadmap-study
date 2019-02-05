import moment from "moment";

export const reducer = (state = [{}], action) => {
  switch (action.type) {
    case "create":
      return state.concat({
        date: action.value,
        name: `${moment(action.value).format("YYYY-MM-DD")} MILESTONE`
      });

    default:
      return state;
  }
};

export const initialState = [
  {
    date: new Date(),
    name: "INITIAL MILESTONE"
  }
];
