const express = require('express');
const articlesController = require('../controllers/articlesController'); // Asegúrate de ajustar el nombre del archivo del controlador

const router = express.Router();

// Ruta para obtener todos los elementos
router.get('/articles', articlesController.getAllArticles);

// Ruta para obtener un elemento por ID
router.get('/articles/:id', articlesController.getArticleById);

module.exports = router;

