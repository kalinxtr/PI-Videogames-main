const { Router } = require('express');
const axios = require ("axios")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require ("./getVideogames");
const videogame = require("./getVideogame");
const genres = require("./getGenres");
const platforms = require('../controllers/platformController');

const router = Router();
router.use("/videogames", videogames);
router.use("/videogame", videogame);
router.use("/genres", genres);
router.use("/platforms", platforms)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




module.exports = router;
