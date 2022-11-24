require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');


router.get("/", async (req,res) => {
    
    const alreadyInDb = await Platform.findAll()
    console.log(alreadyInDb)
    if(alreadyInDb.length !== 0){
        const platformsIn = await alreadyInDb 
        console.log("envie desde if")
        res.status(200).send(platformsIn) 
    } else {
        let results = []
        let response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`);
        let pages = 0
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
            results = [...results,...allGamesData]
            response = await axios.get(response.data.next)
        } 
        
        let apiData = results.map((el) => {
            return el.genres
        }).flat(1)

        const dataSet =  new Set(apiData)
        console.log(dataSet)

        let arr = [...dataSet]

        let bulk = arr.forEach(async (el) => {
            await Platform.bulkCreate([{
                name: el
            }])
        })
        
        console.log(bulk, "envie desde else")
        res.status(200).send(bulk)
    }
        })




module.exports = router

