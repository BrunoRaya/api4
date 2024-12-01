import express from 'express';
import Service from '../models/service.js';

const router = express.Router();

router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.post('/services', async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    res.status(400).json({ message: 'Erro ao criar serviço', error: error.message });
  }
});

router.get('/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(400).json({ message: 'Erro ao atualizar serviço', error: error.message });
  }
});

// Rota para excluir um serviço pelo ID
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
