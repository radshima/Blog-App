import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';

import { deleteBlogPost, BlogPost, editBlogPost, clearBlogPostError } from '../../store/actions/blogPostActions';
import { blogPostFormSchema } from './validation';

import './styles.css';

const Post = ({ post, auth, deleteBlogPost, editBlogPost, clearBlogPostError }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (!isEdit) {
      deleteBlogPost(id);
    }
  };

  const handleClickEdit = (e) => {
    e.preventDefault();
    formik.setFieldValue('text', post.text);
    setIsEdit((oldIsEdit) => !oldIsEdit);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: '',
      id: post.id,
    },
    validationSchema: blogPostFormSchema,
    onSubmit: (values, { resetForm }) => {
      editBlogPost(values.id, { text: values.text });
      setIsEdit(false);
      // resetForm();
    },
  });

  // dont reset form if there is an error
  useEffect(() => {
    if (!post.error && !post.isLoading) formik.resetForm();
  }, [post.error, post.isLoading]);

  // keep edit open if there is an error
  useEffect(() => {
    if (post.error) setIsEdit(true);
  }, [post.error]);

  return (
    <div className={post.isLoading ? 'post loader' : 'post'}>
      <div className="post-header">
        <Link to={`/${post.user.username}`}>
        </Link>
        <div>
          <Link to={`/${post.user.username}`} className="name">
            {post.user.name}
          </Link>
          <span className="username">@{post.user.username}</span>
          <span className="time text-light">{moment(post.createdAt).fromNow()}</span>
          {!moment(post.createdAt).isSame(post.updatedAt, 'minute') && (
            <span className="time text-light">{`Edited: ${moment(
              post.updatedAt,
            ).fromNow()}`}</span>
          )}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {isEdit ? (
          <>
            <textarea
              name="text"
              rows="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              disabled={post.isLoading}
            />
            <input type="hidden" name="id" />
            {(formik.touched.text && formik.errors.text) || post.error ? (
              <p className="error">{formik.errors.text || post.error}</p>
            ) : null}
          </>
        ) : (
          <p>{post.text}</p>
        )}
        {auth.isAuthenticated && (auth.me.id === post.user.id || auth.me.role === 'ADMIN') && (
          <>
            {!isEdit ? (
              <>
                <button onClick={handleClickEdit} type="button" className="btn">
                  Edit
                </button>
                <button onClick={(e) => handleDelete(e, post.id)} type="button" className="btn">
                  Delete
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="btn" disabled={post.isLoading}>
                  Submit
                </button>
                <button
                  onClick={() => {
                    setIsEdit((oldIsEdit) => !oldIsEdit);
                    clearBlogPostError(post.id);
                  }}
                  type="button"
                  className="btn"
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteBlogPost, editBlogPost, clearBlogPostError })(Post);
