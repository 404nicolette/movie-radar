import React from "react"
import NavBar from "../components/NavBar"
// import "../styles/MainPageStyle.css";
import PopularSeries from "../components/PopularSeries"


const FilmsPage = () => {
  return (
    <div>

      <div className="container-fluid main-page-container">
      
        <div className="row g-0">

          {/* LEFT CONTAINER */}
          <div className="col-md-2 main-page-left-container">   
            <NavBar/>

            {/* create a playlist section like spotify. users can create and also brows playlist \\
            essentially same functionality as spotify users can create, add like an image for the playlist etc \\
            oddly specific playlist :]
            */}

          </div>

          <div className="col-md-10 main-page-right-container">
            {/* RIGHT CONTAINER */}


            {/* TOP RATED RECOMMENDER */}
            <div className="main-page-recommender">

              <h3 className="popular-films">popular series</h3>

              <PopularSeries/>

              

              
            </div>


            

          
          </div>
        </div>
      </div>

    </div>
  )
}

export default FilmsPage;
