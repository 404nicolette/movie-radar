import React from 'react'

const H1 = ({children, className="", ...props}) =>{
   return <h1 {...props} className={`font-magical ${className}`}>{children}</h1>
}

const H4 = ({children, className="", ...props}) =>{
    return <h4 {...props} className={`font-normal text-wrap ${className}`}>{children}</h4>
}

const H5 = ({children, className="", ...props}) =>{
    return <h5 {...props} className={`font-varuna text-wrap ${className}`}>{children}</h5>
}
const Text = { H1, H4, H5 };

export default Text;