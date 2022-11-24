import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

function Nav() {
    return (
        <div className="navbar-div">
                <NavLink to="/"><button>Intro</button></NavLink>
                <NavLink to="/videogames"><button>Videogames</button></NavLink>
                <NavLink to="/newgame"><button>New game</button></NavLink>
        </div>
    )
}

export default Nav