import { Router } from 'express';
import {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';
import {
  getUserByIdValidateRequest,
  updateUserValidateRequest,
  updateUserAvatarValidateRequest,
} from '../validators/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserByIdValidateRequest, getUserById);
router.patch('/me', updateUserValidateRequest, updateUser);
router.patch('/me/avatar', updateUserAvatarValidateRequest, updateUserAvatar);

export default router;
