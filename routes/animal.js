const express = require('express');
const route = express.Router();
const animalController = require('../controllers/animal');

route.get('/animales', animalController.findAll)
route.post('/animal', animalController.createAnimal);
route.post('/animal/login', animalController.login);

module.exports = route;