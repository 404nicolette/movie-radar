import React from 'react'

const H1 = ({children, className=""}) =>{
   return <h1 className={`font-magical ${className}`}>{children}</h1>
}

const H4 = ({children, className=""}) =>{
    return <h4 className={`font-normal text-wrap ${className}`}>{children}</h4>
}

const H5 = ({children, className=""}) =>{
    return <h5 className={`font-varuna text-wrap ${className}`}>{children}</h5>
}
const Text = { H1, H4, H5 };

export default Text;