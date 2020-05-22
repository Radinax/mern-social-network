import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Components
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// Redux Actions
import { addComment } from "../../ducks/slices/postSlice";

const mapDispatchToProps = { addComment };
const mapStateToProps = (state) => ({
  user: state.login.user,
  error: state.posts.error,
});

const CommentForm = ({ addComment, user, error, postId }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar,
    };
    addComment(postId, newComment);
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment...</div>
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
