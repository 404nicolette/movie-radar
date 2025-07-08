import React from "react"
import { useState } from "react";
import api from "../api"; 
import { useNavigate } from "react-router-dom";
// import "../styles/SigninPageStyle.css"

const SigninPage =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationMessage, setValidationMessage] = useState("")

    const navigate = useNavigate();

    const SigninClick = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()){
            setValidationMessage("Form incomplete!")
            return;
        }

        try{
            const response = await api.post("api/signin-page/", { email, password });

            console.log("login successful:", response.data);

            localStorage.setItem("authToken", response.data.access_token);
            localStorage.setItem("userId", response.data.user_id);

            const isNewUser = response.data.is_new_user;

            if (isNewUser) {
                navigate("/prompt-page");
            } else {
                navigate("/prompt-page");
            }

        } catch (error) {

            console.error("login error:", error.message);
            setValidationMessage("Invalid email or password!");

        }


        
    };
  

    return (
        <div>
            <div className="signin-container">
                <div className="signin-inner-container">

                    {/* LEFT SIDE */}
                    <div className="col-md-6 signin-left-container">
                        <h3 className="signin-login-text2">login.</h3>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-md-6 signin-right-container">
                        

                        <form className="signin-form-container" onSubmit={SigninClick}>


                            {/* EMAIL */}
                            <label htmlhtmlhtmlforname="email">email:</label>
                            <input type="email" name="email" id="email" placeholder="enter email address" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                            

                            {/* PASSWORD */}
                            <label htmlhtmlhtmlforname="password">password:</label>
                            <input type="password" name="password" id="password" placeholder="enter password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required  minLength="8" />
                                
                            <br/>
                            <br/> 

            
                            {/* styling the validation message so its visible in the interface */}

                            {validationMessage && (
                                <div style={{
                                    color: "#B7111D",
                                    marginBottom: "10px",
                                    fontWeight: 400
                                        
                                }}>
                                    {validationMessage}
                                </div>
                            )}

                            <div className="btn-container">
                                <input className="signin-btn" type="submit" value="signin" />
                            </div>
                            
                            <div className="new-user">
                                    <a href="/register-page">new user? register</a>
                            </div>

                            {/* <input type="submit" value="register" /> */}
                        </form>

                    </div>

                </div>
            </div>

        </div>
    )
}
export default SigninPage;