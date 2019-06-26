import React from "react";
import Avatar from "@material-ui/core/Avatar";
import image from "../Andra.jpg";
import Grid from "@material-ui/core/Grid";

const Question = props => (
  <div>
    <Grid container>
      <Grid item xs={12}>
        <h4>{props.title}</h4>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <div>{props.content}</div>
        </Grid>
        <Grid item>
          <Avatar alt="Politician" src={image} />
        </Grid>
      </Grid>
    </Grid>
  </div>
);
export default Question;
