import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";
// Components
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
// Redux Actions
import { getProfileByHandle } from "../../ducks/slices/profileSlice";

const mapDispatchToProps = { getProfileByHandle };
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

const Profile = ({ profile, getProfileByHandle, loading }) => {
  const { handle } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (handle) {
      getProfileByHandle(handle);
    }
    if (profile === null && loading) {
      history.push("/not-found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Spinner />;

  const profileContent = profile && (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/profiles" className="btn btn-light mb-3 float-left">
            Back To Profiles
          </Link>
        </div>
        <div className="cold-md-6" />
      </div>
      <ProfileHeader profile={profile} />
      <ProfileAbout profile={profile} />
      <ProfileCreds
        education={profile.education}
        experience={profile.experience}
      />
      {profile.githubUsername && (
        <ProfileGithub username={profile.githubUsername} />
      )}
    </div>
  );

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  getProfileByHandle: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  profile: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
