import "./DataLists.css";
import React from "react";
import UsersList from "./UsersList";
import { PieChart } from "react-minimal-pie-chart";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class DataLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        };

        this.sendUserDataToDataList = this.sendUserDataToDataList.bind(this);
    }

    sendUserDataToDataList(data) {
        this.setState({
            userData: data,
        });
    }

    analyzeUserTitles(userData) {
        let titleOccurences = {
            mr: 0,
            ms: 0,
            mrs: 0,
            miss: 0,
        };
        for (let i = 0; i < userData.length; i++) {
            switch (userData[i].title) {
                case "mr":
                    titleOccurences["mr"]++;
                    break;
                case "ms":
                    titleOccurences["ms"]++;
                    break;
                case "mrs":
                    titleOccurences["mrs"]++;
                    break;

                case "miss":
                    titleOccurences["miss"]++;
                    break;
                default:
            }
        }
        return titleOccurences;
    }

    render() {
        let pieData = this.analyzeUserTitles(this.state.userData);
        const options = { //for the Highcharts pie chart component
            chart: {
                backgroundColor: "#ccc",
                plotBackgroundColor: "#ccc",
                plotFill: "#ccc",
                plotBorderWidth: null,
                plotShadow: false,
                type: "pie",
            },
            title: {
                text: "Distribution of titles in user data",
            },

            accessibility: {
                point: {
                    valueSuffix: "%",
                },
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                    },
                },
            },
            series: [
                {
                    name: "Occurrences",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Mr",
                            y: pieData["mr"],
                            sliced: true,
                            selected: true,
                        },
                        {
                            name: "Ms",
                            y: pieData["ms"],
                        },
                        {
                            name: "Mrs",
                            y: pieData["mrs"],
                        },
                        {
                            name: "Miss",
                            y: pieData["miss"],
                        },
                    ],
                },
            ],
        };
        return (
            <React.Fragment>
                <div id="users-list" className="data-list">
                    <h3>Users</h3>
                    <UsersList
                        itemsPerPage={10}
                        sendUserDataToDataList={this.sendUserDataToDataList}
                    />
                </div>

                <HighchartsReact
                    highcharts={Highcharts}
                    containerProps={{
                        className: "data-list",
                        id: "titles-distribution-container",
                    }}
                    options={options}
                />
            </React.Fragment>
        );
    }
}

export default DataLists;
