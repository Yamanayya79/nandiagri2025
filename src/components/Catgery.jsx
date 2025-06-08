import React from 'react';
import {Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Catgery.css';

const Catgery = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://agriapi2025.onrender.com//api/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    // const categories = [
    //     {
    //         id: 1,
    //         name: 'Pesticides',
    //         img: 'https://th.bing.com/th/id/OIP.41BHZaTJy3Op9egMAwkt7AAAAA?rs=1&pid=ImgDetMain'
    //     },
    //     {
    //         id: 2,
    //         name: 'Insecticide',
    //         img: 'https://example.com/insecticide.jpg' // Add image URLs
    //     },
    //     {
    //         id: 3,
    //         name: 'Fertilizers',
    //         img: 'https://example.com/fertilizers.jpg' // Add image URLs
    //     },
    //     {
    //         id: 4,
    //         name: 'Tools',
    //         img: 'https://example.com/tools.jpg' // Add image URLs
    //     },
    //     {
    //         id: 5,
    //         name: 'Herbicide',
    //         img: 'https://example.com/herbicide.jpg' // Add image URLs
    //     },
    //     {
    //         id: 6,
    //         name: 'Offer',
    //         img: 'https://example.com/offer.jpg' // Add image URLs
    //     },
    //     {
    //         id: 7,
    //         name: 'Seeds',
    //         img: 'https://example.com/seeds.jpg' // Add image URLs
    //     },
    //     {
    //         id: 8,
    //         name: 'Crop Kit',
    //         img: 'https://example.com/cropkit.jpg' // Add image URLs
    //     }
    // ];

    return (
        <div className='cat_div'>
            <div className='cat_scroll_container'>

                {categories.map((data) => (
                    <Link to={`/Listing/${data.id}`}>
                        <div className='cat_subdiv' key={data.id}>
                            <img src={`https://agriapi2025.onrender.com//uploads/${data.cat_img}`} alt={data.name} className="w-full h-32 object-cover rounded" />

                            <h5>{data.name}</h5>

                        </div>
                    </Link>
                ))}

            </div>
        </div >
    );
};

export default Catgery;
