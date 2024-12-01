import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profession: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },  // Endereço do profissional
});

const Professional = mongoose.model('Professional', professionalSchema);

export default Professional;
