import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../../actions/actions";
import "./detail.css"
import imageLoader from "../../myImages/loading-bar.gif"
import Nav from "../NavBar/Nav";

export default function VideogameDetails(props){
    const dispatch = useDispatch();
    const [descState, setDescState]= useState("less")
    const game = useSelector((state) => state.gameDetails)
    const id = props.match.params.idVideogame
    const cutDescription = game.description? game.description.slice(0,100) : undefined
    console.log(cutDescription)

    function handleMoreOrLess(e){
        if(descState === "less"){
        setDescState("more")
        } else{
            setDescState("less")
        }
    }

useEffect(() => {
    dispatch(getVideogameDetail(id))
},[dispatch, id])
    
console.log(game.relDate)

return (
    <div >
        <Nav/>
        <div className="background-div">
            <div className='alldetail'>
                {
                    game?.id == id ? (
                        <div className="zero-div">
                            <div className='detail'>
                                <h1>{game.name}</h1>
                                <img src={game.image} alt='Not found' width='400px' height='210'/>
                                <div className='data'>
                                    <h4 >Name: <span>{game.name}</span></h4>
                                    <h4 >Release date: <span>{game.relDate}</span></h4>
                                    <h5 >ID: <span>{game.id}</span></h5>
                                    <h5 >Rating✰: <span>{game.rating}</span></h5>
                                    <h5 >Platforms: <span>{game.platform}</span></h5>
                                    <h5 >Description: <span>{descState === "less"? cutDescription + "..." : game.description}</span></h5>
                                    <button className="read-more-button" onClick={(e) => handleMoreOrLess(e)}>{descState === "less"? "Read More": "Read Less"}</button>
                                </div>
                            </div>
                        <div className='genres'>
                            <h2 >genres are:</h2>
                            {
                                game?.genres.length > 0 ?
                                (
                                game.genres.map((a) => {
                                    return(
                                        <div key={a.name} className='activitydata'>
                                        <span>Genre: {a.name} </span>
                                        </div>
                                    )
                                })
                                ) :
                                (
                                    <span >There is no Genre in this Game!</span>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div>
                    <h2>Loading...</h2>
                    <img src={imageLoader} alt='Not found' />
                </div>
                )
                }
        </div>
    </div>
  </div>
  )

}
