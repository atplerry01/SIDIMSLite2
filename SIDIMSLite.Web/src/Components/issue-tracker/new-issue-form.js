import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import TextAreaInput from '../common/TextAreaInput';

const NewIssueForm = ({ issueTracker, departments, issueTypes, onSave, onChange, saving, errors, loading }) => {

    const formStyle = {
        marginTop: '30px'
    };

    const title = {
        fontSize: '25px'
    }

    return (
        <section className="card-section">
                <div className="container">
                    <div className="col-lg-8 col-lg-offset-2">
                        <div className="card text-center" style={formStyle}>
                            <header className="text-center">
                                <h3 className="section-title" style={title}>Create New Issue</h3>
                            </header>

                            <form>
                                <div className="row">
                                    <div  className="col-md-6">
                                        <SelectInput
                                            name="departmentId"
                                            label=" Tartget Department"
                                            value= {issueTracker.departmentId}
                                            defaultOption= "Select IssueType"
                                            options={departments}
                                            onChange={onChange} error={errors.departmentId} />
                                
                                    </div>

                                    <div className="col-md-6">
                                        <SelectInput
                                            name="issueTypeId"
                                            label="IssueType"
                                            value={issueTracker.issueTypeId}
                                            defaultOption="Select IssueType"
                                            options={issueTypes}
                                            onChange={onChange} error={errors.issueTypeId} />
                                    </div>

                                    <div className="col-md-12">
                                        <TextInput
                                            name="title"
                                            label=""
                                            placeholder="Issue Title"
                                            value={issueTracker.title}
                                            onChange={onChange}
                                            error={errors.title} />
                                    </div>

                                    <div className="col-md-12">
                                        <TextAreaInput
                                            name="description"
                                            label=""
                                            placeholder="Issue description"
                                            value={issueTracker.description}
                                            onChange={onChange}
                                            error={errors.description} />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input 
                                            type="submit" 
                                            className="btn btn-success" 
                                            disabled={saving}
                                            value={saving ? 'Saving...' : 'Create Issue Tracker'} 
                                            onClick={onSave} />
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </section>
    );

};

NewIssueForm.propTypes = {
    issueTracker: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object
  };

export default NewIssueForm;
