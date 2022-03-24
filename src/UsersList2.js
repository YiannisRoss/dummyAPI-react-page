import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import PropTypes from "prop-types"
class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentItems: null,
            pageCount: 0,
            itemOffset: 0
        };
    }


    componentDidMount() {

        console.log("users list component did mount")
        fetch("https://dummyapi.io/data/v1/user", {
            method: 'GET',
            headers: {
                'app-id': '623ba0ddb2cbd40f0cdeed0b',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result")
                    console.log(result)

                },

                (error) => {

                }
            )

    }
    render() {


        return (
            <React.Fragment>
                {/* paginated, 10 users per page */}

                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>

                        </tr>
                    </tbody>
                </table>


            </React.Fragment>
        );
    }
}


export default UsersList





