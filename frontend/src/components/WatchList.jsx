import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/TopRatedMoviesStyle.css"


const WatchList = () => {

    const url = "https://image.tmdb.org/t/p/w500";
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovies, setSelectedMovies] = useState([]);

    const fetchMovies = async () => {
        
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken"); 
    
            
    
            const response = await axios.get("http://localhost:8000/api/get-initial-movies/", {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`, 
                },
            });
    
            
            setMovies(response.data);
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
        console.log("Token:", token); 

        const updatedSelection = [...selectedMovies, movieId];
        setSelectedMovies(updatedSelection);


        try {
            await axios.post(
                "http://localhost:8000/api/get-initial-movies/",
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
            console.error("Error adding movie to playlist:", error);
        }
        
    };

    
    
    return (
        <>
            <div className="base-recommender-main-container">
                <div className="base-recommender-inner-container">

                    {movies.map((movie) => (

                        <div className="base-recommender-image-container" key={movie.movie_id}>
                            <img src={`${url}${movie.poster_path}`} alt={movie.movie_title} />
                            {/* <img src={`${url}${movie.poster_path}`} alt={movie.title} /> */}
                            <h3>{movie.movie_title}</h3>

                            {/* select btn */}
                            <button className={`select-button ${selectedMovies.includes(movie.movie_id) ? "selected" : ""}`}

                            onClick={() => handleMovieSelection(movie.movie_id)}>watch</button>
                        
                        </div>
                        
                    ))}

                </div>

               
            </div>
                
        </>

    )
    
}

export default WatchList;
