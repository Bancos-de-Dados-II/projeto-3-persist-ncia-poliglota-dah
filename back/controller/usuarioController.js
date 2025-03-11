import Usuario from '../model/usuario.js';

// Listar usuários
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
}

// Criar usuário
export async function criarUsuario(req, res) {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Atualizar usuário
export async function atualizarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Deletar usuário
export async function deletarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ==========================================
// IMPLEMENTAÇÃO FUTURA: Autenticação de Usuário
// ==========================================
// export async function loginUsuario(req, res) {
//   // Exemplo: Receber email e senha, validar o usuário e gerar token JWT
// }
