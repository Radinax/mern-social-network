import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import classnames from "classnames";
import { isEmpty } from "../../utils/isEmpty";
// Actions
import { authUser } from "../../ducks";

const mapDispatchToProps = { authUser };
const mapStateToProps = (state) => ({
  data: state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error,
});

const Register = ({ authUser, data, loading, error }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  console.log("data", data);
  console.log("error", error);

  useEffect(() => {
    setErrors({ ...error });
  }, [error]);

  const onChange = (setter) => (e) => setter(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password, password2 };
    authUser(newUser);
  };

  const registerTitle = <h1 className="display-4 text-center">Sign Up</h1>;
  const registerSubTitle = (
    <p className="lead text-center">Create your DevConnector account</p>
  );
  const gravatarMessage = (
    <small className="form-text text-muted">
      This site uses Gravatar so if you want a profile image, use a Gravatar
      email
    </small>
  );

  const input = (type, placeholder, name, value, setter, gravatar) => (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": !isEmpty(errors),
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange(setter)}
      />
      {!isEmpty(errors) && (
        <div className="invalid-feedback">{errors[name]}</div>
      )}
      {gravatar && gravatarMessage}
    </div>
  );

  const form = (
    <form noValidate onSubmit={onSubmit}>
      {input("text", "Name", "name", name, setName)}
      {input("email", "Email Address", "email", email, setEmail, true)}
      {input("password", "Password", "password", password, setPassword)}
      {input(
        "password",
        "Confirm Password",
        "password2",
        password2,
        setPassword2
      )}
      <input type="submit" className="btn btn-info btn-block mt-4" />
    </form>
  );

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            {registerTitle}
            {registerSubTitle}
            {form}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
