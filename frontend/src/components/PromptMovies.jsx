import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../styles/PromptMoviesStyle.css"





const PromptMovies = ({ userId }) => {
    const navigate = useNavigate();

    const url = "https://image.tmdb.org/t/p/w500";

    const [movies, setMovies] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    const fetchMovies = async () => {
        try {
        setLoading(true);
        
        // accesses the db to get the movies
        // loads poster only available in db
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

        // maintains the selection even if the page refreshes
        const storedSelected = localStorage.getItem("selectedMovies");
        if (storedSelected) {
            setSelectedMovies(JSON.parse(storedSelected));
        }


    }, []);

    useEffect(() => {
        localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies));
    }, [selectedMovies]);

    const handleMovieSelection = (movieId) => {
        if (selectedMovies.includes(movieId)) {
        setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
        } else {
        if (selectedMovies.length < 5) {
            setSelectedMovies([...selectedMovies, movieId]);
        }
        }
    };

    const handleSubmit = async () => {
        if (selectedMovies.length === 5) {

            // fetch user id from local storage
            // to be used in the initial_movies
            const token = localStorage.getItem("authToken");
            const requestData = {
                movie_ids: selectedMovies, 
    
            };
    
            console.log("data being sent to the backend:", requestData); 
    
            try {
                
                const response = await axios.post(

                    // saves the selected movie to initial_movies table in db
                    "http://localhost:8000/api/save-initial-movies/",                    
                    requestData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, 
                        },
                    }
                );


                // sends the selected movie to the hybrid recommendation to return recommendatipns
                const recommendResponse = await axios.post(
                    "http://localhost:8000/api/hybrid-recommendations/",
                    requestData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                 //  CBF recommendations
                const cbfResponse = await axios.post(
                    "http://localhost:8000/api/cbf-recommendations/",
                    requestData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

    
                console.log("recommended movies:", recommendResponse.data);
                setRecommendedMovies(recommendResponse.data);

               

                if (response.status >= 200 && response.status < 300) {
                    navigate("/main-page", {
                        state: { recommendedMovies: recommendResponse.data,cbfMovies: cbfResponse.data, },
                        
                    });
                }
                else{
                    console.log("Failed to submit movies");

                }
    
                console.log("Recommended movies:", response.data);
                setRecommendedMovies(response.data);
    
            } catch (err) {
                console.log("Error during recommendation:", err);
            }
        } else {
            alert("Please select 5 movies before submitting.");
        }
    };

    
    

    const handleRefresh = () => {
        // setSelectedMovies([]);
        fetchMovies();
    };

    return (
        <div>
            <div className="prompt-page-container">
                <h2>select 5 movies of your choice</h2>


                <div className="inner-prompt-page-container-container">

                    {movies.map((movie) => (
                        <div className="prompt-page-recommender-image-container" key={movie.movie_id}>

                            {/* poster image */}
                            <img className="movie_img" src={`${url}${movie.poster_path}`} alt={movie.movie_title} />
                            <h3>{movie.movie_title}</h3>
                                
                            {/* select btn */}

                            <div className="prompt-page-btn-contaniner">
                                <button className={`prompt-select-button ${selectedMovies.includes(movie.movie_id) ? "selected" : ""}`} 
                                    onClick={() => handleMovieSelection(movie.movie_id)}>
                                    {selectedMovies.includes(movie.movie_id) ? "Selected" : "Select"}
                                </button>

                            </div>
                            

                        </div>
                    ))}
                
                </div>

                        {/* refresh btn */}
                <div className="prompt-page-refresh-button-container">
                    <button onClick={handleRefresh} className="prompt-page-refresh-button">refresh</button>
                    <button onClick={handleSubmit} className="prompt-page-refresh-button" >submit selected movies</button>

                </div>

                {/* submit btn */}
                {/* <div className="submit-button-container"> */}
                    {/* <button onClick={handleSubmit} className="refresh-button" >submit selected movies</button> */}
                {/* </div> */}

            </div>
                
                


        </div>
    );
};

export default PromptMovies;