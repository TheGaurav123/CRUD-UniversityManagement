import React from 'react'
import ErrorImg from '../../Images/404Page.svg'
import './error.css'
const Error = () => {
    return (
        <div className='error-container'>
            <img src={ErrorImg} className='img-fluid' alt="404 Page Not Found" />
            <a href="/" className='anchor-tag mt-5 h4'>Home</a>
        </div>
    )
}

export default Error