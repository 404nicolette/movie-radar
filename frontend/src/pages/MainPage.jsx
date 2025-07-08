import React from "react"
import NavBar from "../components/NavBar"
// import "../styles/MainPageStyle.css"
import TopRatedMovies from "../components/TopRatedMovies"
import MovieBlocks from "../components/MovieBlocks"
import WatchList from "../components/WatchList"

const MainPage = () => {
  // const [recommendedMovies, setRecommendedMovies] = useState([]);

  return (
    
    <div>
      <div className="container-fluid main-page-container">

        <div className="row g-0">



          {/* LEFT CONTAINER */}
          <div className="col-md-2 main-page-left-container">   
            <NavBar/>
          </div>



           {/* RIGHT CONTAINER */}
          <div className="col-md-10 main-page-right-container">
             
            {/* TOP RATED RECOMMENDER */}
            <div className="recommended-from-backend">

              <h3 className="top-rated-films">top rated films</h3>

              <TopRatedMovies/>
            </div>

            {/* WATCHLIST */}
            <div className="watch-list">
              <h3 className="recommended-movies-title1">watch list</h3>
              <WatchList  />
            </div>

            {/* RECOMMENDED FROM BACKEDN */}
            <div className="recommended-from-backend">
              <h3 className="recommended-movies-title2">recommended for you</h3>
              <MovieBlocks  />
            </div>

          </div>
        </div>
      </div>


      


    </div>
  )
}




export default MainPage;
