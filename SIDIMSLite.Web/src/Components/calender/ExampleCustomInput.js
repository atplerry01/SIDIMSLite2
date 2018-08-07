import React from "react";
import PropTypes from 'prop-types';

class ExampleCustomInput extends React.Component {

    render () {
        {/*onChange={this.handleDateChange}*/}

      return (
      
        <i className="fa fa-calendar" aria-hidden="true" onClick={this.props.onClick}> {' '}{this.props.value}</i>
      )
    }
  }
  
ExampleCustomInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};
export default ExampleCustomInput;