import React, { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import './css/Feedback.css';
import axios from 'axios';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('https://agriapi2025.onrender.com/api/feedback')
            .then(res => setFeedbacks(res.data))
            .catch(err => console.error("Error fetching feedbacks:", err));
    }, []);

    return (
        <div className='feedback_continer'>
            <Sidebar />
            <h2 className='page-title'>Manage Feedback From Users</h2>
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>SNO</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>MESSAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.length === 0 ? (
                            <tr>
                                <td colSpan="4">No feedbacks found.</td>
                            </tr>
                        ) : (
                            feedbacks.map((fb, index) => (
                                <tr key={fb.id}>
                                    <td>{index + 1}</td>
                                    <td>{fb.fname}</td>
                                    <td>{fb.email}</td>
                                    <td>{fb.message}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Feedback;