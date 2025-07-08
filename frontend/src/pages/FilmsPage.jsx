import React from "react"
import NavBar from "../components/NavBar"
// import "../styles/MainPageStyle.css";
import PopularFilms from "../components/PopularFilms"


const FilmsPage = () => {
  return (
    <div>

      <div className="container-fluid main-page-container">
      
        <div className="row g-0">

          {/* LEFT CONTAINER */}
          <div className="col-md-2 main-page-left-container">   
            <NavBar/>
          </div>

          <div className="col-md-10 main-page-right-container">
            {/* RIGHT CONTAINER */}


            {/* TOP RATED RECOMMENDER */}
            <div className="main-page-recommender">

              <h3 className="popular-films">popular films</h3>

              <PopularFilms/>

              

              
            </div>


            

          
          </div>
        </div>
      </div>

    </div>
  )
}

export default FilmsPage;
