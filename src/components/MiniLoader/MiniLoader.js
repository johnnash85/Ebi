import React, { Component } from "react";

import "./Loader.css";

export default class MiniLoader extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="lds-grid">
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
