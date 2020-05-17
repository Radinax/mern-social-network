import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
// Components
import TextFieldGroup from "../common/TextFieldGroup";
// Actions
import { registerUser } from "../../ducks/slices/registerSlice";

const mapDispatchToProps = { registerUser };
const mapStateToProps = (state) => ({
  isAuthenticated: state.register.isAuthenticated,
  error: state.register.error,
});

const Register = ({ registerUser, error, isAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  const onChange = (setter) => (e) => setter(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password, password2 };
    registerUser(newUser, history);
  };

  const registerTitle = <h1 className="display-4 text-center">Sign Up</h1>;

  const registerSubTitle = (
    <p className="lead text-center">Create your DevConnector account</p>
  );

  const form = (
    <form noValidate onSubmit={onSubmit}>
      <TextFieldGroup
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange(setName)}
        error={error.name}
      />
      <TextFieldGroup
        placeholder="Email Address"
        name="email"
        type="email"
        value={email}
        info="This site uses Gravatar so if you want a profile image, use a Gravatar
        email"
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
      <TextFieldGroup
        placeholder="Confirm Password"
        name="password2"
        type="password"
        value={password2}
        onChange={onChange(setPassword2)}
        error={error.password2}
      />
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
