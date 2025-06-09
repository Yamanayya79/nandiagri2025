import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './css/Dashboard.css';
import Sidebar from './Components/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [todayjoined, setTodayJoin] = useState(0)
    const [cancelled, setcancelled] = useState(0);
    const [todayorders, setTodayOrders] = useState(0);
    const [totalslide, setTotalSlide] = useState(0)
    const [Category, setCategory] = useState(0)
    const [username, setUsername] = useState(localStorage.getItem('admin') || '');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    // /api/total-users-today 
    // /api/total-users-today
    // /api/stats/orders-today
    // /api/stats/orders-cancelled
    // /api/stats/total-slide
    useEffect(() => {
        // Fetch total products
        axios.get('https://agriapi2025.onrender.com/api/total-products')
            .then(res => {
                setTotalProducts(res.data.total); // Adjust based on your API response structure
            })
            .catch(err => {
                console.error("Error fetching total products:", err);
                setError("Failed to fetch total products");
            });
        // Fetch today registered/ joined userd
        axios.get('https://agriapi2025.onrender.com/api/total-users-today')
            .then(res => {
                setTodayJoin(res.data.total); // Adjust based on your API response structure
            })
            .catch(err => {
                console.error("Error fetching total products:", err);
                setError("Failed to fetch total products");
            });

        // Fetch total users
        axios.get('https://agriapi2025.onrender.com/api/stats/total-users')
            .then(res => {
                setTotalUsers(res.data.total); // Adjust based on your API response structure
            })
            .catch(err => {
                console.error("Error fetching total users:", err);
                setError("Failed to fetch total users");
            });

        // Fetch total orders
        axios.get('https://agriapi2025.onrender.com/api/stats/total-orders')
            .then(res => {
                setTotalOrders(res.data.total); // Adjust based on your API response structure
            })
            .catch(err => {
                console.error("Error fetching total orders:", err);
                setError("Failed to fetch total orders");
            });
        // fetch today total orders
        axios.get('https://agriapi2025.onrender.com/api/stats/orders-today')
            .then(res => {
                setTodayOrders(res.data.total); // Adjust based on your API response structure
            })
            .catch(err => {
                console.error("Error fetching today orders:", err);
                setError("Failed to fetch today orders");
            });
        // fetch today total cancaled
        axios.get('https://agriapi2025.onrender.com/api/stats/orders-cancelled')
            .then(res => {
                setcancelled(res.data.total); // Adjust based on your API response structure
            })
            .catch(err => {
                console.error("Error fetching total orders cancelled :", err);
                setError("Failed to fetch total orders cancelled");
            });
        // fetch  total category 
        axios.get('https://agriapi2025.onrender.com/api/stats/total-category')
            .then(res => {
                setCategory(res.data.total); // Adjust based on your API response structure
            })
            .catch(err => {
                console.error("Error fetching total orders cancelled :", err);
                setError("Failed to fetch total orders cancelled");
            });
        // fetch  total  Slide
        axios.get('https://agriapi2025.onrender.com/api/stats/total-slide')
            .then(res => {
                setTotalSlide(res.data.total); // Adjust based on your API response structure
            })
            .catch(err => {
                console.error("Error fetching total orders cancelled :", err);
                setError("Failed to fetch total orders cancelled");
            });
    }, []);
 const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    navigate('/admin/login'); // Redirect to login page
  };
    return (
        <div className='dashboard'>
            <Sidebar />
            <h1>Welcome to the Dashboard</h1>
             {username && (
          <div className="user-info" style={{display:'flex', alignItems:'center', gap:'15px'}}>
            <span><strong>Admin:</strong> {username}</span>
            <button onClick={handleLogout} style={{
              padding: '6px 12px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </div>
        )}
            <p>This is the admin dashboard where you can manage your application.</p>
            {error && <p className="error">{error}</p>} {/* Display error message if any */}
            <div className="dashboard-cards">
                <div className="card">
                    <h2>Today orders </h2>
                    <p>{todayorders}</p>
                </div>

                <div className="card">
                    <h2>Total Orders Rejected</h2>
                    <p>{cancelled}</p>
                </div>
                <div className="card">
                    <h2>Total Orders</h2>
                    <p>{totalOrders}</p>
                </div>
                <div className="card">
                    <h2>Today Joined Users</h2>
                    <p>{todayjoined}</p>
                </div>
                <div className="card">
                    <h2>Total Users</h2>
                    <p>{totalUsers}</p>
                </div>
                {/* <div className="card">
                    <h2>Total Orders</h2>
                    <p>{totalOrders}</p>
                </div> */}

                <div className="card">
                    <h2>Total Products</h2>
                    <p>{totalProducts}</p>
                </div>
                <div className="card">
                    <h2>Total Category</h2>
                    <p>{Category}</p>
                </div>
                <div className="card">
                    <h2>Total Slides</h2>
                    <p>{totalslide}</p>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
