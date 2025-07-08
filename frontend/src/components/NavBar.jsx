import React from "react"
import { useNavigate } from "react-router-dom";
import Logout from "./Logout"

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin-page");
  };
  

  return (
    <>
      <div className="nav-container">
        <h3 className="nav-title">movie radar</h3>

        <NavButton />


        <div className="logout-container">
          <Logout onClick={handleLogout} />
        </div>

      </div>

      
        
    
    </>
    
  )
}

export default NavBar;
