import './Navbar.css';
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
                        console.log("navbar button clicked")
                        this.props.toggleSidebar()
                    }}>Button</button>

                </div>


            </React.Fragment>
        );
    }
}


export default Navbar
