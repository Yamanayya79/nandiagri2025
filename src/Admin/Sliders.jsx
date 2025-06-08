import React, { useState } from 'react';
import axios from 'axios';
import './css/AddCatgeories.css';
import Sidebar from './Components/Sidebar'
const Sliders = () => {
    const [addcat, setAddcat] = useState({
        title: '',
        description: '',
        slider_img: null,
    });

    const handleChange = (e) => {
        setAddcat({
            ...addcat,
            [e.target.name]: e.target.value,
        });
    };

    const handleimgChange = (e) => {
        setAddcat({
             ...addcat,
            slider_img: e.target.files[0], // Corrected key // Correct way to get file
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('title', addcat.title);
        sendData.append('description', addcat.description);
        sendData.append('slider_img', addcat.slider_img); // Field name must match backend

        axios.post('https://agriapi2025.onrender.com//api/add-slider', sendData)
            .then(res => {
                alert('Slide added successfully!');
            })
            .catch(err => {
                console.error(err);
                alert('Error adding Slide');
            });

        setAddcat({
            title: '',
            description: '',
            slider_img: null,
        });
    };

    return (
        <div className='add_cat_container'>
            <Sidebar />
            <h2>Add Slides</h2>
            <form onSubmit={handleSubmit} className='add_cat_form' encType="multipart/form-data">
                <label>Slide Name (Button):</label>
                <input type='text' placeholder='Enter new categories here...' name='title' onChange={handleChange} value={addcat.title} />

                <label>Description</label>
                <input type='text' placeholder='Enter category description here...' name='description' onChange={handleChange} value={addcat.description} />

                <label>Image</label>
                <input type='file' name='slider_img' accept='image/*' onChange={handleimgChange} />

                <button type='submit'>Add New Slide</button>
            </form>
        </div>
    );
};

export default Sliders;
