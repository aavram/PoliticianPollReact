import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class Logout extends Component {

  logout() {
    this.props.history.push('/');
    this.props.keycloak.logout();
    this.props.dispatch({type: "LOGOUT", data: null})
  }

  render() {
    return (
      <button onClick={ () => this.logout() }>
        Logout
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

export default connect(mapStateToProps) (withRouter(Logout));