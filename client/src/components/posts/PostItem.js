import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
// Redux Actions
import { deletePost, addLike, removeLike } from "../../ducks/slices/postSlice";

const mapDispatchToProps = { deletePost, addLike, removeLike };
const mapStateToProps = (state) => ({
  user: state.login.user,
});

const PostItem = ({
  post,
  user,
  showActions,
  addLike,
  removeLike,
  deletePost,
}) => {
  const onDeleteClick = (id) => deletePost(id);
  const onLikeClick = (id) => addLike(id);
  const onUnlikeClick = (id) => removeLike(id);
  const findUserLike = (likes) => {
    return likes.filter((like) => like.user === user.id).length > 0;
  };

  const likeButton = (
    <button
      onClick={() => onLikeClick(post._id)}
      type="button"
      className="btn btn-light mr-1"
    >
      <i
        className={classnames("fas fa-thumbs-up", {
          "text-info": findUserLike(post.likes),
        })}
      />
      <span className="badge badge-light">{post.likes.length}</span>
    </button>
  );

  const unlikeButton = (
    <button
      onClick={() => onUnlikeClick(post._id)}
      type="button"
      className="btn btn-light mr-1"
    >
      <i className="text-secondary fas fa-thumbs-down" />
    </button>
  );

  const commentsButton = (
    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
      Comments
    </Link>
  );

  const deleteButton = (
    <button
      onClick={() => onDeleteClick(post._id)}
      type="button"
      className="btn btn-danger mr-1"
    >
      <i className="fas fa-times" />
    </button>
  );

  const avatar = (
    <>
      <a href="profile.html">
        <img
          className="rounded-circle d-none d-md-block"
          src={post.avatar}
          alt=""
        />
      </a>
      <br />
      <p className="text-center">{post.name}</p>
    </>
  );

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">{avatar}</div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showActions && (
            <span>
              {likeButton}
              {unlikeButton}
              {commentsButton}
              {post.user === user.id && deleteButton}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
