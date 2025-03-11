// index.js
import express from 'express';
import cors from 'cors';
import './database/mongoose.js';
import './database/redis.js';

import denunciaRouter from './router/routerDenuncia.js';
import usuarioRouter from './router/usuarioRouter.js';
import rascunhoRouter from './router/routerRascunho.js';

const app = express();
app.use(express.json());
app.use(cors());

// Rotas de denúncias e usuários
app.use('/denuncias', denunciaRouter);
app.use('/usuarios', usuarioRouter);
app.use('/denuncias/rascunho', rascunhoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
