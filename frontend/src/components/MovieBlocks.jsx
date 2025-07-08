import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../styles/MovieBlocksStyle.css"
import { useLocation } from "react-router-dom";

const MovieBlocks = () => {

    const url = "https://image.tmdb.org/t/p/w500";

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const location = useLocation();
    const recommendedMovies = location.state?.recommendedMovies || [];
    

    const fetchMovies = async () => {
        try {
            setLoading(true);
            // get movies from your backend
            const response = await axios.get("http://localhost:8000/api/get-movies/");
            const moviesFromDB = response.data;
            const randomMovies = moviesFromDB.sort(() => 0.5 - Math.random()).slice(0, 20);
            setMovies(randomMovies);
        } catch (err) {
            console.error("Error fetching movies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (recommendedMovies.length > 0) {
            setMovies(recommendedMovies); // set recommended movies directly
            setLoading(false);

            // i got infinity loop? which kept rendering more poster, so this is a check to ensure
            // the amount of poster displayed is limited
        } else if (movies.length === 0) { 
            fetchMovies(); 
        }
    }, [recommendedMovies, movies.length]); 


       // select button per movie
       const handleMovieSelection = async (movieId) => {
        const token = localStorage.getItem("authToken");
    
        if (selectedMovies.includes(movieId)) {
            // ff the movie selected, remove on double-click
            const updatedSelection = selectedMovies.filter(id => id !== movieId);
            setSelectedMovies(updatedSelection);
            
            
        } else {
            // if movie is not selecte add
            const updatedSelection = [...selectedMovies, movieId];
            setSelectedMovies(updatedSelection);
    
            try {
                await axios.post(
                    "http://localhost:8000/api/save-initial-movies/",
                    { movie_ids: [movieId] },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("saved to initial_movies:", movieId);
            } catch (error) {
                console.error("err adding movie to playlist:", error);
            }
        }
    };
    

    return (
        <>
            <div className="movie-blocks-main-container">
                <div className="movie-blocks-inner-container">

                    {movies.map((movie) => (

                        <div key={movie.movie_id} className="movie-blocks-image-container">

                            {/* <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> */}
                            <img src={`${url}${movie.poster_path}`} alt={movie.movie_title} />

                            <h3 className="movie-block-title">{movie.movie_title}</h3>


    
                        
                            <div className="movie-blocks-btn-container">
                                <button className={`select-button ${selectedMovies.includes(movie.movie_id) ? "selected" : ""}`}                         
                                    onClick={() => handleMovieSelection(movie.movie_id)}>add</button>
                            </div>

                           

                        </div>
                    ))}
                </div>
            


            </div>
            
        </>
    );
};

export default MovieBlocks;