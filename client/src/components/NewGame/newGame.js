import "../NewGame/Newgame.css"
import React, {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import { postVideogame,getGenres } from "../../actions/actions";
import Nav from "../NavBar/Nav"


 export const NewGame = () => {
    const dispatch = useDispatch()
    const videogames = useSelector(state => state.videogames)
    const genres = useSelector(state=>state.genres)
    const [checked, setChecked] = useState({
        PlayStation: false,
        Xbox: false,
        PC: false,
        Mobile: false
    })
    const [data, setData] = useState({
        name:'',
        image:'',
        relDate:'',
        genres:[],
        rating:0,
        platform:[],
        description:''
    })
    const [error, setError] = useState({
        image:"Must have a image",
        name:"Must have a name",
        relDate:'Must have a release date',
        genres:'Must have at least 1 genre',
        rating:'Must have a rating',
        platform:'Must have at least 1 platform to play',
        description:'Must have a little description from the game'
    });
    const sortGenres = genres
    

    const validateFields = (e) => {
        let error = {}
        if(!e.image){
            error.image="Must have a image"
        }
        if(!e.name){
            error.name = 'Must have a valid name'
        }
        if(!(/^[\w-\s]+$/).test(e.name)){
            error.name = 'Only letters and numbers'
        }
        if(!e.relDate){
            error.relDate = 'Must add the date'
        }
        if(e.rating < 1 || e.rating > 5 ){
            error.rating = 'Rating cant be lower than 1, or higher than 5'
        }
        if(!e.platform){
            error.platform= 'Must have at least 1 videogame platform'
        }
        if(!e.description){
            error.description = 'Please enter description'
        }
        if(e.genres.length == 0){
            error.genres = "Must have at least 1 genre"
        }
        return error
    }

    const handleOnChangeData= (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
        setError(validateFields({
            ...data,
            [e.target.name] : e.target.value
        }))
        console.log(data)
    }

    const handleOnChangeGenres = (e) => {
        if(!data.genres.includes(e)){
            setData({
                ...data,
                genres:[...data.genres, e]
            })
        } else {
            setData({
                ...data,
                genres:[...data.genres]
            })
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(error.hasOwnProperty("image") || error.hasOwnProperty("name") || error.hasOwnProperty("relDate")
        || error.hasOwnProperty("rating") || error.hasOwnProperty("platform") || error.hasOwnProperty("description")
        || error.hasOwnProperty("genres")){
            alert("Data has errors")
        }else{
            dispatch(postVideogame(data))
            alert("Game succesfully created")
            setData({
                name:"",
                image:"",
                relDate:"",
                genres:[],
                rating:"",
                platform:[],
                description:""
            })
        }
    }

    const deleteGenres = (e) => {
        setData({
            ...data,
            genres:[...data.genres.filter(element => element !== e.target.value)]
        })
    }

    const handleChangeCheckbox = (e) => {
        console.log(e.target)
        if(!checked[e.target.id]){
            if(!data.platform.includes(e.target.name)){
                setData({
                    ...data,
                    platform: [...data.platform, e.target.name]
                })
                
            }
        } else {
            setData({
                ...data,
                platform: data.platform.filter(el => el !== e.target.name)
            })
        } setChecked({
            ...checked,
            [e.target.id] : e.target.checked
        })
    }


    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])

    return(
        <div className="div-zero-form">
        <div>
            <Nav />
        </div>
            <div className="allForm"> 
                <h2>Fill the form to create your own Game!</h2>
                    <div className="Form">
                        <div>
                            <form name="form" onSubmit={(e) => {
                                handleOnSubmit(e);
                            } }>
                                
                                <div className="div-name-form">
                                    <label name="label" className="labelstyles">Name</label>
                                    <br/>
                                    <input type="text" name="name" value={data.name} onChange={handleOnChangeData}></input>
                                    <h5>{error.name}</h5>
                                </div>
                                <div className="div-form-image">
                                <label name="label" className="labelstyles">Image</label>
                                    <br/>
                                    <input type="text" name="image" value={data.image} onChange={handleOnChangeData}></input>
                                    <h5>{error.image}</h5>
                                </div>
                                <div className="div-release-date">
                                    <label name="label" className="labelstyles">Release date</label>
                                    <br/>
                                    <input type="date" name="relDate" value={data.relDate} onChange={handleOnChangeData}></input>
                                    <h5>{error.relDate}</h5>
                                </div>
                                <div className="div-form-rating">
                                    <label name="label" className="labelstyles">Rating</label>
                                    <br/>
                                    <input type="number" name="rating" value={data.rating} onChange={handleOnChangeData}></input>
                                    <h5>{error.rating}</h5>
                                </div>
                                <div className="genres-div-form">
                                    <label name="label" className="labelstyles">Genres</label>
                                    <br/>
                                    <select name="select" onChange={(e) => handleOnChangeGenres(e.target.value)}>
                                        <option key="genres" value="">Select Genres</option>
                                        {sortGenres.map(e => {
                                            return (
                                                <option key={e.id} value={e.name}>{e.name}</option>
                                            );
                                        })}
                                    </select>
                                    <h5>{error.genres}</h5>
                                </div>
                                <div className="platform-div">
                                    <label name="label" className="labelstyles">Platform belonger</label>
                                    <br/>
                                    <label name="label">PlayStation</label>
                                    <input
                                        type='checkbox'
                                        id='PlayStation'
                                        name= 'PlayStation'
                                        checked={checked.PlayStation}
                                        onChange={e => handleChangeCheckbox(e)}>
                                    </input><br/>
                                    <label name="label">Xbox</label>
                                    <input
                                        type='checkbox'
                                        id='Xbox'
                                        name= 'Xbox'
                                        checked={checked.Xbox}
                                        onChange={e => handleChangeCheckbox(e)}>
                                    </input><br/>
                                    <label name="label">PC</label>
                                    <input
                                        type='checkbox'
                                        id='PC'
                                        name= 'PC'
                                        checked={checked.PC}
                                        onChange={e => handleChangeCheckbox(e)}>
                                    </input><br/>
                                    <label name="label">Mobile</label>
                                    <input
                                        type='checkbox'
                                        id='Mobile'
                                        name= 'Mobile'
                                        checked={checked.Mobile}
                                        onChange={e => handleChangeCheckbox(e)}>
                                    </input><br/>
                                        <h5>{error.platform}</h5>
                                </div>
                                <div className="input-description-div">
                                    <label name="label" className="labelstyles">Description</label>
                                    <br/>
                                    <textarea name="description" value={data.description} onChange={handleOnChangeData} />
                                    <h5>{error.description}</h5>
                                </div>
                                <div className="div-but-form">
                                    <button type="submit">Submit Game</button>
                                </div>
                            </form>
                                <div className="genres-display">
                            {data.genres.length ?
                                data.genres.map(e => (
                                    <div key={e} className="genre-value">
                                        <p>{e}</p>
                                        <button type="button" value={e} onClick={deleteGenres}>X</button>
                                    </div>
                                )) : <h4>Select Genres</h4>}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default NewGame