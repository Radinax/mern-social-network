import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Components
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
// Redux Actions
import { getPosts } from "../../ducks/slices/postSlice";

const mapDispatchToProps = { getPosts };
const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
});

const Posts = ({ posts, getPosts, loading }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading || posts === null) return <Spinner />;

  const postContent = posts && <PostFeed posts={posts} />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
