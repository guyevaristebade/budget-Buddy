import React from "react";

import { Authenticated } from "./components";

import { Router } from "./router";

const App = () => (
  <Authenticated>
    <Router />
  </Authenticated>
);

export default App;
