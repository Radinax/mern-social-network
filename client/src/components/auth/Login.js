import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
// import classnames from "classnames";
// Components
import TextFieldGroup from "../common/TextFieldGroup";
// Actions
import { loginUser } from "../../ducks";
// Utils
// import { isEmpty } from "../../utils/isEmpty";

const mapDispatchToProps = { loginUser };
const mapStateToProps = (state) => ({
  data: state.login.user,
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
});

const Login = ({ loginUser, data, isAuthenticated, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  const onChange = (setter) => (e) => setter(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    loginUser(user, history);
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevUnited account
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={onChange(setEmail)}
                error={error.email}
              />
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={onChange(setPassword)}
                error={error.password}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
