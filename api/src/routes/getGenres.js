require('dotenv').config();
const {YOUR_API_KEY} = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Genre } = require('../db');

router.get("/", async (req, res) => {
    try {
        const genresDb = await Genre.findAll();
        if (genresDb.length) return res.json(genresDb)

        const response = await axios.get (`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
        const genres = response.data.results;

        genres.forEach(async g => {
            await Genre.findOrCreate({
                where: {
                    name: g.name
                }
            })
        })
        const genresAll = genres.map(game => {
            return{
                id: game.id,
                name: game.name
            }
        });
        res.json(genresAll)
    } catch (err) {
        return console.log(err)
    }
})

module.exports = router;