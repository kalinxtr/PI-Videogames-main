import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Pagination from '../Pagination/Pagination'
import Videogame from '../VideogameCard/videgameCard'
import { getAllGames, getGenres } from '../../actions/actions'
import Filters from '../Filters/Filters'
import Nav from '../NavBar/Nav'
import SearchBar from '../SearchBar/SearchBar'
import "./videogames.css"
import Loader from "../../myImages/loading-bar.gif"

function Videogames({allGames, getAllGames, getGenres}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage] = useState(15)

    const indexOfLastCard = currentPage*cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage;

    let currentCards;

    if(typeof allGames === "string") {
        currentCards = allGames
    } else {
        currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard)
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        getAllGames()
        getGenres()
    },[])

    //Retornar todo el HTML
    return (
        <div className="container">
            <div className='nav-div-videogames'>
                <Nav/>
            </div>
                {currentCards.length ? (<div>
                    <SearchBar/>
                    <br/>
                    <Filters/>
                    <br/>
                    <Pagination
                    cardPerPage={cardPerPage}
                    totalCards={allGames.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    />
                    <div className='games-div'>
                        {currentCards.length > 0 ? (
                            currentCards.map((el) => (
                                <Videogame
                                key={el.id}
                                name={el.name}
                                rating={el.rating}
                                genres={el.genres}
                                image={el.image}
                                id={el.id}
                                />
                            ))
                        ): typeof currentCards === "string" ? (
                            <div>
                                <img classname="notfound" src="{notFound}" alt=""></img>
                            </div>  
                        ): (
                            <div>
                            <img className="loading" src="{loading}" alt=""></img>
                            </div>
                        )}
                    </div>
                    <Pagination
                    cardPerPage={cardPerPage}
                    totalCards={allGames.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    />
                </div>) : (
                
                <div className='zero-div-loader'>
                    <img src={Loader}/>
                </div>
                )}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        allGames: state.filtered
    }
}

export default connect(mapStateToProps,{getAllGames, getGenres})(Videogames)