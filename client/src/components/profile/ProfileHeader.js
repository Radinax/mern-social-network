import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/isEmpty";

const socialMedia = ["twitter", "linkedin", "facebook", "instagram", "youtube"];

const ProfileHeader = ({ profile }) => {
  const avatar = (
    <div className="row">
      <div className="col-4 col-md-3 m-auto">
        <img className="rounded-circle" src={profile.user.avatar} alt="" />
      </div>
    </div>
  );

  const userName = (
    <h1 className="display-4 text-center">{profile.user.name}</h1>
  );

  const company = (
    <p className="lead text-center">
      {profile.status}{" "}
      {isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
    </p>
  );

  const location = !isEmpty(profile.location) && <p>{profile.location}</p>;

  const website = !isEmpty(profile.website) && (
    <a
      rel="noopener noreferrer"
      className="text-white p-2"
      href={profile.website}
      target="_blank"
    >
      <i className="fas fa-globe fa-2x" />
    </a>
  );

  const socialLinks =
    !isEmpty(profile.social) &&
    socialMedia.map((media, index) => {
      if (profile.social[media]) {
        return (
          <a
            rel="noopener noreferrer"
            className="text-white p-2"
            href={profile.social[media]}
            target="_blank"
            key={index}
          >
            <i className={`fab fa-${media} fa-2x`} />
          </a>
        );
      } else {
        return null;
      }
    });

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          {avatar}
          <div className="text-center">
            {userName}
            {company}
            {location}
            <p>
              {website}
              {socialLinks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileHeader;
