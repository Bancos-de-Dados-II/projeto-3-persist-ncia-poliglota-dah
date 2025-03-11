import mongoose from '../database/mongoose.js';
import { randomUUID } from 'crypto';

const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    id: { type: String, default: randomUUID, required: true, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String, enum: ['admin', 'autoridade', 'usuario'], default: 'usuario', required: true }
  },
  { timestamps: true }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
