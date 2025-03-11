// rascunhoController.js
import redisClient from '../database/redis.js';

const key = 'rascunhos'; // Use uma chave exclusiva para os rascunhos

export async function salvarRascunho(req, res) {
  try {
    const { titulo, descricao, tipo, data, hora } = req.body;
    const rascunho = { titulo, descricao, tipo, data, hora };

    // Remove o rascunho anterior (se existir) – caso queira manter apenas um
    await redisClient.del(key);

    const response = await redisClient.set(
      key,
      JSON.stringify(rascunho),
      { EX: 600 }  // Expira em 10 minutos
    );

    if (response !== "OK") {
      return res.status(400).json({ erro: "Erro ao salvar rascunho" });
    }
    res.status(201).json(rascunho);
  } catch (error) {
    console.error("Erro ao salvar rascunho:", error);
    res.status(500).json({ erro: "Erro interno ao salvar rascunho." });
  }
}

export async function recuperarRascunhos(req, res) {
  try {
    const rascunho = await redisClient.get(key);

    console.log("Valor no Redis:", rascunho); // <-- Adicione este log

    if (!rascunho) {
      return res.status(200).json([]);
    }
    
    // Se rascunho for algo inválido (ex: string não JSON), JSON.parse vai quebrar
    const parsed = JSON.parse(rascunho);

    // Se chegou até aqui, `parsed` é um objeto válido
    res.json([parsed]);
  } catch (error) {
    console.error("Erro ao recuperar rascunho:", error);
    res.status(500).json({ erro: "Erro interno ao buscar rascunho." });
  }
}

export async function removerRascunhos(req, res) {
  try {
    const response = await redisClient.del(key);
    if (response === 0) {
      return res.status(404).json({ erro: "Rascunho não encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao remover rascunho:", error);
    res.status(500).json({ erro: "Erro interno ao remover rascunho." });
  }
}
