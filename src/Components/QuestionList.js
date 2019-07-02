import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { API_HOST } from "../config";
import Question from "./Question";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Navbar from "./Navbar";
import Keycloak from "keycloak-js";
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  button: {
    position: "absolute",
    bottom: 0
  },
  list: {
    marginTop: 0,
  }
});

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      keycloak: null,
      authenticated: false,
    };
  }

  componentDidMount = () => {
    const url = `${API_HOST}questions/questions`;
    axios.get(url).then(response => {
      this.setState({ list: response.data });
    });
  };

  onClick = () => {
    this.props.history.push("ask");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Grid container spacing={3} className={classes.list}>
            {this.state.list.map((question, i) => {
              return (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Question
                      title={question.title}
                      content={question.content}
                    />
                  </Paper>
                </Grid>
              );
            })}
            <Button
              fullWidth
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={this.onClick}
            >
              Ask a question
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(QuestionList));
