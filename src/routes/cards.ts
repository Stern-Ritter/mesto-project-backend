import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import {
  createCardValidateRequest,
  deleteCardByIdValidateRequest,
  likeCardValidateRequest,
  dislikeCardValidateRequest,
} from '../validators/cards';

const router = Router();

router.get('/', getCards);
router.post('/', createCardValidateRequest, createCard);
router.delete('/:cardId', deleteCardByIdValidateRequest, deleteCardById);
router.put('/:cardId/likes', likeCardValidateRequest, likeCard);
router.delete('/:cardId/likes', dislikeCardValidateRequest, dislikeCard);

export default router;
