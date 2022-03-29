import "./Navbar.scss";
import React from "react";
import PropTypes from "prop-types";
class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="navbar">
          <img
            src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"
            onClick={() => {
              this.props.toggleSidebar();
            }}
            alt="Open sidebar button"
          ></img>
          <div id="title-container">
            <h1>React dummyAPI data page</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
