import React from 'react'
import '../styles/Footer.css'
const Footer = () => {
    let year=new Date().getFullYear()
    return (
        <div className='footer_div'>
            <h2>Connect with us</h2>
            <div className='footer_socillinks'>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            </div>
            <p>© {year} Agriculture Services. All rights reserved. </p>
        </div>
    )
}

export default Footer
