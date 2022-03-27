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
        console.log("Data List reporting user data:")
        console.log(data)
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
                // code block
            }
        }
        return titleOccurences
    }
    render() {
        console.log("data lists state:")
        console.log(this.state.userData)
        let pieData = this.analyzeUserTitles(this.state.userData)
        console.log("pie data:")
        console.log(pieData)

        return (
            <React.Fragment>

                <div id="users-list" className='data-list'>
                    <UsersList itemsPerPage={10} sendUserDataToDataList={this.sendUserDataToDataList} />

                </div>
                <div id="titles-distribution" className='data-list'>
                    <div id="pie-chart-legend">
                        <p style={{ backgroundColor: '#E38627' }}>Mr: {pieData['mr']}</p>
                        <p style={{ backgroundColor: '#C13C37' }}>Ms: {pieData['ms']}</p>
                        <p style={{ backgroundColor: '#6A2135' }}>Mrs: {pieData['mrs']}</p>
                        <p style={{ backgroundColor: '#5599AA' }}>Miss: {pieData['miss']}</p>
                    </div>
                    <PieChart
                        data={[
                            { title: 'mr', value: pieData['mr'], color: '#E38627' },
                            { title: 'ms', value: pieData['ms'], color: '#C13C37' },
                            { title: 'mrs', value: pieData['mrs'], color: '#6A2135' },
                            { title: 'miss', value: pieData['miss'], color: '#5599AA' },
                        ]}

                    // onMouseOver={(e) => {
                    //     console.log("mouse over")
                    //     console.log(e)
                    // }}

                    // label={(labelRenderProps) =>
                    //     10 | 'ss' | React.ReactElement | undefined | null

                    // }
                    />;
                </div>



            </React.Fragment>
        );
    }
}


export default DataLists