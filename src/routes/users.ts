import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';
import {
  getUserByIdValidateRequest,
  createUserValidateRequest,
  updateUserValidateRequest,
  updateUserAvatarValidateRequest,
} from '../validators/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserByIdValidateRequest, getUserById);
router.post('/', createUserValidateRequest, createUser);
router.patch('/me', updateUserValidateRequest, updateUser);
router.patch('/me/avatar', updateUserAvatarValidateRequest, updateUserAvatar);

export default router;
