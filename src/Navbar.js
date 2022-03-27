import './Navbar.scss';
import React from "react"
import PropTypes from "prop-types"
class Navbar extends React.Component {
    // constructor(props) {
    //     super(props);


    // }

    render() {


        return (
            <React.Fragment>

                <div id="navbar">
                    <button onClick={() => {
                        this.props.toggleSidebar()
                    }}>Button</button>
                    <div id="title-container">
                        <h1>React dummyAPI data page</h1>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}


export default Navbar
