import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionList from "./Components/QuestionList";
import QuestionForm from "./Components/QuestionForm";
import Login from "./Components/Login";
import Main from "./Main";
import "./App.css";
import Navbar from './Components/Navbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route component={DefaultContainer}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;

const DefaultContainer = () => (
  <div className="container">
    <Navbar />
    <Route path="/ask" component={QuestionForm} />
    <Route exact path="/" component={QuestionList} />
  </div>
)