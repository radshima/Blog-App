import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';
import BlogPostList from '../../components/BlogPostList/BlogPostList';
import BlogPostForm from '../../components/BlogPostForm/BlogPostForm';

import './styles.css';

const Blogs = ({ auth }) => {
    return (
      <Layout>
        <div className="blogs-page">
          <h1>All Blogs Page</h1>
          <BlogPostList />
        </div>
      </Layout>
    );
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default compose(connect(mapStateToProps))(Blogs);
  