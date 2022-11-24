import {React, useState} from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../actions/actions'
import "./SearchBar.css"

export default function SearchBar(){
    const[search, setSearch] = useState("");
    const dispatch = useDispatch();
    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchByName(search));
        setSearch("")
    }
    function onInputChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }
    

    return(
    <div className='searchbar-div'>
        <form className='form'onSubmit={onSubmit}>
            <input className='bar-btn' type="text" onChange={onInputChange} value={search} placeholder="Search your game!"/>
            <input type="submit" className='btn' value="Search" />
        </form>
    </div>
    )
}