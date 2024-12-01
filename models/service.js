import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  id_user: { type: String, required: true }, 
  id_prof: { type: String, required: true }, 
  valor: { type: Number, required: true }, 
  hora: { type: Date, required: true }, 
  loc: { type: String, required: true }, 
  status: { type: String, required: true, enum: ['Em progresso', 'Concluído', 'Cancelado'] }, 
  descricao: { type: String, required: true }, 
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
