import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';

class IssueTrackerTables extends Component {

    onHandleClick(value) {
        this.props.handleDelete(value);
    };

    onHandlEditClick(value) {
        this.props.handleEdit(value);
    }

    navigateSelected(value) {
        this.props.handleNavView(value);
    }

    manageTextlength(data) {
        if (data.length > 25) {
            return data.substr(0, 25) + '...';
        } else {
            return data;
        }
    };

    render() {
        const list = () => {

            {/*
            return this.props.issueTrackers.map((issueTracker, index) => {
                //const createdDate = issueTracker.createOn;
                //<td>{moment(dueDate).add('days', 4).calendar()}</td>
                //const dueDate = issueTracker.createOn;
                return (
                    <tr key={issueTracker.id} >
                        <td><a href={issueTracker.id} target="_blank">{index + 1}</a></td>
                        <td><NavLink to={'/issue/' + issueTracker.id}>{issueTracker.title}</NavLink></td>
                        <td onClick={this.navigateSelected.bind(this, issueTracker)}>{this.manageTextlength(issueTracker.description)}</td>
                        <td>{issueTracker.department.name}</td>
                        <td>{issueTracker.issueType.name}</td>
                        <td>{moment(new Date(issueTracker.createOn)).format("DD-MMM-YYYY")}</td>
                        <td>{moment(issueTracker.dueDate).calendar()}</td>
                        <td>
                            <i onClick={this.onHandleClick.bind(this, issueTracker)} className="fa fa-trash" aria-hidden="true"></i>
                            <i onClick={this.onHandlEditClick.bind(this, issueTracker)} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </td>
                    </tr>
                )
            })
            */}

        };

        return (
            <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Department</th>
                        <th>Issue Type</th>
                        <th>CreatedOn</th>
                        <th>Due Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list()}
                </tbody>

            </table>

        </div>
        );
    }
}

export default IssueTrackerTables;
