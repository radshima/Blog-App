import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';
import BlogPostForm from '../../components/BlogPostForm/BlogPostForm';
import './styles.css';


const AddPost = ({ auth }) => {
  return (
    <Layout>
      <div className="home-page">
        
        {!auth.isAuthenticated ? (
          <div>
            <p>
              Welcome! To Add a Blog Post Please{' '}
              <Link className="bold" to="/login">
                Log in
              </Link>{' '}
              or{' '}
              <Link className="bold" to="/register">
                Register
              </Link>
            </p>
            
          </div>
        ) : (
          <>
            <p>
              Welcome <span className="name">{auth.me.name}</span>!
            </p>            
            <BlogPostForm />
          </>
        )}        
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps))(AddPost);
