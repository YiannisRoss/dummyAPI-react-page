import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Box from './Box';
import UsersList from './UsersList';
import { PieChart } from 'react-minimal-pie-chart';

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
              <div id="users-list" className='data-list'>
                <UsersList itemsPerPage={10} />

              </div>
              <div id="titles-distribution" className='data-list'>
                <PieChart
                  data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                  ]}
                />;
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }


}
export default App;
