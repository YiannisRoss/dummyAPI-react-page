import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Box from './Box';

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
    let boxList = []
    let boxCount = 4
    for (let i = 0; i < boxCount; i++) {
      let newBox = <Box label={i + 1} />
      boxList = boxList.concat(newBox)

    }
    return (
      <div id="container">
        <Navbar toggleSidebar={this.toggleSidebar} />
        <div id="main-page-container">
          {this.state.isSidebarVisible && <Sidebar />}
          <div id="page-contents">
            <div id='boxes-container'>
              {boxList}
            </div>
            <div id="data-lists-container">

            </div>
          </div>
        </div>
      </div>
    );
  }


}
export default App;
