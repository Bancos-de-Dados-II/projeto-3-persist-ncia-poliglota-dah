import express from 'express';
import cors from 'cors';
import './database/mongoose.js'; // Conecta ao MongoDB
import './database/redis.js';    // Inicializa a conexão com o Redis

import denunciaRouter from './router/routerDenuncia.js';
import usuarioRouter from './router/usuarioRouter.js';
import rascunhoRouter from './router/routerRascunho.js';  // ✅ Importação correta

const app = express();
app.use(express.json());
app.use(cors());

app.use('/denuncias', denunciaRouter);
app.use('/usuarios', usuarioRouter);
app.use('/denuncias', rascunhoRouter); // ✅ Adicionando a rota corretamente

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
