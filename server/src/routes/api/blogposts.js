import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import BlogPost, { validateBlogPost } from '../../models/BlogPost';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: 'desc' }).populate('user');

    res.json({
      posts: posts.map((m) => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ post: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('user');
    if (!post) return res.status(404).json({ post: 'No post found.' });
    res.json({ post: post.toJSON() });
  } catch (err) {
    res.status(500).json({ post: 'Something went wrong.' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateBlogPost(req.body);
  if (error) return res.status(400).json({ post: error.details[0].post });

  try {
    let post = await BlogPost.create({
      text: req.body.text,
      user: req.user.id,
    });
    post = await post.populate('user').execPopulate();

    res.status(200).json({ post: post.toJSON() });
  } catch (err) {
    res.status(500).json({ post: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempMessage = await BlogPost.findById(req.params.id).populate('user');
    if (!(tempMessage.user.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ post: 'Not the post owner or admin.' });

    const post = await BlogPost.findByIdAndRemove(req.params.id).populate('user');
    if (!post) return res.status(404).json({ post: 'No post found.' });
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ post: 'Something went wrong.' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateBlogPost(req.body);
  if (error) return res.status(400).json({ post: error.details[0].post });

  try {
    const tempMessage = await BlogPost.findById(req.params.id).populate('user');
    if (!(tempMessage.user.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ post: 'Not the post owner or admin.' });

    let post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text, user: tempMessage.user.id },
      { new: true },
    );
    if (!post) return res.status(404).json({ post: 'No post found.' });
    post = await post.populate('user').execPopulate();

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ post: 'Something went wrong.' });
  }
});

export default router;
