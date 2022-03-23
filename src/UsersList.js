
import React from "react"
import PropTypes from "prop-types"
class UsersList extends React.Component {
    constructor(props) {
        super(props);


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
