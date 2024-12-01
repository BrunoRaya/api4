import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  email_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email_prof: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true },
  valor: { type: Number, required: true },
  hora: { type: Date, required: true },
  loc: { type: String, required: true },
  status: { type: String, required: true },
  descricao: { type: String, required: true },
});

const Service = mongoose.model('Service', serviceSchema, 'servicos');

export default Service;
