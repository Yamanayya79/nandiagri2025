import React, { useState } from 'react';
import '../styles/ContactUs.css'; // Import a CSS file for styling
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fname: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
      

        axios.post('https://agriapi2025.onrender.com/api/feedback', formData)
            .then(res => {
                alert('Feedback added successfully!');
                // Reset form after submission
                setFormData({ fname: '', email: '', message: '' });
            })
            .catch(err => {
                console.error(err);
                alert('Error adding feedback');
            });
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;
