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

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_BLOGPOSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_BLOGPOSTS_LOADING:
      return {
        ...state,
        posts: [
          {
            id: 0,
            text: 'Loading...',
            isLoading: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: { ...payload.me },
          },
          ...state.posts,
        ],
      };
    case DELETE_BLOGPOST_LOADING:
    case EDIT_BLOGPOST_LOADING:
      return {
        ...state,
        posts: state.posts.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: true };
          return m;
        }),
      };
    case GET_BLOGPOSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: payload.posts,
      };
    case ADD_BLOGPOSTS_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((m) => {
          if (m.id === 0) return payload.post;
          return m;
        }),
      };
    case DELETE_BLOGPOST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((m) => m.id !== payload.post.id),
      };
    case EDIT_BLOGPOST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((m) => {
          if (m.id === payload.post.id) return payload.post;
          return m;
        }),
      };
    case DELETE_BLOGPOST_FAIL:
    case EDIT_BLOGPOST_FAIL:
      return {
        ...state,
        error: null,
        posts: state.posts.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
          return m;
        }),
      };
    case GET_BLOGPOSTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_BLOGPOST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        posts: state.posts.filter((m) => m.id !== 0),
      };
    case CLEAR_BLOGPOST_ERROR:
      return {
        ...state,
        posts: state.posts.map((m) => {
          if (m.id === payload.id) return { ...m, isLoading: false, error: null };
          return m;
        }),
      };
    default:
      return state;
  }
}
