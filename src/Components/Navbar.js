import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AskQuestion from "@material-ui/icons/RecordVoiceOver";
import QuestionList from "@material-ui/icons/List";
import Logout from "@material-ui/icons/ExitToApp";
import Login from "@material-ui/icons/Person";
import { withStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      keycloak: null,
      authenticated: false
    };
  }

  static propTypes = {
    keycloak: PropTypes.objectOf(PropTypes.any),
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onClickLogin = () => {
    this.props.history.push("questions");
  };

  onClickLogout = () => {
    this.props.history.push("");
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/realms/PoliticianPoll/protocol/openid-connect/logout',
      headers: {'Authorization' : `Bearer ${this.props.data.Login.token}`}, 
      data: {
        client_id: 'politicianpollreact',
        refresh_token: this.props.data.Login.keycloak.refreshToken,
      }
    });
    this.props.dispatch({type: "LOGOUT", data: null})
    this.props.keycloak.logout();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Politician Poll
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer variant="persistent" anchor="left" open={this.state.open}>
            <div>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                {["Ask a question", "My questions"].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <AskQuestion /> : <QuestionList />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              {!this.props.data.Login.authenticated && (
                <ListItem onClick={this.onClickLogin}>
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItem>
              )}
              {this.props.data.Login.authenticated && (
                <ListItem onClick={this.onClickLogout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItem>
              )}
            </div>
          </Drawer>
          <main className={clsx(classes.content)}>
            <div className={classes.drawerHeader} />
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    keycloak: state.Login.keycloak,
    data: state,
  };
};

export default connect(mapStateToProps) (withRouter(withStyles(styles)(Navbar)));
