import axios from "axios";
import {
  GET_ALL_GAMES,
  SEARCH_BY_NAME,
  GET_VIDEOGAME_DETAIL,
  GET_GENRES,
  ORDER_BY,
  FILTER_BY,POST_VIDEOGAME
} from "./constantes";

export function getAllGames() {
  return function (dispatch) {
    return axios.get(`/videogames/`)
    .then((res) => {
      dispatch({type: GET_ALL_GAMES, payload: res.data})
    })
    .catch((err) => {
      return err;
    });
  }
}

export function getGenres() {
  return function(dispatch) {
    axios.get(`/genres`)
    .then((res) => {
      dispatch({type: GET_GENRES, payload: res.data})
    })
    .catch((err) => {
      return err;
    })
  }
}

export function orderBy(order) {
  return function (dispatch) {
    dispatch({type: ORDER_BY, payload: order});
  };
}

export function filterBy(order) {
  return function(dispatch) {
    dispatch({type: FILTER_BY, payload: order})
  };
}
export function searchByName(name){
  return function (dispatch) {
    return axios.get(`/videogames?name=${name}`).then((res) => {
      
      dispatch({type: SEARCH_BY_NAME, payload: res.data});
    })
    .catch((err) => {
      alert("Cant find the game sorry")
             console.log(err)
    });
  };
}
export function getVideogameDetail(id) {
  return function (dispatch) {
    axios
      .get(`/videogame/${id}`)
      .then((res) => {
        dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}
export function postVideogame(payload){
  return async function (dispatch){
    try{
    const response = await axios.post("http://localhost:3001/videogame",payload)
    return response
    } catch(err){console.log(err)} 
  }
}