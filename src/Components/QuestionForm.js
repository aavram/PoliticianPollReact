import React, { Component } from "react";
import Keycloak from "keycloak-js";
import Logout from "../Logout";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false, socialId: 0 };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
    });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated)
        return (
          <div>
            <TextField
              label="Title"
              placeholder="Title"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Description"
              placeholder="Description"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <div style={{ marginTop: 20 }}>
              <div style={{ marginBottom: 10 }}>Please provide social information of recipient</div>
              <Grid container>
                <Grid item xs={4}>
                  <FormControl variant="outlined" width={60}>
                    <Select
                      native
                      value={this.state.socialId}
                      onChange={() => {}}
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
            </div>
            <Logout keycloak={this.state.keycloak} />
          </div>
        );
      else return <div>Unable to authenticate!</div>;
    }
    return <div>Initializing Keycloak...</div>;
  }
}
export default QuestionForm;
