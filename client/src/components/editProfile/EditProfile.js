// Libraries
import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
// Components
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import Spinner from "../common/Spinner";
// Utilities
import { isEmpty } from "../../utils/isEmpty";
import { options, initialState, reducer } from "./utils";
// Redux Action
import {
  createProfile,
  getCurrentProfile,
} from "../../ducks/slices/profileSlice";

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  error: state.profile.error,
  loading: state.profile.loading,
});
const mapDispatchToProps = { createProfile, getCurrentProfile };

const EditProfile = ({
  profile,
  error,
  createProfile,
  getCurrentProfile,
  loading,
}) => {
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    handle,
    company,
    website,
    location,
    status,
    skills,
    githubUsername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = state;
  const history = useHistory();

  const keys = Object.keys(initialState);

  const initializeState = (data, social) => {
    if (!isEmpty(data) && profile[data]) {
      return dispatch({ field: data, value: profile[data] });
    }
  };

  console.log("state", state);

  useEffect(() => {
    if (isEmpty(profile)) {
      getCurrentProfile();
    } else {
      // Key will be each property in the initial state
      keys.forEach((key) => {
        initializeState(key, !isEmpty(profile.social));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (loading) return <Spinner />;

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(
      {
        handle,
        company,
        website,
        location,
        status,
        skills: skills.toString(),
        githubUsername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
      },
      history
    );
  };

  // const onChange = (setter) => (e) => setter(e.target.value);
  const onChange = (e) =>
    dispatch({
      field: e.target.name.toLowerCase(),
      value: e.target.value,
    });

  const onClick = (e) => {
    e.preventDefault();
    setDisplaySocialInputs(!displaySocialInputs);
  };

  const socialInputs = (
    <div>
      <InputGroup
        placeholder="Twitter Profile URL"
        name="Twitter"
        icon="fab fa-twitter"
        value={twitter}
        onChange={onChange}
        error={error.twitter}
      />
      <InputGroup
        placeholder="Facebook Profile URL"
        name="Facebook"
        icon="fab fa-facebook"
        value={facebook}
        onChange={onChange}
        error={error.facebook}
      />
      <InputGroup
        placeholder="Instagram Profile URL"
        name="Instagram"
        icon="fab fa-instagram"
        value={instagram}
        onChange={onChange}
        error={error.instagram}
      />
      <InputGroup
        placeholder="Youtube Profile URL"
        onChange={onChange}
        name="Youtube"
        icon="fab fa-youtube"
        value={youtube}
        error={error.youtube}
      />
      <InputGroup
        placeholder="Linkedin Profile URL"
        onChange={onChange}
        name="Linkedin"
        icon="fab fa-linkedin"
        value={linkedin}
        error={error.linkedin}
      />
    </div>
  );

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Edit profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile handle"
                name="handle"
                value={handle}
                onChange={onChange}
                error={error.handle}
                info="A unique handle for your profile URL. You full name, company name, nickname)"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                onChange={onChange}
                options={options}
                error={error.status}
                info="Give us an idea where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={onChange}
                error={error.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={onChange}
                error={error.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
                error={error.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange}
                error={error.skills}
                info="Please use comma separated values (eg. HTML,CSS,Javascript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubUsername"
                value={githubUsername}
                onChange={onChange}
                error={error.githubUsername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={onChange}
                error={error.bio}
                info="Tell us a little about yourself"
              />

              <div className="mb-3">
                <button onClick={onClick} className="btn btn-light">
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {displaySocialInputs && socialInputs}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
