// routerRascunho.js
import express from 'express';
import { salvarRascunho, recuperarRascunhos, removerRascunhos } from '../controller/rascunhoController.js';

const router = express.Router();

// Usando a rota "/" para que o endpoint final seja /denuncias/rascunho
router.route("/")
  .post(salvarRascunho)
  .get(recuperarRascunhos)
  .delete(removerRascunhos);

export default router;
