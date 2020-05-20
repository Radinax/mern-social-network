import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItems from "./ProfileItem";
// Redux Actions
import { getProfiles } from "../../ducks/slices/profileSlice";

const mapDispatchToProps = { getProfiles };
const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading,
});

const Profiles = ({ profiles, loading, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (loading) return <Spinner />;

  // Used to check if there are any profiles
  const length = profiles === null ? "" : profiles.length;

  // List of all users profiles
  const profileItems =
    profiles &&
    profiles.map((profile) => (
      <ProfileItems key={profile._id} profile={profile} />
    ));

  const noProfiles = <h4>No Profiles found...</h4>;

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {length > 0 ? profileItems : noProfiles}
          </div>
        </div>
      </div>
    </div>
  );
};

Profiles.propTypes = {
  profiles: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

Profiles.defaultProps = {
  profiles: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
