import React, { Component } from "react";
import Link from "@material-ui/core/Link";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <p>This is your public-facing component.</p>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            alert("I'm a button.");
          }}
        >
          Button Link
        </Link>
      </div>
    );
  }
}
export default Welcome;
