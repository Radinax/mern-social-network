import React, { useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty } from "../../utils/isEmpty";

const ProfileGithub = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const ref = createRef();

  const clientId = "27fe2b727682620c7e7c";
  const clientSecret = "56c16bdf46eed17a1caefe0e7038b9f65259896e";
  const count = 5;
  const sort = "created: asc";

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => console.log(err));
  }, [username]);

  // Shows the last five repositories for the user
  const repoItems =
    !isEmpty(repos) &&
    repos.map((repo) => {
      // Name of the repository
      const repoName = (
        <div className="col-md-6">
          <h4>
            <Link to={repo.html_url} className="text-info" target="_blank">
              {repo.name}
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
      );

      // Number of stars, watchers and forks
      const repoData = (
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">Forks: {repo.forks_count}</span>
        </div>
      );
      return (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            {repoName}
            {repoData}
          </div>
        </div>
      );
    });

  return (
    <div ref={ref}>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
