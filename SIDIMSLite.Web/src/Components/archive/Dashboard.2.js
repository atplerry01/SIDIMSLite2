import React,  { Component } from 'react';
import { connect } from "react-redux";
import RichTextEditor from 'react-rte';

class Dashboard extends Component {

    componentWillMount() {
        // console.log('Mount');
        // console.log(this.props.issuesTrackers);
    }

    state = {
        value: RichTextEditor.createEmptyValue()
      }

      onChange = (value) => {
        this.setState({value});
        if (this.props.onChange) {
          // Send the changes up to the parent component as an HTML string.
          // This is here to demonstrate using `.toString()` but in a real app it
          // would be better to avoid generating a string on each change.
          this.props.onChange(
            value.toString('html')
          );
        }
      };

    render() {

        return (
            <div>
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange} />
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
      issuesTrackers: state.issueTrackers
    };
}

export default connect(mapStateToProps)(Dashboard)