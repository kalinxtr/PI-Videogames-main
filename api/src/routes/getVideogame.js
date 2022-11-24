require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Videogame, Genre } = require('../db');

router.get("/:idVideogame", async (req, res) => {
    const { idVideogame } = req.params

    if (idVideogame.includes("-")) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: idVideogame,
            },
            include: Genre
        })

        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);

        // videogameDb.genre = videogameDb.genre.map(el => el.name);
        console.log(videogameDb)
        res.send(videogameDb)
    } else {
        try {
            let response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`);

               let game = {
                id: response.data.id,
                name: response.data.name,
                image: response.data.background_image,
                rating: response.data.rating,
                platform: response.data.platforms.map((el) => {return el.platform.name}),
                genres: response.data.genres.map((el) => {
                    return{
                    id:el.id,
                    name:el.name}}
                    ),
                relDate: response.data.released,
                description: response.data.description_raw
               }
               
               
               res.send(game)

        } catch (err) {
            return console.log(err)
        }
    }
})

router.post("/", async (req, res) => {

    let {name, image, genres, rating, relDate, platform,description} = req.body;
    platform = platform.toString()
    try {
        const [gameCreated] = await Videogame.findOrCreate({
            
            where: {name},
                
              defaults:{image,
                relDate,
                rating,
                platform,
                description}
            
        })
        let findGenre = await Genre.findAll({
            where: {name: genres}
        })
       await gameCreated.addGenre(findGenre)
        res.json(gameCreated)
    } catch (err) {
        console.log(err);
    }
    

})

module.exports = router;