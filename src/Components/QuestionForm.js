import React, { Component } from "react";
import Keycloak from "keycloak-js";
import Logout from "../Logout";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    position: "absolute",
    bottom: 0
  },
});

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false, socialId: 0 };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      this.props.dispatch({ type: "LOGIN", data: keycloak });
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    if (this.props.data.Login.authenticated)
      return (
        <div>
          <TextField
            label="Title"
            placeholder="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange("title")}
          />
          <TextField
            label="Description"
            placeholder="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange("content")}
          />
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>
              Please provide social information of recipient
            </div>
            <Grid container>
              <Grid item xs={4}>
                <FormControl variant="outlined" width={60}>
                  <Select
                    native
                    value={this.state.socialId}
                    onChange={this.handleChange("socialId")}
                    input={<OutlinedInput />}
                  >
                    <option value={0}>Facebook</option>
                    <option value={1}>Twitter</option>
                    <option value={2}>LinkedIn</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Social Username"
                  placeholder="Social Network Username"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={this.onClick}
            >
              Submit
            </Button>
          </div>
        </div>
      );
    else return <div>Please wait...</div>;
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

export default  withStyles(styles) (connect(mapStateToProps) (QuestionForm));
