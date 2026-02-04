import { useState, useEffect } from 'react';
import "./Modal.css";


const Modal = (props) => {
    const [videos, setVideos] = useState([]);
    const [providers, setProviders] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        if (props.pickedMovie?.id) {
            fetch(`https://api.themoviedb.org/3/movie/${props.pickedMovie.id}/videos?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    const trailers = data.results?.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
                    setVideos(trailers || []);
                })
                .catch(err => console.error("Error fetching videos:", err));
        }
    }, [props.pickedMovie?.id]);

    useEffect(() => {
        if (props.pickedMovie?.id) {
            fetch(`https://api.themoviedb.org/3/movie/${props.pickedMovie.id}/watch/providers?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    const usProviders = data.results?.US;
                    setProviders(usProviders?.flatrate || usProviders?.rent || usProviders?.buy || []);
                })
                .catch(err => console.error("Error fetching providers:", err));
        }
    }, [props.pickedMovie?.id]);

    const youtubeVideoId = videos.length > 0 ? videos[0].key : null;

    return(
    <div className="modal-overlay" >
        <div className="modal-content">
            <button type="submit" className="close-button" onClick={props.showModal}> x </button>
            <h1 className="Movie-Title">{props.pickedMovie?.title} </h1>
            
            <div className="modal-body">
                <div className="trailer-section">
                    {youtubeVideoId ? (
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="no-trailer">No trailer available</div>
                    )}
                    
                    {providers.length > 0 && (
                        <div className="providers-section">
                            <h4>Stream On:</h4>
                            <div className="providers-icons">
                                {providers.map((provider) => (
                                    <img
                                        key={provider.provider_id}
                                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        title={provider.provider_name}
                                        className="provider-logo"
                                    />
                                ))}
                            </div>
                            <p className="justwatch-attribution">Data provided by JustWatch</p>
                        </div>
                    )}
                </div>

                <div className="description-section">
                    <img className="Movie-Image" src={`https://image.tmdb.org/t/p/w200/${props.pickedMovie?.poster_path}`}/>
                    <h3 className="Release-Date"> {props.pickedMovie?.release_date} </h3>
                    <div className="Overview">{props.pickedMovie?.overview}</div>
                    <h3 className="Genre">{props.pickedMovie?.genre}</h3>
                </div>
            </div>

        </div>
    </div>

);
};




export default Modal
