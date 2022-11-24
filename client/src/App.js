import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from "./components/LandingPg/Landing"
import { NewGame } from "./components/NewGame/newGame";
import Videogames from "./components/Videogames/Videogames";
import VideogameDetails from "./components/Detail/Detail";

function App() {
  return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/videogames" component={Videogames}/>
        <Route exact path="/newGame" component={NewGame}/>
        <Route path='/videogame/:idVideogame' component={VideogameDetails} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
