import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URI
});

redisClient.connect()
  .then(() => console.log("🟢 Conectado ao Redis"))
  .catch(err => console.error("🔴 Erro ao conectar ao Redis:", err));

export default redisClient;
