// code ref: https://dev.to/vinibgoulart/how-to-protected-a-route-with-jwt-token-in-react-using-context-api-l38


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    
    //   manage the redirect delay
    const [isRedirecting, setIsRedirecting] = useState(false);

    // checks if user is authenticated
    const isAuthenticated = localStorage.getItem("authToken") !== null;

    useEffect(() => {
        if (!isAuthenticated) {
            setIsRedirecting(true);
            navigate("/signin-page");
        }
    }, [isAuthenticated, navigate]);

    if (isRedirecting || !isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;