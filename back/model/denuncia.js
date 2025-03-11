import mongoose from '../database/mongoose.js';
import { randomUUID } from 'crypto';

const { Schema } = mongoose;

const denunciaSchema = new Schema(
  {
    id: { type: String, default: randomUUID, required: true, unique: true },
    nome: { type: String, required: true, unique: true },
    descricao: { type: String },
    localizacao: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    status: { type: String, required: true },
    tipo: { type: String, required: true },
    dataOcorrencia: { type: Date },
    horarioOcorrencia: { type: String }
  },
  { timestamps: true }
);

const Denuncia = mongoose.model('Denuncia', denunciaSchema);
export default Denuncia;
