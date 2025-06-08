import React, { useState,useEffect } from 'react';
import '../css/Createadmin.css';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you are using react-router

const Createadmin = () => {
    const [formdata, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Initialize navigate

    // Handle change for input fields
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const res = await axios.post(
                'https://agriapi2025.onrender.com//api/admin/add',
                {
                    name: formdata.name, // Ensure name is included
                    email: formdata.email,
                    password: formdata.password,
                },
                { withCredentials: true }
            );

            // Check for success in the response
            if (res.status === 201) { // Assuming 201 is returned on success
                alert('New Admin added successfully!');
                navigate('/admin/addnewadmin');
            } else {
                alert('Failed to add admin: ' + res.data.message);
            }
        } catch (err) {
            console.error('Error during admin creation:', err);
            alert('Server error during admin creation: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className='admin_add_container'>
            <Sidebar />
            <div className='admin_add'>
                <h2>Add New Admin</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name Of Admin</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formdata.name}
                        placeholder='Enter name of new admin'
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formdata.email}
                        placeholder='Enter your email'
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formdata.password}
                        placeholder='Enter your password'
                        onChange={handleChange}
                        required
                    />
                    <button type='submit'>Add Admin</button> {/* Changed button text */}
                </form>
            </div>
        </div>
    );
};

export default Createadmin;
