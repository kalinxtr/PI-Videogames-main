import React from 'react'
import { connect } from 'react-redux'
import { orderBy, filterBy } from '../../actions/actions'
import "./FilterBy.css"

function Filters({orderBy,genres,filterBy}){
    const handleSelection = (e) => {
        filterBy(e.target.value)
    }
    const handleSelection2 = (e) => {
        orderBy(e.target.value)
    }
    return(
        <div className='container-div'>
            <select className='selectors' onChange={handleSelection} name="" id="">
                <option className='options' value="default">All</option>
                <optgroup className="optionGroup" label='DataBase'>
                    <option className='options' value="DB">Created</option>
                </optgroup>
                <optgroup className='optionGroup' label="API">
                    <option className='options' value="API">API</option>
                </optgroup>
                <optgroup className='optionGroup' label= "Genres">
                    {genres && genres.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
                </optgroup>
            </select>
            <br>
            </br>
            <select className='selectors' onChange={handleSelection2} name="" id="">
                <option className='options' value="default">Order</option>
                <optgroup className='optionGroup' label= "Rating">
                    <option className='options' value="asc">Higher to Lowest</option>
                    <option className="options" value="desc">Lowest to Higher</option>
                </optgroup>
                <optgroup className='optionGroup' label="Alphabetic">
                    <option className='options' value="A-Z">A - Z</option>
                    <option className='options' value="Z-A">Z - A</option>
                </optgroup>
            </select>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        genres: state.genres
    }
}

export default connect(mapStateToProps, {orderBy, filterBy})(Filters)