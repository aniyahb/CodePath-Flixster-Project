import "./MovieCard.css";
import React, { useState } from "react";

const MovieCard = (props) => {
    const [isFav, setIsFav] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    const rating = Math.round((props.average / 10) * 100); // Convert 0-10 scale to 0-100
    
    // Determine circle color based on rating
    const getCircleColor = () => {
        if (rating >= 70) return '#00D084'; // Green
        if (rating >= 40) return '#FFD700'; // Yellow
        return '#FF6B6B'; // Red
    };

    return (
        <div className="movie-card" onClick={props.handleClickFunc}>
            <div className="image-container">
                <img className ="image" src={props.image} />
                {/* Circular rating indicator */}
                <div className="rating-circle">
                    <svg viewBox="0 0 100 100" className="progress-svg">
                        <circle cx="50" cy="50" r="45" className="progress-bg" />
                        <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            className="progress-fill"
                            style={{
                                strokeDashoffset: 283 - (rating / 100) * 283,
                                stroke: getCircleColor()
                            }}
                        />
                    </svg>
                    <div className="rating-text">{rating}%</div>
                </div>
            </div>
            <section>
                <div className = "title"> {props.title} </div>

                {/* <div className= "fav_watched_icons">
                    <a className= "favorite_icon" onClick={(e) => {
                            e.stopPropagation();
                            setIsFav(!isFav);

                    }}>
                        {isFav ?
                            <i className="fa-solid fa-heart"></i> :
                            <i className="fa-regular fa-heart"></i>
}
                    </a>

                <div className="pWatched">
                    <span className="watched" onClick={(e) => {e.stopPropagation(); setIsWatched(!isWatched); }}>

                    {isWatched ?
                        <i className="fa-regular fa-square-check"></i> :
                        <i className="fa-light fa-square"></i>
                    }
                    Watched
                    </span>

                </div>
                </div> */}
            </section>


        </div>
    )

}

export default MovieCard;
