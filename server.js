import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serviceRoutes from './routes/services.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4300;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.error('Erro de conexão com o MongoDB:', err));  

app.use(express.json());

app.use('/api', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
