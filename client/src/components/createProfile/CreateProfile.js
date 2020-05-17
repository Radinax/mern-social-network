import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
// Redux Action
import { createProfile } from "../../ducks/slices/profileSlice";

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  error: state.profile.error,
});
const mapDispatchToProps = { createProfile };

const CreateProfile = ({ profile, error, createProfile }) => {
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

  const onClick = () => {
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
            <h1 className="display-4 text-center">Create Your profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
