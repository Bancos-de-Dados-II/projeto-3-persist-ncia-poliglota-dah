import redisClient from '../database/redis.js';

const key = 'ocorrencias';

export async function salvarRascunho(req, res) {
  const { titulo, descricao, tipo, data, hora } = req.body;

  const ocorrenciaRascunho = {
    titulo,
    descricao, // Adicionando descrição
    tipo,
    data,
    hora,
  };

  // Remove o rascunho anterior (se existir)
  await redisClient.del(key);

  const response = await redisClient.set(
    key,
    JSON.stringify(ocorrenciaRascunho),
    { EX: 600 }
  );

  if (response !== "OK") {
    return res.status(400).json({ erro: "Erro ao salvar rascunho" });
  }

  res.status(201).json(ocorrenciaRascunho);
}

export async function recuperarRascunho(req, res) {
  try {
    const rascunho = await redisClient.get(key);
    
    if (!rascunho) {
      return res.status(200).json([]); // Retorna um array vazio se não tiver rascunho
    }

    res.json([JSON.parse(rascunho)]);
  } catch (error) {
    console.error("Erro ao recuperar rascunho:", error);
    res.status(500).json({ erro: "Erro interno ao buscar rascunho." });
  }
}

