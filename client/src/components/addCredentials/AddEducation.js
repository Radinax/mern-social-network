import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// Components
import Spinner from "../common/Spinner";
import TextFieldGroup from "../common/TextFieldGroup";
// Redux Actions
import { addEducation } from "../../ducks/slices/profileSlice";

const mapDispatchToProps = { addEducation };

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  error: state.profile.error,
  loading: state.profile.loading,
});

const AddEducation = ({ profile, error, loading, addEducation }) => {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
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
    addEducation(
      {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
      },
      history
    );
  };

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* School"
                onChange={onChange(setSchool)}
                name="school"
                value={school}
                error={error.school}
              />
              <TextFieldGroup
                placeholder="* Degree or Certification"
                onChange={onChange(setDegree)}
                name="degree"
                value={degree}
                error={error.degree}
              />
              <TextFieldGroup
                placeholder="* Field Of Study"
                onChange={onChange(setFieldOfStudy)}
                name="fieldOfStudy"
                value={fieldOfStudy}
                error={error.fieldOfStudy}
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
                placeholder="Program Description"
                onChange={onChange(setDescription)}
                name="description"
                value={description}
                error={error.description}
                info="Tell us about the program you were in"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
