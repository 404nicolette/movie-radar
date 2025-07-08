import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/MovieBlocksStyle.css"


const TopRatedMovies = () => {

    const url = "https://image.tmdb.org/t/p/w500";

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovies, setSelectedMovies] = useState([]);


    const fetchMovies = async () => {
        try {
        setLoading(true);
        
        // accesses the db to get the movies
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
        fetchMovies();
    }, []);

   
    

    // select button per movie
    const handleMovieSelection = async (movieId) => {
        const token = localStorage.getItem("authToken");
    
        if (selectedMovies.includes(movieId)) {
            // ff the movie selected, remove on double-click
            const updatedSelection = selectedMovies.filter(id => id !== movieId);
            setSelectedMovies(updatedSelection);
            
            try {
                await axios.post(
                    "http://localhost:8000/api/remove-initial-movies/",
                    { movie_ids: [movieId] },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("removed from initial_movies:", movieId);
            } catch (error) {
                console.error("Error removing movie from playlist:", error);
            }
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

                        <div className="movie-blocks-image-container" key={movie.movie_id}>
                            <img src={`${url}${movie.poster_path}`} alt={movie.movie_title} />
                            {/* <img src={`${url}${movie.poster_path}`} alt={movie.title} /> */}
                            <h3 className="movie-block-title">{movie.movie_title}</h3>

                            {/* select btn */}
                            

                            <div className="movie-blocks-btn-container">
                                <button className={`select-button ${selectedMovies.includes(movie.movie_id) ? "selected" : ""}`}                         
                                    onClick={() => handleMovieSelection(movie.movie_id)}>add</button>
                            </div>


                            
                            
                        </div>
                        
                    ))}

                </div>

               
            </div>
                
        </>

    )
    
}

export default TopRatedMovies;
