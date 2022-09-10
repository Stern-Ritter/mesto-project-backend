import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from "../controllers/cards";
import {
  createCardValidateRequest,
  validateCardIdParam,
} from "../validators/cards";

const router = Router();

router.get("/", getCards);
router.post("/", createCardValidateRequest, createCard);
router.delete("/:cardId", validateCardIdParam, deleteCardById);
router.put("/:cardId/likes", validateCardIdParam, likeCard);
router.delete("/:cardId/likes", validateCardIdParam, dislikeCard);

export default router;
