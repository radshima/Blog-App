import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

import { addBlogPost } from '../../store/actions/blogPostActions';
import { blogPostFormSchema } from './validation';

import './styles.css';

const BlogPostForm = ({ addBlogPost, post: { posts } }) => {
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: blogPostFormSchema,
    onSubmit: (values, { resetForm }) => {
      addBlogPost({ text: values.text });
      resetForm();
    },
  });

  const isSubmiting = posts.some((m) => m.id === 0);

  return (
    <div className="blogpost-form">
      <h2>Write a Post</h2>
      <form onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Write a post"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          disabled={isSubmiting}
        />
        {formik.touched.text && formik.errors.text ? (
          <p className="error">{formik.errors.text}</p>
        ) : null}
        <input type="submit" className="btn" value="Add Post" disabled={isSubmiting} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { addBlogPost })(BlogPostForm);
