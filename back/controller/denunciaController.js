import Denuncia from '../model/denuncia.js';
import redisClient from '../database/redis.js';

// Listar denúncias com cache no Redis
export async function listarDenuncias(req, res) {
  try {
    const cacheKey = 'denuncias';
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("Retornando do Redis");
      return res.json(JSON.parse(cached));
    }
    const denuncias = await Denuncia.find();
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(denuncias));
    console.log("Retornando do MongoDB");
    res.json(denuncias);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar denúncias" });
  }
}

// Criar denúncia e limpar cache
export async function criarDenuncia(req, res) {
  try {
    const denuncia = new Denuncia(req.body);
    await denuncia.save();
    await redisClient.del('denuncias');
    res.status(201).json(denuncia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Buscar denúncia por ID
export async function buscarDenuncia(req, res) {
  try {
    const denuncia = await Denuncia.findById(req.params.id);
    if (!denuncia) return res.status(404).json({ error: "Denúncia não encontrada" });
    res.json(denuncia);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar denúncia" });
  }
}

// Atualizar denúncia e limpar cache
export async function atualizarDenuncia(req, res) {
  try {
    const denuncia = await Denuncia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!denuncia) return res.status(404).json({ error: "Denúncia não encontrada" });
    await redisClient.del('denuncias');
    res.json(denuncia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Deletar denúncia e limpar cache
export async function deletarDenuncia(req, res) {
  try {
    const denuncia = await Denuncia.findByIdAndDelete(req.params.id);
    if (!denuncia) return res.status(404).json({ error: "Denúncia não encontrada" });
    await redisClient.del('denuncias');
    res.json({ message: "Denúncia deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
