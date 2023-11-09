import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BlogPost from '../BlogPost/BlogPost';
import { getBlogPosts} from '../../store/actions/blogPostActions';
import './styles.css';

const BlogPostList = ({ getBlogPosts, post: { posts } }) => {
  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <div className="blogs-list">
      <h2>Blog Posts:</h2>
      <>
            {posts.map((post, index) => {
              return <BlogPost key={index} post={post} />;
            })}
          </>
    </div>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getBlogPosts })(BlogPostList);
