import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../ducks/slices/postSlice";

const mapDispatchToProps = { deleteComment };
const mapStateToProps = (state) => ({
  user: state.login.user,
});

const CommentItem = ({ deleteComment, comment, postId, user }) => {
  const onDeleteClick = (post, comment) => deleteComment(post, comment);

  const avatar = (
    <div className="col-md-2">
      <a href="profile.html">
        <img
          className="rounded-circle d-none d-md-block"
          src={comment.avatar}
          alt=""
        />
      </a>
      <br />
      <p className="text-center">{comment.name}</p>
    </div>
  );

  const commentText = <p className="lead">{comment.text}</p>;

  const deleteCommentButton = comment.user === user.id && (
    <button
      onClick={() => onDeleteClick(postId, comment._id)}
      type="button"
      className="btn btn-danger mr-1"
    >
      <i className="fas fa-times" />
    </button>
  );

  return (
    <div className="card card-body mb-3">
      <div className="row">
        {avatar}
        <div className="col-md-10">
          {commentText}
          {deleteCommentButton}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
