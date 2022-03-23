import './Box.css';
import React from "react"
import PropTypes from "prop-types"
class Box extends React.Component {
    // constructor(props) {
    //     super(props);


    // }

    render() {


        return (
            <React.Fragment>

                <div className="box">
                    <h3> {this.props.label}</h3>

                </div>


            </React.Fragment>
        );
    }
}


export default Box
