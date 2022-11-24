import React from 'react'
import { Link } from 'react-router-dom'
import "./videogame.css"

export default function Videogame(props) {
    return(
        <div className="gameCardContainer">
            {
                <Link to={`/videogame/${props.id}`} className="Link">
            <div className="gameTitle">{props.name}</div>
            <div className='gameImg'>
                {props.image ? (
                    <img src={`${props.image}`} alt = "Videogame" className='IMG'></img>
                ): (
                    <img src="{photo}" alt="Videogame" className="IMG"></img>
                )}
            </div>
            <div className="infoRating">
                {
                    <p>
                        <strong>Rating :</strong> {`${props.rating}`}
                    </p>
                }
            </div>
            <div className="genresContainer">
                {
                    <p className=''>
                        <strong>Genres :</strong>{" "}
                        {`${
                            typeof props.genres === "string" ?
                            props.genres:
                            props.genres.join(", ")
                        }`}
                    </p>
                }
            </div>
            </Link>
            }
        </div>
    );
}