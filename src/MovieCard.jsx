import "./MovieCard.css";
import React, { useState } from "react";

const MovieCard = (props) => {
    const [isFav, setIsFav] = useState(false);
    const [isWatched, setIsWatched] = useState(false);


    return (
        <div className="movie-card" onClick={props.handleClickFunc}>
            <section>
                <img className ="image" src={props.image} />
                <h2 className = "title"> {props.title} </h2>
                <h3 className= "average"> {props.average} </h3>

                <div className= "fav_watched_icons">
                    <a className= "favorite_icon" onClick={(e) => {
                            e.stopPropagation();
                            setIsFav(!isFav);

                    }}>
                        {isFav ?
                            <i className="fa-solid fa-heart"></i> :
                            <i className="fa-regular fa-heart"></i>
}
                    </a>

                <p className="pWatched">
                    <span className="watched" onClick={(e) => {e.stopPropagation(); setIsWatched(!isWatched); }}>

                    {isWatched ?
                        <i className="fa-regular fa-square-check"></i> :
                        <i className="fa-light fa-square"></i>
                    }
                    Watched
                    </span>

                </p>
                </div>
            </section>


        </div>
    )

}

export default MovieCard;
