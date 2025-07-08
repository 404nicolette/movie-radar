import React from "react";
import "../styles/ButtonStyle.css";



const Button = ({text, id, onClick, type}) => {
  return (
    <div>
      <button className="componentBtn" id={id} onClick={onClick} type={type}>{text}</button>
    </div>
  )
};

export default Button
