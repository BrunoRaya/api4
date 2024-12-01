import express from 'express';
import Service from '../models/service.js';
import User from '../models/user.js';  
import Professional from '../models/professional.js';  

const router = express.Router();


router.post('/services', async (req, res) => {
    try {
      const { email_user, email_prof, valor, hora, loc, status, descricao } = req.body;

      if (!email_user || !email_prof) {
        return res.status(400).json({ message: 'Email do usuário e/ou profissional não enviado.' });
      }

      const user = await User.findOne({
        email: { $regex: new RegExp('^' + email_user + '$', 'i') }, 
      });
  
      console.log('Usuário encontrado:', user); 
  
      if (!user) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      const professional = await Professional.findOne({
        email: { $regex: new RegExp('^' + email_prof + '$', 'i') },
      });
  
      console.log('Profissional encontrado:', professional); 
  
      if (!professional) {
        return res.status(404).json({ message: 'Profissional não encontrado' });
      }

      const newService = new Service({
        id_user: user._id,         
        id_prof: professional._id, 
        valor,
        hora,
        loc,
        status,
        descricao,
      });

      const savedService = await newService.save();

      const populatedService = await Service.findById(savedService._id)
        .populate('id_user') 
        .populate('id_prof');
  
      res.status(201).json(populatedService);
    } catch (error) {
      console.error('Erro ao salvar o serviço:', error.message);
      res.status(500).json({ message: 'Erro ao salvar o serviço', error: error.message });
    }
  });

router.put('/services/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('id_user') 
      .populate('id_prof');

    if (!updatedService) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(400).json({ message: 'Erro ao atualizar serviço', error: error.message });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json({ message: 'Serviço excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir serviço:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

export default router;
