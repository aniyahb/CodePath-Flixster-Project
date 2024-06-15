import { useState, useEffect } from 'react';
import React from "react";
import "./Modal.css";

const Modal = (props) => {
    console.log("picked movie in modal", props.pickedMovie);
    return(
    <div className="modal-overlay" >
        <div className="modal-content">
            <button type="submit" className="close-button" onClick={props.showModal}> X </button>
            <h1 className="Movie-Title">{props.pickedMovie?.title} </h1>
            <img className ="Movie-Image" src={`https://image.tmdb.org/t/p/w400/${props.pickedMovie?.poster_path}`}/>
            <h3 className="Release-Date:"> {props.pickedMovie?.release_date} </h3>
            <h3 className="Overview">{props.pickedMovie?.overview}</h3>
            <h3 className= "Genre">{props.pickedMovie?.genre}</h3>



        </div>



    </div>

);
};




export default Modal
