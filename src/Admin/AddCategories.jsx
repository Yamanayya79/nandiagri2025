import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './css/AddCatgeories.css';
import Sidebar from './Components/Sidebar'
// /api/delete-categories/:id
const AddCategories = () => {
    const [addcat, setAddcat] = useState({
        name: '',
        cat_des: '',
        cat_img: null,
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
            cat_img: e.target.files[0], // Correct way to get file
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('name', addcat.name);
        sendData.append('cat_des', addcat.cat_des);
        sendData.append('cat_img', addcat.cat_img); // Field name must match backend

        axios.post('https://agriapi2025.onrender.com//api/add-category', sendData)
            .then(res => {
                alert('Category added successfully!');
            })
            .catch(err => {
                console.error(err);
                alert('Error adding category');
            });

        setAddcat({
            name: '',
            cat_des: '',
            cat_img: null,
        });
    };

    return (
        <div className='add_cat_container'>
            <Sidebar />
            <h2>Add Categories</h2>
            <form onSubmit={handleSubmit} className='add_cat_form' encType="multipart/form-data">
                <label>Cat Name:</label>
                <input type='text' placeholder='Enter new categories here...' name='name' onChange={handleChange} value={addcat.name} />

                <label>Description</label>
                <input type='text' placeholder='Enter category description here...' name='cat_des' onChange={handleChange} value={addcat.cat_des} />

                <label>Image</label>
                <input type='file' name='cat_img' accept='image/*' onChange={handleimgChange} />

                <button type='submit'>Add New Cat</button>
            </form>
        </div>
    );
};

export default AddCategories;