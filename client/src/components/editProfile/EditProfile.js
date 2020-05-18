// Libraries
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
// Components
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import Spinner from "../common/Spinner";
// Utilities
import { isEmpty } from "../../utils/isEmpty";
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
  const [handle, setHandle] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [skills, setSkills] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (isEmpty(profile)) {
      getCurrentProfile();
    } else {
      setHandle(!isEmpty(profile.handle) ? profile.handle : "");
      setCompany(!isEmpty(profile.company) ? profile.company : "");
      setWebsite(!isEmpty(profile.website) ? profile.website : "");
      setLocation(!isEmpty(profile.location) ? profile.location : "");
      setStatus(!isEmpty(profile.status) ? profile.status : "");
      setSkills(!isEmpty(profile.skills) ? profile.skills.join(",") : "");
      setGithubUsername(
        !isEmpty(profile.githubUsername) ? profile.githubUsername : ""
      );
      setBio(!isEmpty(profile.bio) ? profile.bio : "");
      if (!isEmpty(profile.social)) {
        setTwitter(
          !isEmpty(profile.social.twitter) ? profile.social.twitter : ""
        );
        setFacebook(
          !isEmpty(profile.social.facebook) ? profile.social.facebook : ""
        );
        setLinkedin(
          !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ""
        );
        setYoutube(
          !isEmpty(profile.social.youtube) ? profile.social.youtube : ""
        );
        setInstagram(
          !isEmpty(profile.social.instagram) ? profile.social.instagram : ""
        );
      }
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
        skills,
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

  const onChange = (setter) => (e) => setter(e.target.value);

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
        onChange={onChange(setTwitter)}
        error={error.twitter}
      />
      <InputGroup
        placeholder="Facebook Profile URL"
        name="Facebook"
        icon="fab fa-facebook"
        value={facebook}
        onChange={onChange(setFacebook)}
        error={error.facebook}
      />
      <InputGroup
        placeholder="Instagram Profile URL"
        name="Instagram"
        icon="fab fa-instagram"
        value={instagram}
        onChange={onChange(setInstagram)}
        error={error.instagram}
      />
      <InputGroup
        placeholder="Youtube Profile URL"
        onChange={onChange(setYoutube)}
        name="Youtube"
        icon="fab fa-youtube"
        value={youtube}
        error={error.youtube}
      />
      <InputGroup
        placeholder="Linkedin Profile URL"
        onChange={onChange(setLinkedin)}
        name="Linkedin"
        icon="fab fa-linkedin"
        value={linkedin}
        error={error.linkedin}
      />
    </div>
  );

  // Select options for status
  const options = [
    {
      label: "* Select Professional Status",
      value: 0,
    },
    {
      label: "Developer",
      value: "Developer",
    },
    {
      label: "Junior Developer",
      value: "Junior Developer",
    },
    {
      label: "Senior Developer",
      value: "Senior Developer",
    },
    {
      label: "Manager",
      value: "Manager",
    },
    {
      label: "Student or Learning",
      value: "Student or Learning",
    },
    {
      label: "Instructor or Teacher",
      value: "Instructor or Teacher",
    },
    {
      label: "Intern",
      value: "Intern",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile handle"
                name="handle"
                value={handle}
                onChange={onChange(setHandle)}
                error={error.handle}
                info="A unique handle for your profile URL. You full name, company name, nickname)"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                onChange={onChange(setStatus)}
                options={options}
                error={error.status}
                info="Give us an idea where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={onChange(setCompany)}
                error={error.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={onChange(setWebsite)}
                error={error.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange(setLocation)}
                error={error.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange(setSkills)}
                error={error.skills}
                info="Please use comma separated values (eg. HTML,CSS,Javascript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubUsername"
                value={githubUsername}
                onChange={onChange(setGithubUsername)}
                error={error.githubUsername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={onChange(setBio)}
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
