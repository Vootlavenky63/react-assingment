import React, { Component, Suspense } from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from "axios";
import logo from './logo.svg';
import Dropdown from './components/Dropdown';
import './App.css';

const history = createBrowserHistory();
class App extends Component {
  constructor(props) {
      super(props);
    this.state = { refresh: false };
  }
  addNewCountry(value, refresh) {
      this.setState({ refresh: false });
      axios.get("http://13.57.235.126:5000//addcountry?name=" + value).then(response => {
          alert(value + " has been added" );
          this.setState({ refresh: true });
      });
    }

  render() {
      const adminProps = {
        addAndSelectHandler: (value) => this.addNewCountry(value),
        privilege: true,
        noOfItems: 10,
        refresh: this.state.refresh,
        title: "select mon existing/Add n Select",
      }
      const userProps = {
        addAndSelectHandler: () => {},
        privilege: false,
        noOfItems: 5,
      }
      return (
        <Router history={history}>
        <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path={"/admin"} component={() => React.createElement(Dropdown, adminProps )} />
          <Route path={"/user"} component={() => React.createElement(Dropdown, userProps )} />
          </Switch>
          </Suspense>
        </Router>
      );
  }
}

export default App;
