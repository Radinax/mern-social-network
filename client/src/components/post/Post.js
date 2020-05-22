import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
// Components
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
// Redux Actions
import { getPost } from "../../ducks/slices/postSlice";
// Utils
import { isEmpty } from "../../utils/isEmpty";

const mapStateToProps = (state) => ({
  post: state.posts.post,
  loading: state.posts.loading,
});
const mapDispatchToProps = { getPost };

const Post = ({ getPost, post, loading }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  if (loading) return <Spinner />;

  const postContent = !isEmpty(post) && (
    <PostItem post={post} showActions={false} />
  );

  const commentForm = !isEmpty(post) && <CommentForm postId={post._id} />;

  const backButton = (
    <Link to="/feed" className="btn btn-light mb-3">
      Back To Feed
    </Link>
  );

  const commentFeed = !isEmpty(post) && (
    <CommentFeed postId={post._id} comments={post.comments} />
  );

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {backButton}
            {postContent}
            {commentForm}
            {commentFeed}
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
