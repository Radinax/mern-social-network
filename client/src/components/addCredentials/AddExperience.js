import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// Components
import Spinner from "../common/Spinner";
import TextFieldGroup from "../common/TextFieldGroup";
// Redux Actions
import { addExperience } from "../../ducks/slices/profileSlice";

const mapDispatchToProps = { addExperience };

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  error: state.profile.error,
  loading: state.profile.loading,
});

const AddExperience = ({ profile, error, loading, addExperience }) => {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  if (loading) return <Spinner />;

  const onChange = (setter) => (e) => setter(e.target.value);

  const onCheck = (e) => {
    setCurrent(!current);
    setDisabled(!disabled);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(
      {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
      },
      history
    );
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past or current
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={company}
                onChange={onChange(setCompany)}
                error={error.company}
              />
              <TextFieldGroup
                placeholder="* Job Title"
                onChange={onChange(setTitle)}
                name="title"
                value={title}
                error={error.title}
              />
              <TextFieldGroup
                placeholder="* Location"
                onChange={onChange(setLocation)}
                name="location"
                value={location}
                error={error.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                type="date"
                onChange={onChange(setFrom)}
                name="from"
                value={from}
                error={error.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                type="date"
                onChange={onChange(setTo)}
                name="to"
                value={to}
                error={error.to}
                disabled={disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextFieldGroup
                placeholder="Job Description"
                onChange={onChange(setDescription)}
                name="description"
                value={description}
                error={error.description}
                info="Tell us about the position"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);
