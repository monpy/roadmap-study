import React from "react";
import { render } from "react-dom";
import Roadmap from "./components/roadmap/index";

const App = () => <Roadmap />;

render(<App />, document.getElementById("app"));
