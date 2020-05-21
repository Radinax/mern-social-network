import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Components
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// Redux Actions
import { addPost } from "../../ducks/slices/postSlice";

const mapDispatchToProps = { addPost };
const mapStateToProps = (state) => ({
  user: state.login.user,
  error: state.posts.error,
});

const PostForm = ({ addPost, user, error }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar,
    };
    addPost(newPost);
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={onChange}
                error={error.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
