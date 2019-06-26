import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import QuestionList from "./Components/QuestionList";

class Main extends Component{
  render(){
    return (
      <div>
        <Navbar loggedIn={this.props.loggedIn}/>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
