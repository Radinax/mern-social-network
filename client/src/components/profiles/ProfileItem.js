import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty } from "../../utils/isEmpty";

const ProfileItem = ({ profile }) => {
  // User avatar
  const avatar = (
    <div className="col-2">
      <img src={profile.user.avatar} alt="" className="rounded-circle" />
    </div>
  );

  // Username
  const username = <h3>{profile.user.name}</h3>;

  // Work status
  const status = (
    <p>
      {profile.status}{" "}
      {!isEmpty(profile.company) && <span>at {profile.company}</span>}
    </p>
  );

  // Location
  const location = (
    <p>{!isEmpty(profile.location) && <span>{profile.location}</span>}</p>
  );

  // View Profile Button
  const viewProfile = (
    <Link to={`/profile/${profile.handle}`} className="btn btn-info">
      View Profile
    </Link>
  );

  // List of user skills
  const skills = (
    <ul className="list-group">
      {profile.skills.slice(0, 4).map((skill, index) => (
        <li key={index} className="list-group-item">
          <i className="fa fa-check pr-1" />
          {skill}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        {avatar}
        <div className="col-lg-6 md-4 col-8">
          {username}
          {status}
          {location}
          {viewProfile}
        </div>
        <div className="col-md-4 d-none d-md-block">
          <h4>Skill Set</h4>
          {skills}
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
