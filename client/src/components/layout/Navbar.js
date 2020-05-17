import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../ducks/slices/loginSlice";
import { clearProfile } from "../../ducks/slices/profileSlice";

const mapDispatchToProps = { logoutUser, clearProfile };
const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  user: state.login.user,
});

const Navbar = ({ isAuthenticated, user, logoutUser, clearProfile }) => {
  const history = useHistory();

  const onLogOutClick = (e) => {
    e.preventDefault();
    clearProfile();
    logoutUser(history);
  };

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <button onClick={onLogOutClick} className="nav-link btn btn-link">
          <img
            className="rounded-circle"
            src={user.avatar}
            style={{ width: "25px", marginRight: "5px" }}
            alt={user.name}
            title="You must have a Gravayar connected to your email to display an image"
          />
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="landing.html">
          DevUnited
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="profiles.html">
                {" "}
                Developers
              </a>
            </li>
          </ul>

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
