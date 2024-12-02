import express from 'express';
import Service from '../models/service.js';
import User from '../models/user.js';  
import Professional from '../models/professional.js';  

const router = express.Router();

router.get('/services', express.json(), async (req, res) => {
    try {
      const { email_user, email_prof, valor, hora, loc, status, descricao } = req.body;
  
      const user = email_user ? await User.findOne({ email: email_user }) : null;
      const professional = email_prof ? await Professional.findOne({ email: email_prof }) : null;
  
      if (email_user && !user) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      if (email_prof && !professional) {
        return res.status(404).json({ message: "Profissional não encontrado" });
      }
  
      const filter = {
        ...(user && { id_user: user._id }),
        ...(professional && { id_prof: professional._id }),
        ...(valor && { valor: Number(valor) }),
        ...(hora && { hora: new Date(hora) }),
        ...(loc && { loc }),
        ...(status && { status }),
        ...(descricao && { descricao }),
      };

      const services = await Service.find(filter)
        .populate('id_user', '-password')  
        .populate('id_prof', '-password -complemento -cep -__v -valor');  
  
      if (services.length === 0) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
  
      res.status(200).json(services);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
  });
  

router.post('/services', async (req, res) => {
    try {
      const { email_user, email_prof, valor, hora, loc, status, descricao } = req.body;

      if (!email_user || !email_prof) {
        return res.status(400).json({ message: 'Email do usuário e/ou profissional não enviado.' });
      }

      console.log(`Buscando usuário com email: ${email_user}`); 
      const user = await User.findOne({
        email: { $regex: new RegExp('^' + email_user + '$', 'i') }, 
      });
  
      console.log('Resultado da busca de usuário:', user); 
  
      if (!user) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
  
      console.log(`Buscando profissional com email: ${email_prof}`); 
      const professional = await Professional.findOne({
        email: { $regex: new RegExp('^' + email_prof + '$', 'i') },
      });
  
      console.log('Resultado da busca de profissional:', professional); 
  
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

export default router;
