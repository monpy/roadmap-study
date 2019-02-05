import React from "react";

import Header from "./header";
import Table from "./table";

import { Provider } from "../../states/project/";

const Roadmap = props => {
  return (
    <Provider>
      <div>
        <Header />
        <Table />
      </div>
    </Provider>
  );
};

export default Roadmap;
