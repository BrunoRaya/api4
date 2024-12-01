import express from 'express';
import Service from '../models/service.js';

const router = express.Router();

router.post('/services', async (req, res) => {
  try {
    const { id_user, id_prof, valor, hora, loc, status, descricao } = req.body;

    const newService = new Service({ id_user, id_prof, valor, hora, loc, status, descricao });
    await newService.save();

    res.status(201).json(newService);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.get('/services', async (req, res) => {
  try {
    const services = await Service.find().populate('id_user', 'name email').populate('id_prof', 'name profession');
    res.status(200).json(services);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.get('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('id_user', 'name email').populate('id_prof', 'name profession');
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.patch('/services/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const service = await Service.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

export default router;
