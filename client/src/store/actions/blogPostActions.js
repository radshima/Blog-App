import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_BLOGPOSTS_LOADING,
  GET_BLOGPOSTS_SUCCESS,
  GET_BLOGPOSTS_FAIL,
  ADD_BLOGPOSTS_LOADING,
  ADD_BLOGPOSTS_SUCCESS,
  ADD_BLOGPOST_FAIL,
  DELETE_BLOGPOST_LOADING,
  DELETE_BLOGPOST_SUCCESS,
  DELETE_BLOGPOST_FAIL,
  EDIT_BLOGPOST_LOADING,
  EDIT_BLOGPOST_SUCCESS,
  EDIT_BLOGPOST_FAIL,
  CLEAR_BLOGPOST_ERROR,
} from '../types';

export const getBlogPosts = () => async (dispatch, getState) => {
  dispatch({
    type: GET_BLOGPOSTS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/blogposts', options);

    dispatch({
      type: GET_BLOGPOSTS_SUCCESS,
      payload: { posts: response.data.posts },
    });
  } catch (err) {
    dispatch({
      type: GET_BLOGPOSTS_FAIL,
      payload: { error: err?.response?.data.post || err.message },
    });
  }
};

export const addBlogPost = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_BLOGPOSTS_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/blogposts', formData, options);

    dispatch({
      type: ADD_BLOGPOSTS_SUCCESS,
      payload: { post: response.data.post },
    });
  } catch (err) {
    dispatch({
      type: ADD_BLOGPOST_FAIL,
      payload: { error: err?.response?.data.post || err.message },
    });
  }
};

export const deleteBlogPost = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_BLOGPOST_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/blogposts/${id}`, options);

    dispatch({
      type: DELETE_BLOGPOST_SUCCESS,
      payload: { post: response.data.post },
    });
  } catch (err) {
    dispatch({
      type: DELETE_BLOGPOST_FAIL,
      payload: { error: err?.response?.data.post || err.message },
    });
  }
};

export const editBlogPost = (id, formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_BLOGPOST_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/blogposts/${id}`, formData, options);

    dispatch({
      type: EDIT_BLOGPOST_SUCCESS,
      payload: { post: response.data.post },
    });
  } catch (err) {
    dispatch({
      type: EDIT_BLOGPOST_FAIL,
      payload: { error: err?.response?.data.post || err.message, id },
    });
  }
};

export const clearBlogPostError = (id) => ({
  type: CLEAR_BLOGPOST_ERROR,
  payload: { id },
});
