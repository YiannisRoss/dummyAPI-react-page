import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarVisible: true
    };


    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    console.log("toggle sidebar called")
    this.setState({
      isSidebarVisible: !(this.state.isSidebarVisible)
    });
  }
  render() {

    return (
      <div id="container">
        <Navbar toggleSidebar={this.toggleSidebar} />
        <div id="main-page-container">
          {this.state.isSidebarVisible && <Sidebar />}
          <div id="page-contents">

          </div>
        </div>
      </div>
    );
  }


}
export default App;
