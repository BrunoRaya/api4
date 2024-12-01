import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    id_user: { type: String, required: true },
    id_prof: { type: String, required: true },
    valor: { type: Number, required: true },
    hora: { type: Date, required: true },
    loc: { type: String, required: true },
    status: { type: String, required: true },
    descricao: { type: String, required: true },
  });

  serviceSchema.index({ id_user: 1, id_prof: 1, hora: 1 }, { unique: true });
  
  const Service = mongoose.model('Service', serviceSchema, 'servicos');
  
  export default Service;
  