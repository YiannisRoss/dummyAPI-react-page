import "./DataLists.css"
import React from "react"
import PropTypes from "prop-types"
import UsersList from "./UsersList";
import { PieChart } from "react-minimal-pie-chart";

class DataLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };


        this.sendUserDataToDataList = this.sendUserDataToDataList.bind(this);

    }

    sendUserDataToDataList(data) {

        this.setState({
            userData: data
        });
    }

    analyzeUserTitles(userData) {
        let titleOccurences = {
            'mr': 0,
            'ms': 0,
            'mrs': 0,
            'miss': 0
        }
        for (let i = 0; i < userData.length; i++) {
            switch (userData[i].title) {
                case "mr":

                    titleOccurences['mr']++
                    break;
                case "ms":
                    titleOccurences['ms']++
                    break;
                case "mrs":
                    titleOccurences['mrs']++
                    break;

                case "miss":
                    titleOccurences['miss']++
                    break;

                default:
            }
        }
        return titleOccurences
    }

    togglePieChartPopup(pieSegmentIndex) {
        console.log('toggle piechart popup called on segment index ' + pieSegmentIndex)
        let selectedSegment
        let selectedSegmentText
        let pieData = this.analyzeUserTitles(this.state.userData)

        switch (pieSegmentIndex) {
            case 0:
                selectedSegment = 'Mr'

                break;
            case 1:
                selectedSegment = 'Ms'
                break;
            case 2:
                selectedSegment = 'Mrs'
                break;
            case 3:
                selectedSegment = 'Miss'
                break;
            default:
        }
        console.log('should be ' + selectedSegment)
        selectedSegmentText = `Title "${selectedSegment}" appears ${pieData[selectedSegment.toLowerCase()]} times`

        let popupElement = document.getElementById('pie-chart-popup')
        if (popupElement.style.display === 'block') {
            popupElement.style.display = 'none'
        }
        else {
            popupElement.style.display = 'block'
            popupElement.innerHTML = selectedSegmentText
            let popupColor = null
            switch (selectedSegment) {
                case 'Mr':
                    popupColor = '#E38627'
                    break;
                case 'Ms':
                    popupColor = '#C13C37'
                    break;
                case 'Mrs':
                    popupColor = '#6A2135'
                    break;
                case 'Miss':
                    popupColor = '#5599AA'
                    break;
                default:
            }
            popupElement.style.backgroundColor = popupColor
        }
    }

    render() {
        let pieData = this.analyzeUserTitles(this.state.userData)

        console.log("data lists state:")
        console.log(this.state.userData)
        console.log("pie data:")
        console.log(pieData)

        return (
            <React.Fragment>

                <div id="users-list" className='data-list'>
                    <h3>Users</h3>
                    <UsersList itemsPerPage={10} sendUserDataToDataList={this.sendUserDataToDataList} />

                </div>
                <div id="titles-distribution-container" className='data-list'>
                    <h3>Titles distribution</h3>
                    <div id="pie-chart-legend">
                        <p style={{ backgroundColor: '#E38627' }}>Mr: {pieData['mr']}</p>
                        <p style={{ backgroundColor: '#C13C37' }}>Ms: {pieData['ms']}</p>
                        <p style={{ backgroundColor: '#6A2135' }}>Mrs: {pieData['mrs']}</p>
                        <p style={{ backgroundColor: '#5599AA' }}>Miss: {pieData['miss']}</p>
                    </div>
                    <div id='pie-chart-container'>
                        <div id='pie-chart-popup'>

                        </div>
                        <PieChart
                            onMouseOver={(e, segmentIndex) => {

                                this.togglePieChartPopup(segmentIndex)
                            }}
                            onMouseOut={(e, segmentIndex) => {

                                this.togglePieChartPopup(segmentIndex)
                            }}
                            data={[
                                { title: 'mr', value: pieData['mr'], color: '#E38627' },
                                { title: 'ms', value: pieData['ms'], color: '#C13C37' },
                                { title: 'mrs', value: pieData['mrs'], color: '#6A2135' },
                                { title: 'miss', value: pieData['miss'], color: '#5599AA' },
                            ]}



                        />
                    </div>
                </div>



            </React.Fragment>
        );
    }
}


export default DataLists
