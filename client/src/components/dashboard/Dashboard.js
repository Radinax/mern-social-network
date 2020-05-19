import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// Components
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
// Redux Actions
import {
  getCurrentProfile,
  deleteAccount,
} from "../../ducks/slices/profileSlice";
import { setCurrentUser } from "../../ducks/slices/loginSlice";

const mapDispatchToProps = { getCurrentProfile, setCurrentUser, deleteAccount };
const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  error: state.profile.error,
  login: state.login,
});

const Dashboard = ({
  getCurrentProfile,
  profile,
  login,
  loading,
  error,
  setCurrentUser,
  deleteAccount,
}) => {
  const { user } = login;

  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Spinner />;

  const handle = profile === null ? "" : profile.handle;
  const experience = profile === null ? "" : profile.experience;
  const education = profile === null ? "" : profile.education;

  const onDeleteClick = (e) => {
    deleteAccount();
    setCurrentUser({});
  };

  const userProfile = (
    <div>
      <p className="lead text-muted">
        Welcome <Link to={`/profile/${handle}`}>{user.name}</Link>
      </p>
      <ProfileActions />
      <Experience data={experience} />
      <Education data={education} />
      <div style={{ marginBottom: "60px" }} />
      <button onClick={onDeleteClick} className="btn btn-danger">
        Delete My Account
      </button>
    </div>
  );

  const requestUserProfile = (
    <div>
      <p className="lead text-muted">Welcome {user.name}</p>
      <p>You have not yet setup a profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-lg btn-info">
        Create Profile
      </Link>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {profile === null ? requestUserProfile : userProfile}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
