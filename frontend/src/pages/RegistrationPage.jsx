// code ref: https://www.geeksforgeeks.org/how-to-validate-input-field-in-the-html-form/

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api";  
// import "../styles/RegistrationStyle.css"


const RegistrationPage = () => {

    const navigate = useNavigate();

    // django->username, email,password,first_name,last_name
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
       
        confirm_password:"" // for password validation only, not a backend var
    });

    const [validationMessage, setValidationMessage] = useState("");



    const updateForm = (e) => {
        const{name, value} = e.target;


        // clear the err message if user starts typing in either password field
        if ((name === "password" || name === "confirm_password") && validationMessage === "Passwords do not match!") {
        setValidationMessage("");
    }

    
        setFormData((stateData) => ({
            ...stateData, [name]:value
        }));   
    }

    const RegisterClick = async (e) => {
        e.preventDefault();

        if(formData.password != formData.confirm_password){
            setValidationMessage("Passwords do not match!");
           
            return;
        }

        try{
            
            const response = await api.post("api/register-page/", formData);
            console.log("registration success");
            navigate("/signin-page")
        } catch(err){
            console.error("registration error: ",err.message)
        }
    };



    


    




  return (
    <>
        <div className="container-fluid registration-container">
            <div className="row g-0 registration-inner-container">

                {/* LEFT SIDE */}
                <div className="col-md-6 registration-left-container">
                    <h3 className="registration-login-text2">registration.</h3>
                </div>


                {/* RIGHT SIDE */}
                <div className="col-md-6 registration-right-container">

                    <form className="register-form-container" onSubmit={RegisterClick}>

                        {/* FIRSTNAME */}
                        <label htmlhtmlhtmlforname="first_name">first name:</label>
                        <input type="text" name="first_name" id="first_name" placeholder="enter first name" value={formData.first_name}
                            onChange={updateForm} required minLength="2" />
                        
                        <br/>

                        {/* LASTNAME */}
                        <label htmlhtmlhtmlforname="last_name">last name:</label>
                        <input type="text" name="last_name" id="last_name" placeholder="enter your last name" value={formData.last_name}
                            onChange={updateForm} required minLength="2" />
                
                        <br/>

                        {/* USERNAME */}
                        <label htmlhtmlhtmlforname="username">username:</label>
                        <input type="text" name="username" id="username" placeholder="enter username" value={formData.username}
                            onChange={updateForm} required minLength="2" />
                
                        <br/>

                        {/* EMAIL */}
                        <label htmlhtmlhtmlforname="email">email:</label>
                        <input type="email" name="email" id="email" placeholder="enter email address" value={formData.email}
                            onChange={updateForm} required />
                        
                        <br/>

                        {/* PASSWORD */}
                        <label htmlhtmlhtmlforname="password">password:</label>
                        <input type="password" name="password" id="password" placeholder="enter password" value={formData.password}
                            onChange={updateForm} required  minLength="8" />
                            
                        <br/>

                        {/* CONFIRM PASSWORD */}
                        <label htmlhtmlhtmlforname="confirm_password">confirm password:</label>
                        <input type="password" name="confirm_password" id="confirm_password" placeholder="confirm password" value={formData.confirm_password}
                            onChange={updateForm} required  minLength="8" />
                            
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
                            <input className="register-btn" type="submit" value="register" />
                        </div>

                        <br/>
                        <div className="new-user">
                            <a href="/signin-page">already registered? sign in</a>
                        </div>



                        {/* <input className = "register-btn" type="submit" value="register" /> */}
                    </form>

                </div>

            </div>
        </div>
    </>
  )
    
}

export default RegistrationPage;
