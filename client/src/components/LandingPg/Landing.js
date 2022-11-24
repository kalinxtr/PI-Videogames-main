import { Link } from 'react-router-dom';
import "./Landing.css"
import mybackground from "../../myImages/LandingBG.jpg"


export default function Landing() {

    return (
      <div className="primaryDiv">
          <img src={mybackground} />
            <h2>Welcome to The Gamer Zone</h2>
            <Link to="/videogames">
              <button className='buttonLanding'><span>Let's go!</span></button>
            </Link>
      </div>
    );
  }