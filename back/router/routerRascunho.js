import express from 'express';
import { salvarRascunho, recuperarRascunhos, removerRascunhos } from '../controller/rascunhoController.js';

const router = express.Router();

router.route("/rascunho")  // /denuncias/rascunho
  .post(salvarRascunho)
  .get(recuperarRascunhos)
  .delete(removerRascunhos);

export default router;
