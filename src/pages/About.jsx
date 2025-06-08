import React from 'react';
import '../styles/About.css'; // Optional: Import a CSS file for styling

const About = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to our application! We are dedicated to providing the best service possible.
                Our mission is to connect users with the resources they need to succeed in their endeavors.
            </p>
            <h2>Our Vision</h2>
            <p>
                We envision a world where everyone has access to the tools and information they need to thrive.
                Our platform aims to empower individuals and businesses alike.
            </p>
            <h2>Our Team</h2>
            <p>
                Our team consists of experienced professionals from various fields, including technology, agriculture, and business.
                We are passionate about what we do and strive to make a positive impact in our community.
            </p>
            <h2>Contact Us</h2>
            <p>
                If you have any questions or feedback, feel free to reach out to us at:
                <a href="mailto:info@example.com"> info@example.com</a>
            </p>
        </div>
    );
};

export default About;
