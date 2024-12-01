import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, 
  id_prof: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Professional' }, 
  valor: { type: Number, required: true }, 
  hora: { type: Date, required: true }, 
  loc: { type: String, required: true }, 
  status: { 
    type: String, 
    required: true, 
    enum: ['Em progresso', 'Concluído', 'Cancelado'], 
    default: 'Em progresso',
  },
  descricao: { type: String, required: true }, 
}, { timestamps: true }); 

const Service = mongoose.model('Service', serviceSchema);

export default Service;
