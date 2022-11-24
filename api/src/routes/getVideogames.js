require ("dotenv").config();
const {YOUR_API_KEY} = process.env;
const {Router} = require("express");
const router = Router();
const axios = require("axios");
const {Videogame, Genre} = require("../db");

router.get("/", async (req, res) => {

    let videogamesDb = await Videogame.findAll({
        include: Genre
    })

videogamesDb = JSON.stringify(videogamesDb);
videogamesDb = JSON.parse(videogamesDb);

videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
    ...el,
    genres: el.genres.map(g => g.name)
}), [])

    if (req.query.name) {
        try {
            let response = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${YOUR_API_KEY}`);
            if (!response.data.count) return res.status(404).json(`Huh! Cant find "${req.query.name}" Sorry...`);
            const gamesData = response.data.results.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    rating: game.rating,
                    genres: game.genres.map(g =>g.name),
                    relDate: game.released,
                    platform: game.platforms.map(el => el.platform.name)

                }
            });
        
            const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            const results = [...filteredGamesDb, ...gamesData.splice(0, 15)];
            return res.json(results)
        } catch (err) {
        }

    } else {
        try {
            let pages = 0;
            let results = [...videogamesDb];
            let response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`);
            while (pages < 5) {
                pages++;

                const allGamesData = response.data.results.map(game => {
                    return{
                        id: game.id,
                        name: game.name,
                        image: game.background_image,
                        rating: game.rating,
                        genres: game.genres.map(g => g.name),
                        relDate: game.released,
                        platform: game.platforms.map(el => el.platform.name)
                    }
                });
                results = [...results, ...allGamesData]
                response = await axios.get(response.data.next)
            }
            return res.json(results)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
});
module.exports = router;




