import React from "react";
import { Button } from "@chakra-ui/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import ChartPage from "./Page/ChartPage";

const App = () => {
  return (
    <div>
      <Router>
        <Route path="/" component={HomePage} exact />
        <Route path="/Chart" component={ChartPage} />
        <Button colorScheme="blue">Button</Button>
      </Router>
    </div>
  );
};

export default App;
