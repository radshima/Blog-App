import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const blogPostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

blogPostSchema.methods.toJSON = function () {
  return {
    id: this._id,
    text: this.text,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    user: this.user.toJSON(),
  };
};

export const validateBlogPost = (post) => {
  const schema = {
    text: Joi.string().min(5).max(300).required(),
  };
  return Joi.validate(post, schema);
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
