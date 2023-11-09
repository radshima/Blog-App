import { Router } from 'express';
import usersRoutes from './users';
import blogPostRoutes from './blogposts';
const router = Router();

router.use('/users', usersRoutes);
router.use('/blogposts', blogPostRoutes);

export default router;
