// bootstrap

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import NavBar from "./components/Nav/NavBar";
import Main from "./pages/Main";
import TopBanner from "./components/landing/TopBanner";
function App() {
  

  return (

    <Router>



      <Routes>
        <Route path="/register-page" element={<Register />} />

        <Route path="/signin-page" element={<SignIn />} />
        <Route path="/test" element={<Main />} />
        <Route path="/test-two" element={<TopBanner />} />
       

{/* 
        <Route path="/explore-page" element={ <ProtectedRoute> <ExplorePage /></ProtectedRoute>}/>

        <Route path="/prompt-page" element={ <ProtectedRoute> <PromptMovies /></ProtectedRoute>}/>
        <Route path="/main-page" element={ <ProtectedRoute> <MainPage /></ProtectedRoute>}/>
        <Route path="/films-page" element={<ProtectedRoute><FilmsPage /></ProtectedRoute>   } />
        <Route path="/series-page" element={<ProtectedRoute><SeriesPage /></ProtectedRoute>} /> */}
        <Route path="/" element={<Landing />} />

        
      </Routes>
    </Router>
  )
}

export default App
