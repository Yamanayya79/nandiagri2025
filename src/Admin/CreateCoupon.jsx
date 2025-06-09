import React, { useState } from 'react';
import axios from 'axios';
import './css/CreateCoupon.css'; // optional, for styling
import Sidebar from './Components/Sidebar'; // Assuming you have a Sidebar component
const CreateCoupon = () => {
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'flat',
    discount_value: '',
    min_order_amount: '',
    expiry_date: '',
    usage_limit: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://agriapi2025.onrender.com/api/add-coupon', formData);
      alert('Coupon added successfully!');
      setFormData({
        code: '',
        discount_type: 'flat',
        discount_value: '',
        min_order_amount: '',
        expiry_date: '',
        usage_limit: '',
      });
    } catch (error) {
      console.error('Error adding coupon:', error);
      alert('Failed to add coupon.');
    }
  };

  return (
    <div className="add-coupon-container">
      <Sidebar/>
      <h2>Create New Coupon</h2>
      <form onSubmit={handleSubmit} className="coupon-form">
        <input type="text" name="code" placeholder="Coupon Code" value={formData.code} onChange={handleChange} required />
        
        <select name="discount_type" value={formData.discount_type} onChange={handleChange}>
          <option value="flat">Flat</option>
          <option value="percentage">Percentage</option>
        </select>

        <input type="number" name="discount_value" placeholder="Discount Value" value={formData.discount_value} onChange={handleChange} required />
        
        <input type="number" name="min_order_amount" placeholder="Min Order Amount" value={formData.min_order_amount} onChange={handleChange} />

        <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} required />

        <input type="number" name="usage_limit" placeholder="Usage Limit" value={formData.usage_limit} onChange={handleChange} required />

        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
};

export default CreateCoupon;