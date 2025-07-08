import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/PopularFilms.css";

const PopularSeries = () => {
    const apiKey = "d2267179100e5e1ce31d778fb2deab55" ;
    const url = "https://image.tmdb.org/t/p/w500";

    const [series, pickedSeries] = useState([]);
    const [loading, LoadingPage] = useState(true);

    const fetchSeries = async () => {
        try {
            LoadingPage(true);
            const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`);
            const getAllSeries = response.data.results;

            const shuffleSeries = getAllSeries.sort(() => 0.5 - Math.random());
            const randomSeries = shuffleSeries.slice(0, 20); 
            pickedSeries(randomSeries);
        } catch (err) {
            console.log("Error: " + err);
        } finally {
            LoadingPage(false);
        }
    };

    useEffect(() => {
        fetchSeries();
    }, [apiKey]);

    const handleRefresh = () => {
        fetchSeries();
    };

    return (
        <>
            <div className="popular-film-recommender-main-container">
                <div className="popular-film-recommender-inner-container">
                    {series.map((series) => (
                        <div className="popular-film-recommender-image-container" key={series.id}>
                            <img src={`${url}${series.poster_path}`} alt={series.name} />
                            <h3>{series.name}</h3>
                        </div>
                    ))}

                    <div className="refresh-button-container">
                        <button onClick={handleRefresh} className="refresh-button">More</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopularSeries;