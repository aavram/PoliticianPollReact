import React, {Component} from "react";
import Keycloak from "keycloak-js";
import QuestionList from "./QuestionList";
import Navbar from './Navbar';
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state={
      keycloak: null,
      authenticated: false,
    }
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      this.props.dispatch({type: "LOGIN", data: keycloak})
    });
  }

  render() {
    if(!this.props.data.Login.authenticated){
      return(
        <div>
          <Navbar/>
          <div>Please wait...</div>
        </div>);
    }else{
      return(
        <div>
          <Navbar>
            <QuestionList/>
          </Navbar>
        </div>
      );
    }    
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

export default connect(mapStateToProps) (Login);
