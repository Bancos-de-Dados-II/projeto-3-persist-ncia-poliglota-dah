import express from 'express';
import { listarDenuncias, criarDenuncia, buscarDenuncia, atualizarDenuncia, deletarDenuncia } from '../controller/denunciaController.js';

const denunciaRouter = express.Router();

denunciaRouter.get('/', listarDenuncias);
denunciaRouter.get('/:id', buscarDenuncia);
denunciaRouter.post('/', criarDenuncia);
denunciaRouter.patch('/:id', atualizarDenuncia);
denunciaRouter.delete('/:id', deletarDenuncia);

export default denunciaRouter;
