import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Countries from "./pages/Countries/Countries";
import { Provider } from "react-redux";
import  initialState  from "./constants/initialState";
import  configureStore  from "./store/configureStore";
import dotenv from 'dotenv';
import 'bootstrap/dist/css/bootstrap.min.css';

dotenv.config()
const store = configureStore(initialState)

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Countries} />
      </Router>
    </Provider>
  );
};

export default App;
