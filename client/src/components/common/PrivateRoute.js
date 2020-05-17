import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, login, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      login.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(PrivateRoute);
