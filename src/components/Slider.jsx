// src/Slider.js

import React, { useEffect, useState } from 'react';
import '../styles/Slider.css'; // Import CSS for styling
import axios from 'axios';
import { Link } from 'react-router-dom';

// const slides = [
//     {
//         id: 1,
//         image: 'https://krushidukan.bharatagri.com/cdn/shop/files/Hin_Mahadhan_Micronutrient_Mix_1200x600.webp?v=1745952646', // Replace with your image URL
//         title: 'Empowering Farmers with Quality Agricultural Products',
//         buttonText: 'Shop Now',
//     },
//     {
//         id: 2,
//         image: 'https://krushidukan.bharatagri.com/cdn/shop/files/Hin_Sugarcane_Tillering_Kit_GA_6_BA_1200x600.webp?v=1743676695', // Replace with your image URL
//         title: 'Get Up to 50% Off on Selected Products!',
//         buttonText: 'View Offers',
//     },
//     {
//         id: 3,
//         image: 'https://krushidukan.bharatagri.com/cdn/shop/files/Hin_FMC_Coragen_1200x600.webp?v=1745952646', // Replace with your image URL
//         title: 'Explore Our Best-Selling Seeds and Fertilizers',
//         buttonText: 'Browse Products',
//     },
// ];

const Slider = () => {
    const [slide, setSlide] = useState([]);
    useEffect(() => {
        axios.get('https://agriapi2025.onrender.com/api/slides')
            .then(res => setSlide(res.data))
            .catch(err => console.log(err));
    })


    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slide.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slide.length) % slide.length);
    };

    return (
        <div className="slider">
            <div className="slides">
                {slide.map((slide, index) => (
                    <div
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        key={slide.id}
                    >
                        <img src={`https://agriapi2025.onrender.com/uploads/${slide.slider_img}`} alt={slide.title} />
                        <div className="text">
                            {/* <h2>{slide.title}</h2> */}


                            <Link to={`/Listing/${slide.id}`}><button>{slide.title}</button></Link>
                        </div>
                    </div>
                ))}
            </div>
            <button className="prev" onClick={prevSlide}>❮</button>
            <button className="next" onClick={nextSlide}>❯</button>
        </div>
    );
};

export default Slider;