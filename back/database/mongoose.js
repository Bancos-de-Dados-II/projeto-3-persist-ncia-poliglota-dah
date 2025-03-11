import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🟢 Conectado ao MongoDB"))
  .catch(err => console.error("🔴 Erro ao conectar ao MongoDB:", err));

export default mongoose;
