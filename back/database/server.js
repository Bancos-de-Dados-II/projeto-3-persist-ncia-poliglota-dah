import './mongoose.js'; // Conecta ao MongoDB automaticamente
import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

// Conexão com o Redis
const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('🔴 Erro no Redis:', err));

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('🟢 Conectado ao Redis!');
  } catch (err) {
    console.error('🔴 Erro ao conectar ao Redis:', err);
  }
}
connectRedis();

export { redisClient };
