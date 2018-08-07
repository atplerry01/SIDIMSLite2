import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const IssueTrackerForm = ({ issueTracker, departments, issueTypes, allAuthors, onSave, onChange, saving, errors }) => {

  return (
    <form>
      <h1>Manage issueTracker</h1>

      <SelectInput
        name="departmentId"
        label=" Tartget Department"
        value= {issueTracker.departmentId}
        defaultOption= "Select IssueType"
        options={departments}
        onChange={onChange} error={errors.departmentId} />

      <SelectInput
        name="issueTypeId"
        label="IssueType"
        value={issueTracker.issueTypeId}
        defaultOption="Select IssueType"
        options={issueTypes}
        onChange={onChange} error={errors.issueTypeId} />

      <TextInput
        name="title"
        label="Title"
        value={issueTracker.title}
        onChange={onChange}
        error={errors.title} />

      <TextInput
        name="description"
        label="description"
        value={issueTracker.description}
        onChange={onChange}
        error={errors.description} />

      <TextInput
        name="createdBy"
        label="createdBy"
        value={issueTracker.createdBy}
        onChange={onChange}
        error={errors.createdBy} />

      <TextInput
        name="dueDate"
        label="dueDate"
        value={issueTracker.dueDate}
        onChange={onChange}
        error={errors.dueDate} />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

IssueTrackerForm.propTypes = {
  issueTracker: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default IssueTrackerForm;
