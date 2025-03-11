import express from 'express';
import { criarUsuario, listarUsuarios, atualizarUsuario, deletarUsuario /*, loginUsuario */ } from '../controller/usuarioController.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/', listarUsuarios);
router.patch('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);

// Rota para login (a implementar futuramente)
// router.post('/login', loginUsuario);

export default router;
