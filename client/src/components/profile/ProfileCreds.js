import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileCreds = ({ education, experience }) => {
  const dateCreds = (date) => <Moment format="YYYY/MM/DD">{date}</Moment>;

  // Helper for setting sections that are not required
  const notRequiredSection = (info, text) =>
    info === "" ? null : (
      <p>
        <span>
          <strong>{text}: </strong> {info}
        </span>
      </p>
    );

  // Helper for setting required sections
  const requiredSection = (info, text) => (
    <p>
      <strong>{text}:</strong> {info}
    </p>
  );

  // Experience data of the user
  const expItems = experience.map((exp) => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        {dateCreds(exp.from)} - {exp.to === null ? " Now" : dateCreds(exp.to)}
      </p>
      {requiredSection(exp.title, "Position")}
      {notRequiredSection(exp.location, "Location")}
      {notRequiredSection(exp.description, "Description")}
    </li>
  ));

  // Education data of the user
  const eduItems = education.map((edu) => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.school}</h4>
      <p>
        {dateCreds(edu.from)} - {edu.to === null ? " Now" : dateCreds(edu.to)}
      </p>
      {requiredSection(edu.degree, "Degree")}
      {requiredSection(edu.fieldOfStudy, "Field of Study")}
      {notRequiredSection(edu.description, "Description")}
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        {expItems.length > 0 ? (
          <ul className="list-group">{expItems}</ul>
        ) : (
          <p className="text-center">No Experience Listed</p>
        )}
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        {expItems.length > 0 ? (
          <ul className="list-group">{eduItems}</ul>
        ) : (
          <p className="text-center">No Education Listed</p>
        )}
      </div>
    </div>
  );
};

ProfileCreds.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired,
};

export default ProfileCreds;
