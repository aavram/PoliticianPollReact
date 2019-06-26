import React, {Component} from "react";
import Keycloak from "keycloak-js";
import QuestionList from "./QuestionList";
import Navbar from './Navbar';

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
    });
  }

  render() {
    if(!this.state.authenticated){
      return(
        <div>
          <Navbar/>
          <div>Please wait...</div>
        </div>);
    }else{
      return(
        <div>
          <Navbar loggedIn keycloak={this.state.keycloak}>
            <QuestionList/>
          </Navbar>
        </div>
      );
    }    
  }
}

export default Login;
